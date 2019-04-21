import _ from 'lodash';

export const leafReducerCustom = (customReducers, leafState, { modifier, payload }, wholeState) => {
  const key = modifier.toLowerCase()

  if (Object.keys(customReducers).includes(key)) {
    const logic = customReducers[key]

    if (typeof logic === "function") {
      return logic(_.cloneDeep(leafState), { payload }, wholeState)
    } else {
      return logic.reducer(_.cloneDeep(leafState), { payload }, wholeState)
    }

  } else {
    return leafState
  }
}