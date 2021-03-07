import React, { useState } from 'react'
import styles from '../styles/SummonerCard.module.css'
import Image from 'next/image'
import 'animate.css'

import Rank from '../components/Rank.jsx'

async function getClashInfo(id, setState) {
  let clashInfo = await fetch(`http://localhost:3000/api/clash/${id}`)

  clashInfo = await clashInfo.json()

  console.log(clashInfo)
  setState(clashInfo.data)
}

function SummonerCard({
  summoner,
  rank,
  liveGame,
  displayCurrentGame,
  displayLive,
}) {
  const [clash, setClash] = useState({})

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
        onClick={() => displayCurrentGame(!displayLive)}
        disabled={!liveGame}
      >
        {liveGame ? 'Get current game' : 'Not in game'}
      </button>
      <button
        type='button'
        className={`${styles.btn} ${styles.clash}`}
        onClick={() => getClashInfo(summoner.id, setClash)}
      >
        Clash Info
      </button>
      {clash.name ? <h1>Team: {clash.name}</h1> : null}
    </article>
  )
}

export default SummonerCard
