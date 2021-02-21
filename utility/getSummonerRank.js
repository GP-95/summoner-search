async function findSummoner(region, id) {
  // requests a summoner from Riot API by summoner name
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

export default findSummoner
