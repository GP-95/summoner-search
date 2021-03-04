import findChampionById from '../utility/findChampionById'
import fetchChampions from '../utility/fetchChampions'
import { useEffect, useState } from 'react'

function TopThreeChamps({ champs, mastery }) {
  useEffect(async () => {
    const arr = []

    mastery.forEach((mast) => {
      console.log(mast.championId)
      let info = findChampionById(mast.championId, champs)
      arr.push({ ...info, ...mast })
    })

    console.log(arr)
  }, [])

  return <section></section>
}

export default TopThreeChamps
