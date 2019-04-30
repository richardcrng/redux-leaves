const changeCase = require('change-case')

const argsToPayload = first => first

const type = (leaf, payload) => {
  const { path, condition, CREATOR_KEY } = leaf;
  const suffix = condition
    ? `${condition}.${CREATOR_KEY}`
    : CREATOR_KEY
  return [...path, suffix].join('/')
}

export const leafReducerDefaults = {
  argsToPayload,
  type
}