import { useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/home.module.css'
import LeaderboardCard from '../components/LeaderboardCard'

export default function Home({ loading, setLoading, leaderboard }) {
  useEffect(() => {
    setLoading(false)
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>Summoner Search</title>
      </Head>
      {!loading ? (
        <>
          <Image
            src='/assets/rankEmblems/CHALLENGER.png'
            width={100}
            height={100}
          />
          <h1 className={styles.heading}>Top 10 EUW</h1>
        </>
      ) : null}
      <main className={styles.container}>
        {!loading ? (
          leaderboard.entries.map((summoner, index) => (
            <LeaderboardCard summoner={summoner} index={index} key={index} />
          ))
        ) : (
          <>
            <div className={styles.ldsRipple}>
              <div></div>
              <div></div>
            </div>
            <h1 className={styles.loading}>Loading...</h1>
          </>
        )}
      </main>
    </div>
  )
}

export async function getStaticProps() {
  let leaderboard = await fetch(
    'https://euw1.api.riotgames.com/lol/league/v4/challengerleagues/by-queue/RANKED_SOLO_5x5',
    {
      headers: {
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Charset': 'application/x-www-form-urlencoded; charset=UTF-8',
        'X-Riot-Token': process.env.API_KEY,
      },
    }
  )
  leaderboard = await leaderboard.json()

  // Sorts all players by LP (lowest to highest)
  let sortedLeaders = leaderboard.entries.sort(function (a, b) {
    return a.leaguePoints - b.leaguePoints
  })

  // Gets the 100 players wit hhighest LP
  sortedLeaders = sortedLeaders.splice(290, 301)

  // Reverses list to be highest LP to lowest
  leaderboard.entries = sortedLeaders.reverse()

  return {
    props: {
      leaderboard,
    },
  }
}
