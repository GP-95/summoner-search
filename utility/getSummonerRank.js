async function getSummonerRank(region, id) {
  // get summoner rank from riot by id
  let request = await fetch(
    `https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}`,
    {
      headers: {
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Charset': 'application/x-www-form-urlencoded; charset=UTF-8',
        'X-Riot-Token': process.env.API_KEY,
      },
    }
  )

  request = await request.json()
  return request
}

export default getSummonerRank
