import _ from 'lodash';

export const leafReducerCustom = (reducersDict, leafState, { leaf = {}, payload }, wholeState) => {
  const { creatorKey } = leaf;
  const key = creatorKey.toLowerCase()

  if (Object.keys(reducersDict).includes(key)) {
    const logic = reducersDict[key]
    return logic.reducer(_.cloneDeep(leafState), { payload }, wholeState)
  } else {
    return leafState
  }
}