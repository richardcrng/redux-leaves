import _ from 'lodash';
import { makeActionTemplate } from '../for/utils';

export const makeCustomActions = (customLogic = {}, pathToLeafOrBranch = []) => {
  const actionTemplate = makeActionTemplate(pathToLeafOrBranch, { custom: true })

  return _.mapValues(
    customLogic,
    (obj, key) => makeCustomActionCreator(obj, key, actionTemplate)
  )
}

const makeCustomActionCreator = (creatorDefinition, actionName, actionTemplate) => {

  if (typeof creatorDefinition === "function") {
    return (firstArg) => actionTemplate(actionName.toUpperCase(), firstArg)
  }
  
  if (_.isPlainObject(creatorDefinition)) {
    const { argsToPayload } = creatorDefinition;
    return (firstArg, ...remArgs) => {
      const payload = (typeof argsToPayload === "function")
        ? argsToPayload(firstArg, ...remArgs)
        : firstArg

      return actionTemplate(actionName.toUpperCase(), payload, creatorDefinition.type)
    }
  }
}