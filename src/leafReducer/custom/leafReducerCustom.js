import _ from 'lodash';

export const leafReducerCustom = (customLogic, leafState, { modifier, payload }, wholeState) => {
  const key = modifier.toLowerCase()

  if (Object.keys(customLogic).includes(key)) {
    const logic = customLogic[key]

    if (typeof logic === "function") {
      return logic(_.cloneDeep(leafState), { payload }, wholeState)
    } else {
      return logic.reducer(_.cloneDeep(leafState), { payload }, wholeState)
    }

  } else {
    return leafState
  }
}