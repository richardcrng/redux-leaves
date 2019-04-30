import { leafReducerDefaults } from "../../reducersDict/standardise/defaults";

const changeCase = require('change-case')

export const makeActionTemplate = (path = [], { condition, custom } = {}) => {
  return (creatorKey, payload, typeDef = leafReducerDefaults.type) => {
    const CREATOR_KEY = changeCase.snakeCase(creatorKey).toUpperCase()
    const leaf = { path, condition, creatorKey, CREATOR_KEY, custom }
    const type = (typeof typeDef === "function")
      ? typeDef(leaf, payload)
      : typeDef

    return {
      leaf,
      type,
      payload
    }
  }
}