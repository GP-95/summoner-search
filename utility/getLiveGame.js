async function getLiveGame(region, id) {
  try {
    let request = await fetch(
      `https://${region}.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${id}`,
      {
        headers: {
          'Accept-Language': 'en-US,en;q=0.5',
          'Accept-Charset': 'application/x-www-form-urlencoded; charset=UTF-8',
          'X-Riot-Token': process.env.API_KEY,
        },
      }
    )

    if (request.status != 200) {
      return false
    }

    request = await request.json()

    return request
  } catch (err) {
    console.log('error: ' + err)
    return err
  }
}

export default getLiveGame
