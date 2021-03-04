import Head from 'next/head'
import styles from '../styles/home.module.css'

import LeaderboardCard from '../components/LeaderboardCard'

export default function Home({ leaderboard }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Summoner Search</title>
      </Head>
      <main className={styles.container}>
        {leaderboard.entries.map((summoner, index) => {
          return (
            <LeaderboardCard summoner={summoner} index={index} key={index} />
          )
        })}
        {/* <LeaderboardCard summoner={leaderboard.entries[0]} /> */}
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
  sortedLeaders = sortedLeaders.splice(200, 301)

  // Reverses list to be highest LP to lowest
  leaderboard.entries = sortedLeaders.reverse()

  return {
    props: {
      leaderboard,
    },
  }
}
