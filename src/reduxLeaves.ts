import { leafReducer } from './leafReducer';
import standardiseReducersDict from './reducersDict/standardise';
import { getState, updateState } from './utils';
import { Reducer } from 'redux';
import proxyActions from './actions/proxy';
import { FluxStandardAction, LeafStandardAction, LeafCompoundAction } from './types/action.type';
import { Dict } from './types/util.type';
import { LeafReducerDefinition, StandardisedReducersDict } from './types/reducer.type';
import { ActionsBranch } from './types/actions.type';

type Action = FluxStandardAction | LeafStandardAction | LeafCompoundAction

function reduxLeaves<TreeShape extends object = any, ReducerDefinitions extends Dict<LeafReducerDefinition> = {}>(initialState: TreeShape, reducersDict?: ReducerDefinitions): [Reducer<TreeShape, Action>, ActionsBranch<TreeShape, TreeShape, TreeShape, ReducerDefinitions>] {
  const leafReducersDict: StandardisedReducersDict<ReducerDefinitions> = standardiseReducersDict<ReducerDefinitions>(reducersDict || {} as ReducerDefinitions)

  const reducer: Reducer<TreeShape, Action> = function(state = initialState, action: Action) {

    if (!isLeafAction(action)) return state

    if (isCompoundAction(action)) return action.payload.reduce(
      reducer,
      state
    )

    const { leaf } = action;
    const { path } = leaf

    const prevLeafState = getState(state, path)

    const newLeafState = leafReducer(
      prevLeafState,
      action,
      state,
      initialState,
      leafReducersDict
    )

    return updateState(state, path, newLeafState)
  }

  const actions = proxyActions<TreeShape, typeof leafReducersDict, TreeShape, TreeShape>(initialState, leafReducersDict)

  // @ts-ignore
  return [reducer, actions]
}

function isLeafAction(action: Action): action is LeafStandardAction | LeafCompoundAction {
  // @ts-ignore
  return action.leaf
}

function isCompoundAction(action: Action): action is LeafCompoundAction {
  return isLeafAction(action) && action.leaf.compound
}

export { reduxLeaves }
export default reduxLeaves