import React, { Component } from 'react'
// Layouts
import Layout from '../layouts/Layout'
// Components
import Missions from '../components/Missions/Missions'
// Assets
import rawMissions from '../assets/missions/missions.json'
// Utils
import eth from '../eth'
import abiUtils from '../utils/abiUtils'
// Constants
import { NULL_ADDRESS } from '../utils/constants'

class IndexPage extends Component {
  constructor() {
    super()
    this.state = {
      missions: rawMissions.map(m => ({
        ...abiUtils.decodeMission(m.order),
        ...m,
      }))
    }
  }

  async componentWillReceiveProps(props) {
    const { missions } = this.state
    const newMissions = missions.map(m => ({ ...m, fetching: true }))

    if (props.selectedAddress !== NULL_ADDRESS) {
      this.setState({ missions: newMissions })

      for (let i = 0, l = missions.length; i < l; i += 1) {
        eth.getRequirementAchieved(missions[i].order, props.selectedAddress)
          .then(requirementAchieved => {
            newMissions[i].fetching = false
            newMissions[i].requirementAchieved = requirementAchieved
            this.setState({ missions: newMissions })
          })
      }
    }
  }

  onGetReward = async (misisonIndex) => {
    const { missions } = this.state
    const newMissions = missions

    try {
      const { tx, txSignature } = await eth.signZeroExTransaction(
        newMissions[misisonIndex].order,
        newMissions[misisonIndex].orderSignature,
      )

      const { txHash } = await eth.sendExecuteTransaction(tx, txSignature)

      newMissions[misisonIndex].txHash = txHash

      this.setState({ missions: newMissions })
    } catch (e) {
      console.error(e)
    }
  }

  render() {
    const { missions } = this.state

    return <Layout {...this.props}>
      <Missions title="🔥 LootHunt Airdrop" missions={missions} onGetReward={this.onGetReward} />
    </Layout>
  }
}

export default IndexPage