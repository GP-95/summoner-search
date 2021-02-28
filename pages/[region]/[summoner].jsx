import React, { useState } from 'react'
import Head from 'next/head'
import styles from '../../styles/summoner.module.css'

import findSummoner from '../../utility/findSummoner'
import getSummonerRank from '../../utility/getSummonerRank'
import getLiveGame from '../../utility/getLiveGame'

import fetchChampions from '../../utility/fetchChampions'

import SummonerCard from '../../components/SummonerCard'
import LiveGame from '../../components/LiveGame'

function summoner({ summoner, rank, liveGame, champs }) {
  const [displayLive, showLiveGame] = useState(false)

  return (
    <main className={styles.main}>
      <Head>
        <title>{summoner.name} | Found</title>
      </Head>
      <SummonerCard
        summoner={summoner}
        rank={rank}
        liveGame={liveGame}
        displayCurrentGame={showLiveGame}
      />
      {displayLive ? <LiveGame game={liveGame} champs={champs} /> : null}
    </main>
  )
}

export default summoner

export async function getServerSideProps(ctx) {
  const { region, summoner } = ctx.query

  const req = await findSummoner(region, summoner)

  const rank = await getSummonerRank(region, req.id)

  let liveGame = await getLiveGame(region, req.id) //returns request object

  if (liveGame.status != 200) {
    liveGame = false
    return {
      props: {
        summoner: req,
        rank: rank,
        liveGame: liveGame,
      },
    }
  }

  liveGame = await liveGame.json()
  const champs = await fetchChampions()
  return {
    props: {
      summoner: req,
      rank: rank,
      liveGame: liveGame,
      champs: champs.data,
    },
  }
}
