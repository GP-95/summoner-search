import React from 'react'
import styles from '../styles/SummonerCard.module.css'
import Image from 'next/image'

import Rank from '../components/Rank.jsx'

function SummonerCard({ summoner, rank, liveGame, displayCurrentGame }) {
  return (
    <article className={styles.card}>
      <div className={styles.iconContainer}>
        <Image
          height={130}
          width={130}
          src={`http://ddragon.leagueoflegends.com/cdn/11.4.1/img/profileicon/${summoner.profileIconId}.png`}
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
        onClick={() => displayCurrentGame(true)}
        disabled={!liveGame}
      >
        {liveGame ? 'Get current game' : 'Not in game'}
      </button>
    </article>
  )
}

export default SummonerCard
