const argsToPayload = first => first

const type = (leaf, payload) => {
  const { path, condition, creatorKey } = leaf;
  const suffix = condition
    ? `${condition}.${creatorKey}`
    : creatorKey
  return [...path, suffix].join('/')
}

export const leafReducerDefaults = {
  argsToPayload,
  type
}