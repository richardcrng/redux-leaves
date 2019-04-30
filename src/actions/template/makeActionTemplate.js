export const makeActionTemplate = (path = [], { condition, custom } = {}) => {
  return (creatorKey, payload, typeProp = defaultTypeProp) => {
    const leaf = { path, condition, creatorKey, custom }
    const type = (typeof typeProp === "function")
      ? typeProp(leaf, payload)
      : typeProp

    return {
      leaf,
      type,
      payload
    }
  }
}

const defaultTypeProp = (leaf, payload) => {
  const { path, condition, creatorKey } = leaf;
  const suffix = condition
    ? `${condition}.${creatorKey}`
    : creatorKey
  return [...path, suffix].join('/')
}