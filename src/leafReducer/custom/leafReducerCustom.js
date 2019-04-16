import _ from 'lodash';

export const leafReducerCustom = (customLogic, leafState, { modifier, payload }) => {
  const key = modifier.toLowerCase()

  if (Object.keys(customLogic).includes(key)) {
    const { reducer } = customLogic[key];
    return reducer(_.cloneDeep(leafSate), { payload })
  } else {
    return leafState
  }
}