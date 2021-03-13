import { useEffect } from 'react'
import Link from 'next/link'

import styles from '../styles/Game.module.css'
import findChampionById from '../utility/findChampionById'
import roleIconResolver from '../utility/roleResolver'

function Game({ match, champs, summoner, rank }) {
  const champ = findChampionById(match.champion, champs)
  const date = new Date(match.timestamp * 1000).toLocaleString()

  return (
    <Link
      href={
        process.env.NEXT_PUBLIC_URL +
        `/${summoner.region}/match/${match.gameId}`
      }
    >
      <article className={styles.card}>
        <img
          className={styles.champIcon}
          src={`https://ddragon.leagueoflegends.com/cdn/11.4.1/img/champion/${champ.image.full}`}
          alt={champ.name}
        />
        <p>Date: {date}</p>
        {match.lane === 'NONE' ? (
          <img className={styles.fillIcon} src='/fill.svg' alt='Fill icon' />
        ) : (
          <img
            src={roleIconResolver(
              match.lane,
              match.role === 'SOLO' ? rank[0].tier : rank[1].tier
            )}
            alt={`${match.role} icon`}
          />
        )}
      </article>
    </Link>
  )
}

export default Game
