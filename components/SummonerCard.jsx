import React, { useState } from 'react'
import styles from '../styles/SummonerCard.module.css'
import Image from 'next/image'
import 'animate.css'

import Rank from '../components/Rank.jsx'

function SummonerCard({
  summoner,
  rank,
  liveGame,
  toggleLiveGame,
  displayLive,
  clash,
  toggleClash,
  displayClash,
}) {
  return (
    <article
      className={`${styles.card} animate__animated animate__slideInDown`}
    >
      <div className={styles.iconContainer}>
        <Image
          height={130}
          width={130}
          src={`https://ddragon.leagueoflegends.com/cdn/11.4.1/img/profileicon/${summoner.profileIconId}.png`}
          alt='Summoner Icon'
        />
      </div>
      <h1 className={styles.summonerName}>{summoner.name}</h1>
      <p className={styles.level}>Level: {summoner.summonerLevel}</p>
      <section className={styles.rank}>
        {rank.length
          ? rank.map((queue) => {
              return (
                <React.Fragment key={queue.queueType}>
                  <Rank rank={queue} />
                </React.Fragment>
              )
            })
          : null}
      </section>
      <button
        type='button'
        className={styles.btn}
        onClick={() => toggleLiveGame(!displayLive)}
        disabled={!liveGame}
      >
        {liveGame ? 'Get current game' : 'Not in game'}
      </button>
      <button
        type='button'
        className={`${styles.btn} ${styles.clash}`}
        onClick={() => toggleClash(!displayClash)}
        disabled={!clash}
      >
        {clash ? 'Get Clash info' : 'Not in a Clash team'}
      </button>
    </article>
  )
}

export default SummonerCard
