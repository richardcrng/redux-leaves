import produce from 'immer'

export const leafReducerCustom = (leafState, action, wholeState, reducersDict) => {
  const { leaf: { creatorKey } } = action;

  return Object.keys(reducersDict).includes(creatorKey)
    ? applyReducer(reducersDict[creatorKey], leafState, action, wholeState)
    : leafState
}

const applyReducer = (config, leafState, action, wholeState) => {
  if (config.mutate) {
    return produce(leafState, draftLeafState => {
      config.reducer(draftLeafState, action, wholeState)
    })
  } else {
    return config.reducer(leafState, action, wholeState)
  }
}