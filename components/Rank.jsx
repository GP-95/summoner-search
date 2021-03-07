import React from 'react'
import Image from 'next/image'
import calcWinRate from '../utility/calcWinrate.js'

import styles from '../styles/Rank.module.css'

function Rank({ rank }) {
  const highRank = ['CHALLENGER', 'MASTER', 'GRANDMASTER']

  const winrate = calcWinRate(rank.wins, rank.losses)

  function formatWord(word) {
    const lowerCase = word.toLowerCase()

    return lowerCase.replace(lowerCase[0], word[0])
  }

  return (
    <div className={styles.main}>
      <h1>{rank.queueType == 'RANKED_SOLO_5x5' ? 'Solo' : 'Flex'} Queue</h1>
      <Image
        src={`/assets/rankEmblems/${rank.tier}.png`}
        width={100}
        height={100}
        alt={`${rank.tier.toLowerCase()} rank icon`}
      />
      <p className={styles.rank}>
        {formatWord(rank.tier)}{' '}
        {highRank.includes(rank.tier) ? null : rank.rank}
      </p>
      <p className={styles.matches}>
        W: <span style={{ color: 'rgba(0, 128, 0, 0.7)' }}>{rank.wins}</span> /
        L: <span style={{ color: 'rgba(146, 1, 1, 0.7)' }}>{rank.losses}</span>
      </p>
      <div
        className={
          winrate > 54
            ? styles.winRateHigh
            : winrate >= 50
            ? styles.winRateMedium
            : styles.winRateLow
        }
      >
        Winrate: {winrate}%
      </div>
    </div>
  )
}

export default Rank
