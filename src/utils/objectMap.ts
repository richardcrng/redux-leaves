function objectMap<T = any, S = any>(
  callback: ([key, val]: [string, T]) => [string, S],
  object: object
) {
  const entries = Object.entries(object)
  const newEntries = entries.map(callback)
  return Object.fromEntries(newEntries)
}

export default objectMap