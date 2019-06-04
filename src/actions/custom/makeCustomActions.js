import * as R from 'ramda'
import { makeActionTemplate } from '../template/makeActionTemplate';

export const makeCustomActions = (reducersDict = {}, pathToLeafOrBranch = []) => {
  const actionTemplate = makeActionTemplate(pathToLeafOrBranch, { custom: true })
  return R.mapObjIndexed(
    makeCustomActionCreator(actionTemplate),
    reducersDict
  )
}

const makeCustomActionCreator = R.curry((actionTemplate, leafReducer, creatorKey) => {
  const { argsToPayload } = leafReducer;
  return (...args) => {
    const payload = argsToPayload(...args)
    return actionTemplate(creatorKey, payload, leafReducer.type)
  }
})