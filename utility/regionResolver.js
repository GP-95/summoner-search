function regionResolver(region) {
  switch (region) {
    case 'euw1':
      return 'euw'

    case 'eune1':
      return 'eune'
    case 'na1':
      return 'na'
    default:
      return 'euw'
  }
}

export default regionResolver
