import React from 'react'
import styles from '../styles/SummonerCard.module.css'
import Image from 'next/image'

function SummonerCard(props) {
  return (
    <article className={styles.card}>
      <div className={styles.iconContainer}>
        <Image
          height={130}
          width={130}
          src={`http://ddragon.leagueoflegends.com/cdn/11.4.1/img/profileicon/${props.icon}.png`}
        />
      </div>
      <h1 className={styles.summonerName}>{props.summoner}</h1>
      <p className={styles.level}>Level: {props.level}</p>
    </article>
  )
}

export default SummonerCard
