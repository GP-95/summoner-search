// Fetches a game
async function getGameById(region, id) {
  let req = await fetch(
    `https://${region}.api.riotgames.com/lol/match/v4/matches/${id}`,
    {
      headers: {
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Charset': 'application/x-www-form-urlencoded; charset=UTF-8',
        'X-Riot-Token': process.env.API_KEY,
      },
    }
  )

  if (req.status !== 200) {
    return false
  }

  req = await req.json()

  return req
}

export default getGameById
