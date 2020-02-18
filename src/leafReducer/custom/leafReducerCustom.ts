import produce from 'immer'
import LeafReducer from '../../types/reducer.type';
import { LeafStandardAction } from '../../types/action.type';

function leafReducerCustom<LS, TS, RD = any>(leafState: LS, action: LeafStandardAction, wholeState: TS, reducersDict: RD) {
  const { leaf: { creatorKey } } = action;

  return Object.keys(reducersDict).includes(creatorKey)
    // @ts-ignore
    ? applyReducer(reducersDict[creatorKey], leafState, action, wholeState)
    : leafState
}

const applyReducer = (config: LeafReducer.Config, leafState: any, action: LeafStandardAction, wholeState: any) => {
  return config.reducer(leafState, action, wholeState)
}

export default leafReducerCustom