import produce from 'immer';

export const leafReducerCustom = (reducersDict, leafState, { leaf = {}, payload }, wholeState) => {
  const { creatorKey } = leaf;

  return produce(leafState, draftState => {
    if (Object.keys(reducersDict).includes(creatorKey)) {
      const logic = reducersDict[creatorKey]
      return logic.reducer(draftState, { payload }, wholeState)
    } else {
      return draftState
    }
  })
}