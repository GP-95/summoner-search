// Returns an object that
async function queueResolver(id) {
  let queues = await fetch(
    'http://static.developer.riotgames.com/docs/lol/queues.json'
  )
  queues = await queues.json()
  const queue = queues.filter((q) => q.queueId === id)

  return queue
}

export default queueResolver
