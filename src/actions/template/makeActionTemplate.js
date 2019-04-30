import { leafReducerDefaults } from "../../reducersDict/standardise/defaults";

export const makeActionTemplate = (path = [], { condition, custom } = {}) => {
  return (creatorKey, payload, typeDef = leafReducerDefaults.type) => {
    const leaf = { path, condition, creatorKey, custom }
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