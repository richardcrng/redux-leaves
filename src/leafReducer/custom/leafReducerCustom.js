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
    return produce(leafState, draftLeafState => {
      logic.reducer(draftLeafState, action, wholeState)
    })
  } else {
    return logic.reducer(leafState, action, wholeState)
  }
}