function calcWinRate(wins, losses) {
  const winrate =
    (Math.floor((wins * 100) / (wins + losses) + Number.EPSILON) * 100) / 100

  return winrate
}

export default calcWinRate
