import leafReducerDefaults from "../../reducersDict/standardise/defaults";
import LeafStandardAction from "../../types/Actions/LSA";
import LeafCreatorCondition from "../../types/Leaf/Creator/Condition";
import LeafActionTemplate from '../../types/Leaf/Action/Template';

const changeCase = require('change-case')

type MakeActionTemplateOptions = {
  condition?: LeafCreatorCondition
  custom?: boolean
}

export const makeActionTemplate = (path: string[] = [], { condition, custom } : MakeActionTemplateOptions = {}) : LeafActionTemplate => {
  return (creatorKey: string, payload: any, actionType = leafReducerDefaults.actionType) : LeafStandardAction => {
    const CREATOR_KEY = changeCase.snakeCase(creatorKey).toUpperCase()
    const leaf = { path, condition, creatorKey, CREATOR_KEY, custom }
    const type = (typeof actionType === "function")
      ? actionType(leaf)
      : actionType

    return {
      leaf,
      type,
      payload
    }
  }
}