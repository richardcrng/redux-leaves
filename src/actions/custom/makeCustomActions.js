
export const makeCustomActions = (pathToLeafOrBranch, customActions = customActionsSample) => {
  const actionTemplate = (type, payload) => ({
    leaf: {
      path: pathToLeafOrBranch,
      modifier: type,
      custom: true
    },
    type: [...pathToLeafOrBranch, type].join('/'),
    payload
  })

  
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