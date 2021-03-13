import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import styles from '../../styles/summoner.module.css'

import findSummoner from '../../utility/findSummoner'
import getSummonerRank from '../../utility/getSummonerRank'
import getLiveGame from '../../utility/getLiveGame'
import getSummonerMastery from '../../utility/getSummonerMastery'
import getClashInfo from '../../utility/getClashInfo'
import getSummonerMatches from '../../utility/getSummonerMatches'

import fetchChampions from '../../utility/fetchChampions'

import Navbar from '../../components/Navbar'
import SummonerCard from '../../components/SummonerCard'
import LiveGame from '../../components/LiveGame'
import TopThreeChamps from '../../components/TopThreeChamps'
import ClashInfo from '../../components/ClashInfo'
import Game from '../../components/Game'

function summoner({
  summoner,
  rank,
  liveGame,
  champs,
  mastery,
  clash,
  matches,
}) {
  const [displayLive, showLiveGame] = useState(false)
  const [displayClash, setClash] = useState(false)

  //Clash is loading dummy data for development

  useEffect(() => {
    if (!liveGame) {
      showLiveGame(false)
      setClash(false)
    }
  }, [liveGame, clash])

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
          toggleLiveGame={showLiveGame}
          displayLive={displayLive}
          clash={clash}
          toggleClash={setClash}
          displayClash={displayClash}
        />
      )}
      <TopThreeChamps mastery={mastery} champs={champs} />
      {clash.players ? (
        <ClashInfo clash={clash} display={displayClash} />
      ) : null}
      {displayLive ? <LiveGame game={liveGame} champs={champs} /> : null}
      {!matches
        ? null
        : matches.map((match, index) => (
            <Game
              match={match}
              summoner={summoner}
              champs={champs}
              key={index}
              rank={rank}
            />
          ))}
    </main>
  )
}

export default summoner

export async function getServerSideProps(ctx) {
  const { region, summoner } = ctx.query

  // Getting summoner from Riot
  const req = await findSummoner(region, summoner)
  req.region = region

  // Returns if summoner not found
  if (req.status) {
    return {
      props: {
        summoner: false,
      },
    }
  }

  // Get 10 latest matches
  const matches = await getSummonerMatches(region, req.accountId)

  // Getting rank of selected summoner
  const rank = await getSummonerRank(region, req.id)

  // Getting mastered champions and points for summoner
  const mastery = await getSummonerMastery(region, req.id)

  // Getting live game for selected summoner
  let liveGame = await getLiveGame(region, req.id)

  // Getting list of all champions
  const champs = await fetchChampions()

  // Getting Clash info
  const clash = await getClashInfo(region, req.id)

  return {
    props: {
      summoner: req,
      rank: rank,
      liveGame: liveGame,
      champs: champs.data,
      mastery: mastery.splice(0, 3),
      clash: clash,
      matches: matches,
    },
  }
}
