import { Reducer } from 'redux'
import { createActionsProxy } from "./proxy"
import { ActionsProxy } from "./proxy/createActionsProxy"
import { LeafStandardAction, DefaultCreators, creatorGuards } from './types';
import updateState, { getState } from './utils/update-state';
import leafReducer from './leafReducer';

export type ReduxLeaves<S> = [Reducer<S>, ActionsProxy<S, S>]

function reduxLeaves<S>(initialState: S): ReduxLeaves<S>{
  const reducer = (treeState: S = initialState, action: LeafStandardAction) => {
    if (!action.leaf) return treeState

    const prevLeafState = getState(treeState, action.leaf.path)

    const newLeafState = leafReducer(prevLeafState, treeState, action)

    return updateState(treeState, action.leaf.path, newLeafState)
  }

  const actions = createActionsProxy<S, S>(initialState)

  return [reducer as Reducer<S>, actions]
}

export default reduxLeaves