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
  return (...args) => {
    const payload = (typeof argsToPayload === "function")
      ? argsToPayload(args)
      : null

    return actionTemplate(actionName.toUpperCase(), payload)
  }
}

const customActionsSample = {
  double: {
    reducer: leafState => leafState * 2
  },
  compact: {
    argsToPayload: (...values) => values,
    reducer: (leafState, { payload }) => leafState.filter(e => !payload.includes(e))
  }
}