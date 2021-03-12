// Gets top the 10 latest games by accountId
async function getSummonerMatches(
  region,
  accountId,
  beginIndex = 0,
  endIndex = 10
) {
  let games = await fetch(
    `https://${region}.api.riotgames.com/lol/match/v4/matchlists/by-account/${accountId}?endIndex=${endIndex}&beginIndex=${beginIndex}`,
    {
      headers: {
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Charset': 'application/x-www-form-urlencoded; charset=UTF-8',
        'X-Riot-Token': process.env.API_KEY,
      },
    }
  )
  if (games.status !== 200) {
    return false
  }

  games = await games.json()

  //Return only matches, although other info exists on response
  return games.matches
}

export default getSummonerMatches
