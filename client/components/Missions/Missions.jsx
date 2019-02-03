import React from 'react'
// Components
import MissionData from './MissionData'
// Styles
import s from './Missions.sass'

const Missions = ({ title, missions, onGetReward }) => {
  return (
    <div className={s.container}>
      <h2 className={s.title}>{title}</h2>
      {missions.map(
        ({
          orderHash,
          requirements,
          reward,
          fetching,
          requirementAchieved,
        }, missionIndex) => (
          <div className={s.mission} key={orderHash}>
            <div className={s.requirements}>
              {requirements.map((r, requirementIndex) => (
                <MissionData
                  fetching={fetching}
                  achieved={(requirementAchieved || [])[requirementIndex]}
                  data={r}
                  key={JSON.stringify(r)}
                />
              ))}
            </div>
            <div className={s.divider} />
            <div className={s.reward}>
              <MissionData data={reward} />
            </div>
            <button className={s.get} onClick={() => onGetReward(missionIndex)} type="button">
              <h4>GET</h4>
            </button>
          </div>
        ),
      )}
    </div>
  )
}

export default Missions
