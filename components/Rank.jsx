import React from 'react'
import Image from 'next/image'
import calcWinRate from '../utility/calcWinRate.js'

import styles from '../styles/Rank.module.css'

function Rank({ rank }) {
  return (
    <div className={styles.main}>
      <h1>{rank.queueType == 'RANKED_SOLO_5x5' ? 'Solo' : 'Flex'} Queue</h1>
      <Image
        src={`/assets/rankEmblems/${rank.tier}.png`}
        width={100}
        height={100}
      />
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
  )
}

export default Rank
