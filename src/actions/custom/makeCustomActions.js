import _ from 'lodash';
import { makeActionTemplate } from '../template/makeActionTemplate';

export const makeCustomActions = (reducersDict = {}, pathToLeafOrBranch = []) => {
  const actionTemplate = makeActionTemplate(pathToLeafOrBranch, { custom: true })
  return _.mapValues(
    reducersDict,
    (leafReducer, creatorKey) => makeCustomActionCreator(leafReducer, creatorKey, actionTemplate)
  )
}

const makeCustomActionCreator = (leafReducer, creatorKey, actionTemplate) => {
  const { argsToPayload } = leafReducer;
  return (...args) => {
    const payload = argsToPayload(...args)
    return actionTemplate(creatorKey, payload, leafReducer.type)
  }
}