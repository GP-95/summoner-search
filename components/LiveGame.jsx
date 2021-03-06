import React, { useEffect, useState } from 'react'
import styles from '../styles/LiveGame.module.css'

import findChampionById from '../utility/findChampionById'

function LiveGame({ game, champs }) {
  if (!game) {
    return null
  }

  return (
    <article className={styles.currentGameContainer}>
      <div className={styles.blueTeam100}>
        {game.participants
          .filter((player) => player.teamId === 100)
          .map((player) => {
            const champion = findChampionById(player.championId, champs)
            return (
              <section
                key={player.summonerName}
                className={styles.blueSummoner}
              >
                <div className={styles.nameIcon}>
                  <div className={styles.iconContainer}>
                    <img
                      className={styles.summonerIcon}
                      src={`https://ddragon.leagueoflegends.com/cdn/11.2.1/img/profileicon/${player.profileIconId}.png`}
                      alt='Icon'
                    />
                  </div>
                  <div className={styles.summonerName}>
                    {player.summonerName}
                  </div>
                </div>
                <div className={styles.champIconContainer}>
                  <img
                    className={styles.champIcon}
                    src={`https://ddragon.leagueoflegends.com/cdn/11.4.1/img/champion/${champion.image.full}`}
                    alt={champion.name}
                  />
                  <span className={styles.tooltip} blue='team'>
                    {champion.name}
                  </span>
                </div>
              </section>
            )
          })}
      </div>
      <div className={styles.redTeam200}>
        {game.participants
          .filter((player) => player.teamId === 200)
          .map((player) => {
            const champion = findChampionById(player.championId, champs)
            return (
              <section key={player.summonerName} className={styles.redSummoner}>
                <div className={styles.nameIcon} red='team'>
                  <div className={styles.iconContainer}>
                    <img
                      className={styles.summonerIcon}
                      src={`http://ddragon.leagueoflegends.com/cdn/11.2.1/img/profileicon/${player.profileIconId}.png`}
                      alt='Icon'
                    />
                  </div>
                  <div className={styles.summonerName}>
                    {player.summonerName}
                  </div>
                </div>
                <div className={styles.champIconContainer}>
                  <img
                    className={styles.champIcon}
                    src={`http://ddragon.leagueoflegends.com/cdn/11.4.1/img/champion/${champion.image.full}`}
                    alt={champion.name}
                  />
                  <span className={styles.tooltip}>{champion.name}</span>
                </div>
              </section>
            )
          })}
      </div>
    </article>
  )
}

export default LiveGame
