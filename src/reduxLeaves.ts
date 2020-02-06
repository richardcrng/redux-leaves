import { leafReducer } from './leafReducer';
import standardiseReducersDict from './reducersDict/standardise';
import { getState, updateState } from './utils';
import LeafStandardAction from './types/Actions/LSA';
import { Reducer } from 'redux';
import ActionsProxy from './actions/proxy';
import LeafCompoundAction from './types/Actions/LCA';
import FluxStandardAction from './types/Actions/FSA';
import { Dictionary } from 'ramda';
import LeafReducer from './types/Leaf/Reducer';

export const reduxLeaves = <T = Dictionary<any>>(initialState: T, reducersDict: Dictionary<LeafReducer> = {}): [Reducer<T, FluxStandardAction | LeafStandardAction | LeafCompoundAction>, ActionsProxy] => {
  const leafReducersDict = standardiseReducersDict(reducersDict)

  const reducer: Reducer<T, FluxStandardAction | LeafStandardAction | LeafCompoundAction> = function(state = initialState, action: FluxStandardAction | LeafStandardAction | LeafCompoundAction) {

    if (!isLeafAction(action)) return state

    if (isCompoundAction(action)) return action.payload.reduce(
      reducer,
      state
    )

    const { leaf } = action;
    const { path } = leaf

    // const prevLeafState = getState(draftState, path)
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

  const actions = new ActionsProxy(initialState, leafReducersDict)

  return [reducer, actions]
}

function isLeafAction(action: FluxStandardAction | LeafStandardAction | LeafCompoundAction): action is LeafStandardAction | LeafCompoundAction {
  // @ts-ignore
  return action.leaf
}

function isCompoundAction(action: FluxStandardAction | LeafStandardAction | LeafCompoundAction): action is LeafCompoundAction {
  return isLeafAction(action) && action.leaf.compound
}