import { Reducer } from 'redux'
import { createActionsProxy } from "./proxy"
import { ActionsProxy } from "./proxy/createActionsProxy"
import { LeafStandardAction } from './types';
import updateState, { getState } from './utils/update-state';
import leafReducer from './leafReducer';

export type ReduxLeaves<StateT> = [
  Reducer<StateT>,
  ActionsProxy<StateT, StateT>
]

function reduxLeaves<StateT>(initialState: StateT): ReduxLeaves<StateT>{
  const reducer = (treeState: StateT = initialState, action: LeafStandardAction) => {
    if (!action.leaf) return treeState

    const prevLeafState = getState(treeState, action.leaf.path)

    const newLeafState = leafReducer(prevLeafState, treeState, action, initialState)

    return updateState(treeState, action.leaf.path, newLeafState)
  }

  const actions = createActionsProxy<StateT, StateT>(initialState)

  return [reducer as Reducer<StateT>, actions]
}

export default reduxLeaves