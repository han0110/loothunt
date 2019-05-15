import React from 'react'
import { hexToNumber } from 'web3-utils'
// Components
import MissionData from './MissionData'
// Utils
// Styles
import s from './Missions.sass'

const Missions = ({ title, missions, onGetReward }) => (
  <div className={s.container}>
    <h2 className={s.title}>{title}</h2>
    {missions.map(
      (
        {
          order,
          orderHash,
          requirements,
          reward,
          fetching,
          requirementAchieved,
          filled,
          txHash,
          active,
        },
        missionIndex,
      ) => (
        <div className={s.mission} key={orderHash}>
          <div className={s.requirements}>
            {requirements.map((r, requirementIndex) => (
              <MissionData
                fetching={fetching}
                achieved={
                  (requirementAchieved || [])[requirementIndex]
                }
                data={r}
                key={JSON.stringify(r)}
              />
            ))}
          </div>
          <div className={s.divider} />
          <div className={s.reward}>
            <MissionData data={reward} />
          </div>
          {txHash ? (
            <a
              className={s.viewTx}
              href={`https://etherscan.io/tx/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <h5>VIEW TX</h5>
            </a>
          ) : (
            <button
              className={s.get}
              onClick={() => onGetReward(missionIndex)}
              data-active={active}
              type="button"
            >
              <h4>GET</h4>
              <p>
                {filled || 0} / {hexToNumber(order.takerAssetAmount)}
              </p>
            </button>
          )}
        </div>
      ),
    )}
  </div>
)

export default Missions
