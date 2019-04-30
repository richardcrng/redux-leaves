export const argsToPayload = first => first

export const makeType = (leaf, payload) => {
  const { path, condition, creatorKey } = leaf;
  const suffix = condition
    ? `${condition}.${creatorKey}`
    : creatorKey
  return [...path, suffix].join('/')
}