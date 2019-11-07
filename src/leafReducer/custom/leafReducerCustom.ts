import produce from 'immer'
import LeafReducerTyped from '../../types/Leaf/Reducer/Typed';
import LeafReducerConfig from '../../types/Leaf/Reducer/Config';
import LeafStandardAction from '../../types/Actions/LSA';

const leafReducerCustom: LeafReducerTyped = (leafState, action, wholeState, reducersDict = {}) => {
  const { leaf: { creatorKey } } = action;

  return Object.keys(reducersDict).includes(creatorKey)
    ? applyReducer(reducersDict[creatorKey], leafState, action, wholeState)
    : leafState
}

const applyReducer = (config: LeafReducerConfig, leafState: any, action: LeafStandardAction, wholeState: any) => {
  return config.reducer(leafState, action, wholeState)
}

export default leafReducerCustom