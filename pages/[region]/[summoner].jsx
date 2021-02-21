import React from 'react'
import Head from 'next/head'
import styles from '../../styles/summoner.module.css'

import findSummoner from '../../utility/findSummoner'
import getSummonerRank from '../../utility/getSummonerRank'

import SummonerCard from '../../components/SummonerCard'

function summoner({ summoner, rank }) {
  return (
    <main className={styles.main}>
      <Head>
        <title>{summoner.name} | Found</title>
      </Head>
      <SummonerCard summoner={summoner} rank={rank} />
    </main>
  )
}

export default summoner

export async function getServerSideProps(ctx) {
  const { region, summoner } = ctx.query

  const req = await findSummoner(region, summoner)

  const rank = await getSummonerRank(region, req.id)

  return {
    props: {
      summoner: req,
      rank: rank,
    },
  }
}
