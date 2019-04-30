export const makeActionTemplate = (path = [], { condition, custom } = {}) => {
  return (creatorKey, payload, makeType = defaultMakeType) => {
    const leaf = { path, condition, creatorKey, custom }
    const type = typeof makeType === "function"
      ? makeType(leaf, payload)
      : makeType

    return {
      leaf,
      type,
      payload
    }
  }
}

const defaultMakeType = (leaf, payload) => {
  const { path, condition, creatorKey } = leaf;
  const suffix = condition
    ? `${condition}.${creatorKey}`
    : creatorKey
  return [...path, suffix].join('/')
}