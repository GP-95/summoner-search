import nc from 'next-connect'

const handler = nc().get(async (req, res) => {
  const id = req.query.id

  try {
    let clashSummoner = await fetch(
      `https://euw1.api.riotgames.com/lol/clash/v1/players/by-summoner/${id}`,
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
      return res.status(404).json({ data: 'Clash info not found' })
    }

    let clashTeam = await fetch(
      `https://euw1.api.riotgames.com/lol/clash/v1/teams/${clashSummoner[0].teamId}`,
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
          `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/${player.summonerId}`,
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

    res.status(200).json({ data: { ...clashTeam, players: teamMembers } })
  } catch (error) {
    console.log(error)

    res.status(500).json({ error: error })
  }
})

export default handler
