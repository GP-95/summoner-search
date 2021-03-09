async function getClashInfo(region, id) {
  let clashSummoner = await fetch(
    `https://${region}.api.riotgames.com/lol/clash/v1/players/by-summoner/${id}`,
    {
      headers: {
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Charset': 'application/x-www-form-urlencoded; charset=UTF-8',
        'X-Riot-Token': process.env.API_KEY,
      },
    }
  )

  clashSummoner = await clashSummoner.json()

  if (!clashSummoner.length) {
    return {
      //Remove placeholder data
      name: 'team 1',
      region: 'euw1',
      players: [
        { id: 1, captain: true, name: 'Support Player', position: 'utility' },
        { id: 2, captain: false, name: 'The Midlaner', position: 'mid' },
        { id: 3, captain: false, name: 'The Toplaner', position: 'top' },
        { id: 4, captain: false, name: 'The ADC', position: 'bottom' },
        { id: 5, captain: false, name: 'The Jungler', position: 'jungler' },
      ],
    }

    return false
  }

  let clashTeam = await fetch(
    `https://${region}.api.riotgames.com/lol/clash/v1/teams/${clashSummoner[0].teamId}`,
    {
      headers: {
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Charset': 'application/x-www-form-urlencoded; charset=UTF-8',
        'X-Riot-Token': process.env.API_KEY,
      },
    }
  )

  clashTeam = await clashTeam.json()

  const teamMembers = []

  await Promise.all(
    clashTeam.players.map(async (player) => {
      let summoner = await fetch(
        `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/${player.summonerId}`,
        {
          headers: {
            'Accept-Language': 'en-US,en;q=0.5',
            'Accept-Charset':
              'application/x-www-form-urlencoded; charset=UTF-8',
            'X-Riot-Token': process.env.API_KEY,
          },
        }
      )
      summoner = await summoner.json()

      const member = {
        position: player.position,
        captain: player.role === 'CAPTAIN' ? true : false,
        id: summoner.id,
        name: summoner.name,
        icon: summoner.profileIconId,
        level: summoner.summonerLevel,
      }

      teamMembers.push(member)
    })
  )

  return { ...clashTeam, players: teamMembers }
}

export default getClashInfo
