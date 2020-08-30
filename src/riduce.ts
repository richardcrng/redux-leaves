import { Reducer } from 'redux'
import { createActionsProxy } from "./proxy"
import { ActionsProxy } from "./proxy/createActionsProxy"
import { Action, CustomReducers, isBundledAction } from './types';
import updateState, { getState } from './utils/update-state';
import leafReducer from './leafReducer';

export type ReduxLeaves<
  TreeT,
  CustomReducersT extends CustomReducers<TreeT> = {}
> = [
  Reducer<TreeT>,
  ActionsProxy<TreeT, TreeT, CustomReducersT>
]

function riduce<
  TreeT,
  CustomReducersT extends CustomReducers<TreeT> = {}
>(
  initialState: TreeT,
  reducersDict: CustomReducersT = {} as CustomReducersT
): ReduxLeaves<TreeT, CustomReducersT> {
  const reducer = (treeState: TreeT = initialState, action: Action): TreeT => {
    
    if (!action.leaf) return treeState

    if (isBundledAction(action)) {
      return action.payload.reduce(reducer, treeState)
    }

    const prevLeafState = getState(treeState, action.leaf.path)

    const newLeafState = leafReducer(prevLeafState, treeState, action, initialState, reducersDict)

    return updateState(treeState, action.leaf.path, newLeafState)
  }

  const actions = createActionsProxy(initialState, initialState, reducersDict)

  return [reducer as Reducer<TreeT>, actions]
}

export default riduce