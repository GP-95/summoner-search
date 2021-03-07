import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import styles from '../../styles/summoner.module.css'

import findSummoner from '../../utility/findSummoner'
import getSummonerRank from '../../utility/getSummonerRank'
import getLiveGame from '../../utility/getLiveGame'
import getSummonerMastery from '../../utility/getSummonerMastery'

import fetchChampions from '../../utility/fetchChampions'

import SummonerCard from '../../components/SummonerCard'
import LiveGame from '../../components/LiveGame'
import TopThreeChamps from '../../components/TopThreeChamps'

function summoner({ summoner, rank, liveGame, champs, mastery }) {
  const [displayLive, showLiveGame] = useState(false)
  // const [displayClash, showClash] = useState(false)

  useEffect(() => {
    if (!liveGame) {
      showLiveGame(false)
    }
  }, [liveGame])

  return (
    <main className={styles.main}>
      <Head>
        <title>{summoner.name} | Found</title>
      </Head>
      {!summoner ? (
        <h1>{'Summoner not found :('}</h1>
      ) : (
        <SummonerCard
          summoner={summoner}
          rank={rank}
          liveGame={liveGame}
          displayCurrentGame={showLiveGame}
          toggleLiveGame={showLiveGame}
          displayLive={displayLive}
        />
      )}
      <TopThreeChamps mastery={mastery} champs={champs} />
      {displayLive ? <LiveGame game={liveGame} champs={champs} /> : null}
    </main>
  )
}

export default summoner

export async function getServerSideProps(ctx) {
  const { region, summoner } = ctx.query

  const req = await findSummoner(region, summoner)

  if (req.status) {
    return {
      props: {
        summoner: false,
      },
    }
  }

  const rank = await getSummonerRank(region, req.id)

  const mastery = await getSummonerMastery(region, req.id)

  let liveGame = await getLiveGame(region, req.id) //returns request object

  const champs = await fetchChampions()

  if (liveGame.status != 200) {
    return {
      props: {
        summoner: req,
        rank: rank,
        liveGame: false,
        champs: champs.data,
        mastery: mastery.splice(0, 3),
      },
    }
  }

  liveGame = await liveGame.json()
  return {
    props: {
      summoner: req,
      rank: rank,
      liveGame: liveGame,
      champs: champs.data,
      mastery: mastery.splice(0, 3),
      clash: { ...clashTeam, players: teamMembers },
    },
  }
}
