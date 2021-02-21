import React, { useEffect } from 'react'
import styles from '../styles/LiveGame.module.css'

function LiveGame({ game }) {
  return (
    <article className={styles.currentGameContainer}>
      <div className={styles.blueTeam100}>
        {game.participants
          .filter((player) => player.teamId === 100)
          .map((player) => {
            return (
              <section
                key={player.summonerName}
                className={styles.blueSummoner}
              >
                <div className={styles.iconContainer}>
                  <img
                    className={styles.summonerIcon}
                    src={`http://ddragon.leagueoflegends.com/cdn/11.2.1/img/profileicon/${player.profileIconId}.png`}
                    alt='Icon'
                  />
                </div>
                <div className={styles.summonerName}>{player.summonerName}</div>
              </section>
            )
          })}
      </div>
      <div className={styles.redTeam200}>
        {game.participants
          .filter((player) => player.teamId === 200)
          .map((player) => {
            return (
              <section key={player.summonerName} className={styles.redSummoner}>
                <div className={styles.summonerName}>{player.summonerName}</div>
                <div className={styles.iconContainer}>
                  <img
                    className={styles.summonerIcon}
                    src={`http://ddragon.leagueoflegends.com/cdn/11.2.1/img/profileicon/${player.profileIconId}.png`}
                    alt='Summoner Icon'
                  />
                </div>
              </section>
            )
          })}
      </div>
    </article>
  )
}

export default LiveGame
