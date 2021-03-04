import styles from '../styles/LeaderboardCard.module.css'
import calcWinrate from '../utility/calcWinrate.js'

function LeaderboardCard({ summoner, index }) {
  const winrate = calcWinrate(summoner.wins, summoner.losses)
  return (
    <article className={styles.card}>
      <h1 className={styles.name}>{summoner.summonerName}</h1>
      <p className={styles.standing}>Rank {index + 1}</p>
      <p className={styles.rank}>{summoner.leaguePoints} LP</p>
      <progress
        className={styles.winbar}
        value={summoner.wins}
        max={summoner.wins + summoner.losses}
      ></progress>
      <p
        className={
          winrate > 54
            ? styles.winRateHigh
            : winrate >= 50
            ? styles.winRateMedium
            : styles.winRateLow
        }
      >
        Winrate: {winrate}%
      </p>
    </article>
  )
}

export default LeaderboardCard
