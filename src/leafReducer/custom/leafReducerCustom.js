import produce from 'immer'

export const leafReducerCustom = (reducersDict, leafState, action, wholeState) => {
  const { leaf: { creatorKey } } = action;

  if (Object.keys(reducersDict).includes(creatorKey)) {
    const logic = reducersDict[creatorKey]
    return applyReducer(logic, leafState, action, wholeState)
  } else {
    return leafState
  }
}

const applyReducer = (logic, leafState, action, wholeState) => {
  if (logic.mutate) {
    return produce(leafState, draftState => {
      logic.reducer(draftState, action, wholeState)
      // don't return - we're mutating draftState
    })
  } else {
    return logic.reducer(leafState, action, wholeState)
  }
}