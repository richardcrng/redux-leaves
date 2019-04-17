import _ from 'lodash';

export const makeCustomActions = (customLogic = {}, pathToLeafOrBranch = []) => {
  const actionTemplate = (type, payload) => ({
    leaf: {
      path: pathToLeafOrBranch,
      modifier: type,
      custom: true
    },
    type: [...pathToLeafOrBranch, type].join('/'),
    payload
  })

  return _.mapValues(
    customLogic,
    (obj, key) => makeCustomActionCreator(obj, key, actionTemplate)
  )
}

const makeCustomActionCreator = ({ argsToPayload }, actionName, actionTemplate) => {
  return (firstArg, ...remArgs) => {
    const payload = (typeof argsToPayload === "function")
      ? argsToPayload(firstArg, ...remArgs)
      : firstArg

    return actionTemplate(actionName.toUpperCase(), payload)
  }
}