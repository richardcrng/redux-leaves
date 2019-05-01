import { leafReducerDefaults } from "../../reducersDict/standardise/defaults";

const changeCase = require('change-case')

export const makeActionTemplate = (path = [], { condition, custom } = {}) => {
  return (creatorKey, payload, actionType = leafReducerDefaults.actionType) => {
    const CREATOR_KEY = changeCase.snakeCase(creatorKey).toUpperCase()
    const leaf = { path, condition, creatorKey, CREATOR_KEY, custom }
    const type = (typeof actionType === "function")
      ? actionType(leaf, payload)
      : actionType

    return {
      leaf,
      type,
      payload
    }
  }
}