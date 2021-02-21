import React from 'react'
import styles from '../styles/SummonerRank.module.css'
import calcWinRate from '../utility/calcWinRate.js'

function SummonerRank({ rank }) {
  console.log(rank)
  return (
    <div className={styles.rank}>
      <h1 className={styles.queue}>{rank.queueType}Q</h1>
      {rank.rank === 'Unranked' ? (
        <h1 className={styles.unranked}>Unranked</h1>
      ) : (
        <div>
          <div className={styles.rankContainer}>
            <img
              className={styles.rankEmblem}
              src={`/assets/rankEmblems/${rank.tier}.png`}
              alt={`${rank.tier} rank emblem`}
            ></img>
            <div className={styles.rankInfoContainer}>
              <h3 className={styles.league}>{`${rank.tier} ${rank.rank}`}</h3>
              <h3
                className={styles.leaguePoints}
              >{`${rank.leaguePoints} LP`}</h3>
            </div>
          </div>
          <div
            className={
              calcWinRate(rank.wins, rank.losses) > 54
                ? styles.winRateHigh
                : calcWinRate(rank.wins, rank.losses) >= 50
                ? styles.winRateMedium
                : styles.winRateLow
            }
          >
            Winrate: {calcWinRate(rank.wins, rank.losses)}%
          </div>
        </div>
      )}
    </div>
  )
}

export default SummonerRank
