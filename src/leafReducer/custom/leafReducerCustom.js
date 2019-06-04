import produce from 'immer'

export const leafReducerCustom = (reducersDict, leafState, { leaf = {}, payload }, wholeState) => {
  const { creatorKey } = leaf;

  if (Object.keys(reducersDict).includes(creatorKey)) {
    const logic = reducersDict[creatorKey]
    return logic.reducer(leafState, { payload }, wholeState)
  } else {
    return leafState
  }
}

const applyReducer = (logic, leafState, action, wholeState) => {
  if (logic.mutate) {
    return logic.reducer(leafState, { payload }, wholeState)
  } else {
    // immerify
  }
}