async function fetchChampions() {
  let res = await fetch(
    'http://ddragon.leagueoflegends.com/cdn/11.4.1/data/en_US/champion.json'
  )
  res = await res.json()
  return res
}

export default fetchChampions
