const changeCase = require('change-case')

const argsToPayload = first => first

const actionType = (leaf, payload) => {
  const { path, condition, CREATOR_KEY } = leaf;
  const suffix = condition
    ? `${condition}.${CREATOR_KEY}`
    : CREATOR_KEY
  return [...path, suffix].join('/')
}

const mutate = false

export const leafReducerDefaults = {
  argsToPayload,
  actionType,
  mutate
}