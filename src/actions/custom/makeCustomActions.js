import _ from 'lodash';
import { makeActionTemplate } from '../template/makeActionTemplate';

export const makeCustomActions = (reducersDict = {}, pathToLeafOrBranch = []) => {
  const actionTemplate = makeActionTemplate(pathToLeafOrBranch, { custom: true })
  return _.mapValues(
    reducersDict,
    (obj, key) => makeCustomActionCreator(obj, key, actionTemplate)
  )
}

const makeCustomActionCreator = (leafReducer, actionName, actionTemplate) => {
  const { argsToPayload } = leafReducer;
  return (...args) => {
    const payload = argsToPayload(...args)
    return actionTemplate(actionName.toUpperCase(), payload, leafReducer.type)
  }
}