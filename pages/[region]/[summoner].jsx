import React from 'react'
import Head from 'next/head'
import styles from '../../styles/summoner.module.css'

import findSummoner from '../../utility/findSummoner'

import SummonerCard from '../../components/SummonerCard'

function summoner({ summoner, icon, level, region }) {
  return (
    <main className={styles.main}>
      <Head>
        <title>{summoner} | Found</title>
      </Head>
      <SummonerCard summoner={summoner} level={level} icon={icon} />
    </main>
  )
}

export default summoner

export async function getServerSideProps(ctx) {
  const { region, summoner } = ctx.query

  const req = await findSummoner(region, summoner)

  console.log('------------')
  console.log(req)

  return {
    props: {
      summoner: req.name,
      icon: req.profileIconId,
      level: req.summonerLevel,
      region,
    },
  }
}
