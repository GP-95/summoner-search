import React from 'react'
import Head from 'next/head'
import styles from '../../styles/summoner.module.css'

import findSummoner from '../../utility/findSummoner'

function summoner({ summoner, region }) {
  return (
    <main className={styles.main}>
      <Head>
        <title>Summoner Search</title>
      </Head>
      <h1>{summoner}</h1>
      <p>{region}</p>
    </main>
  )
}

export default summoner

export async function getServerSideProps(ctx) {
  const { region, summoner } = ctx.query

  const req = await findSummoner(region, summoner)

  console.log(req)

  return {
    props: { summoner, region },
  }
}
