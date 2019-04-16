import _ from 'lodash';

export const leafReducerCustom = (customLogic, leafState, { modifier, payload }, wholeState) => {
  const key = modifier.toLowerCase()

  if (Object.keys(customLogic).includes(key)) {
    const { reducer } = customLogic[key];
    return reducer(_.cloneDeep(leafSate), { payload }, wholeState)
  } else {
    return leafState
  }
}