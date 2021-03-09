import styles from '../styles/ClashInfo.module.css'
import Image from 'next/image'
import Link from 'next/link'
import 'animate.css'

function ClashInfo({ clash, display }) {
  if (!display) {
    return null
  }

  return (
    <main className={`${styles.main} animate__animated animate__fadeInUp`}>
      <h3 className={styles.teamName}>{clash.name}</h3>
      <section className={styles.teamContainer}>
        {clash.players
          .filter((player) => player.position === 'top')
          .map((player) => (
            <div key={player.id} className={styles.playerContainer}>
              <Link
                href={
                  process.env.NEXT_PUBLIC_URL +
                  `/${clash.region}/${player.name}`
                }
              >
                <p
                  className={styles.playerName}
                  captain={player.captain ? 'true' : undefined}
                >
                  {player.name}
                </p>
              </Link>
              <div className={styles.positionContainer}>
                <p className={styles.role}>Top</p>
                <Image
                  src='/assets/rankedPositions/Position_Grandmaster-Top.png'
                  width={30}
                  height={30}
                  alt={'top icon'}
                />
              </div>
            </div>
          ))}
        {clash.players
          .filter((player) => player.position === 'jungler')
          .map((player) => (
            <div key={player.id} className={styles.playerContainer}>
              <Link
                href={
                  process.env.NEXT_PUBLIC_URL +
                  `/${clash.region}/${player.name}`
                }
              >
                <p
                  className={styles.playerName}
                  captain={player.captain ? 'true' : undefined}
                >
                  {player.name}
                </p>
              </Link>
              <div className={styles.positionContainer}>
                <p className={styles.role}>Jungle</p>
                <Image
                  src='/assets/rankedPositions/Position_Grandmaster-Jungle.png'
                  width={30}
                  height={30}
                  alt={'jungle icon'}
                />
              </div>
            </div>
          ))}
        {clash.players
          .filter((player) => player.position === 'mid')
          .map((player) => (
            <div key={player.id} className={styles.playerContainer}>
              <Link
                href={
                  process.env.NEXT_PUBLIC_URL +
                  `/${clash.region}/${player.name}`
                }
              >
                <p
                  className={styles.playerName}
                  captain={player.captain ? 'true' : undefined}
                >
                  {player.name}
                </p>
              </Link>
              <div className={styles.positionContainer}>
                <p className={styles.role}>Mid</p>
                <Image
                  src='/assets/rankedPositions/Position_Grandmaster-Mid.png'
                  width={30}
                  height={30}
                  alt={'mid icon'}
                />
              </div>
            </div>
          ))}
        {clash.players
          .filter((player) => player.position === 'bottom')
          .map((player) => (
            <div key={player.id} className={styles.playerContainer}>
              <Link
                href={
                  process.env.NEXT_PUBLIC_URL +
                  `/${clash.region}/${player.name}`
                }
              >
                <p
                  className={styles.playerName}
                  captain={player.captain ? 'true' : undefined}
                >
                  {player.name}
                </p>
              </Link>
              <div className={styles.positionContainer}>
                <p className={styles.role}>ADC</p>
                <Image
                  src='/assets/rankedPositions/Position_Grandmaster-Bot.png'
                  width={30}
                  height={30}
                  alt={'ADC icon'}
                />
              </div>
            </div>
          ))}
        {clash.players
          .filter((player) => player.position === 'utility')
          .map((player) => (
            <div key={player.id} className={styles.playerContainer}>
              <Link
                href={
                  process.env.NEXT_PUBLIC_URL +
                  `/${clash.region}/${player.name}`
                }
              >
                <p
                  className={styles.playerName}
                  captain={player.captain ? 'true' : undefined}
                >
                  {player.name}
                </p>
              </Link>
              <div className={styles.positionContainer}>
                <p className={styles.role}>Support</p>
                <Image
                  src='/assets/rankedPositions/Position_Grandmaster-Support.png'
                  width={30}
                  height={30}
                  alt={'support icon'}
                />
              </div>
            </div>
          ))}
      </section>
    </main>
  )
}

export default ClashInfo
