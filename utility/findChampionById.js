function findChampionById(id, champions) {
  const arrOfChamps = Object.values(champions)
  let champ1 = arrOfChamps.findIndex((champ) => champ.key === String(id))
  return arrOfChamps[champ1]
}

export default findChampionById
