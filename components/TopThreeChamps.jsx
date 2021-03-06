import findChampionById from '../utility/findChampionById'
import { useEffect, useState } from 'react'
import styles from '../styles/TopThreeChamps.module.css'
import 'animate.css'

function TopThreeChamps({ champs, mastery }) {
  const [topThree, setTopThree] = useState([])

  useEffect(async () => {
    let arr = []
    mastery.forEach((mast) => {
      let info = findChampionById(mast.championId, champs)
      arr.push({
        image: info.image.full,
        key: info.key,
        name: info.name,
        level: mast.level,
        points: mast.championPoints,
        lastPlayed: mast.lastPlayTime,
      })
      return
    })
    const orderdArr = []
    arr = arr.sort((a, b) => a - b)
    orderdArr.push(arr[1])
    orderdArr.push(arr[2])
    orderdArr.push(arr[0])
    setTopThree(orderdArr)
  }, [mastery])

  return (
    <section
      className={`${styles.container} animate__animated animate__fadeInDown animate__delay-1s`}
    >
      {topThree
        ? topThree.map((champ) => (
            <article className={styles.champ} key={champ.key}>
              <img
                src={`http://ddragon.leagueoflegends.com/cdn/11.4.1/img/champion/${champ.image}`}
                alt={`${champ.name} icon`}
                className={styles.icon}
              />
              <h1 className={styles.name}>{champ.name}</h1>
              <p>
                {champ.points.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </p>
            </article>
          ))
        : null}
    </section>
  )
}

export default TopThreeChamps
