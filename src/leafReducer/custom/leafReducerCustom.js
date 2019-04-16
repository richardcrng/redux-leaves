import _ from 'lodash';

export const leafReducerCustom = (customLogic, leafState, { modifier, payload }, wholeState) => {
  const key = modifier.toLowerCase()

  if (Object.keys(customLogic).includes(key)) {
    const { reducer } = customLogic[key];
    console.log(reducer.toString(), leafState)
    return reducer(_.cloneDeep(leafState), { payload }, wholeState)
  } else {
    return leafState
  }
}