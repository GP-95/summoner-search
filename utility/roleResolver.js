function roleIconResolver(role, rank = 'master') {
  if (role === 'NONE') {
    return '/fill.svg'
  }

  return `/assets/rankedPositions/Position_${formatString(rank)}-${formatString(
    role
  )}.png`
}

function formatString(string) {
  const lowerString = string.toLowerCase()
  const capitalizedString = lowerString.replace(
    string[0],
    string[0].toUpperCase()
  )
  return capitalizedString
}

export default roleIconResolver
