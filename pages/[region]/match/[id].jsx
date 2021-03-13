import getGameById from '../../../utility/getGameById'
import styles from '../../../styles/match.module.css'

import queueResolver from '../../../utility/queueResolver'
import { useEffect, useState } from 'react'

function Match({ match }) {
  let map

  const startDate = new Date(match.gameCreation).toLocaleDateString()
  const startTime = new Date(match.gameCreation).toLocaleTimeString()

  useEffect(() => {
    map = queueResolver(queueResolver(match.queueId))
  }, [])
  return (
    <main className={styles.main}>
      <div className={styles.infoBar}>
        {startDate} - {startTime}
      </div>
      <p>{map.map}</p>
    </main>
  )
}

export default Match

export async function getServerSideProps(ctx) {
  const { region, id } = ctx.query

  const match = await getGameById(region, id)

  return {
    props: { match },
  }
}
