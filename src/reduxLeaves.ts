import { leafReducer } from './leafReducer';
import standardiseReducersDict from './reducersDict/standardise';
import { getState, updateState } from './utils';
import LeafStandardAction from './types/Actions/LSA';
import Dict from './types/Dict';
import { Reducer } from 'redux';
import ActionsProxy from './actions/proxy';
import LeafCompoundAction from './types/Actions/LCA';
import FluxStandardAction from './types/Actions/FSA';

export const reduxLeaves = <T = Dict<any>>(initialState: T, reducersDict = {}): [Reducer<any, FluxStandardAction | LeafStandardAction | LeafCompoundAction>, ActionsProxy] => {
  const leafReducersDict = standardiseReducersDict(reducersDict)

  const reducer: Reducer<any, FluxStandardAction | LeafStandardAction | LeafCompoundAction> = function(state = initialState, action: FluxStandardAction | LeafStandardAction | LeafCompoundAction) {

    if (!isLeafAction(action)) {
      return state
    }

    if (isLCA(action)) {
      return action.payload.reduce(
        reducer,
        state
      )
    }

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

function isLCA(action: FluxStandardAction | LeafStandardAction | LeafCompoundAction): action is LeafCompoundAction {
  return isLeafAction(action) && action.leaf.compound
}

function isLSA(action: FluxStandardAction | LeafStandardAction | LeafCompoundAction): action is LeafStandardAction {
  return isLeafAction(action) && !isLCA(action)
}