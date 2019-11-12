import { leafReducer } from './leafReducer';
import standardiseReducersDict from './reducersDict/standardise';
import { getState, updateState } from './utils';
import LeafStandardAction from './types/Actions/LSA';
import LeafActionData from './types/Leaf/Action/Data';
import Dict from './types/Dict';
import { Reducer } from 'redux';
import ActionsProxy from './actions/proxy';
import LeafCompoundAction from './types/Actions/LCA';

export const reduxLeaves = <T = Dict<any>>(initialState: T, reducersDict = {}): [Reducer<any, LeafStandardAction | LeafCompoundAction>, ActionsProxy] => {
  const leafReducersDict = standardiseReducersDict(reducersDict)

  const reducer: Reducer<any, LeafStandardAction | LeafCompoundAction> = function(state = initialState, action: LeafStandardAction | LeafCompoundAction) {
    const { leaf = {} } = action;
    const { path = [] } = leaf as LeafActionData

    // const prevLeafState = getState(draftState, path)
    const prevLeafState = getState(state, path)

    if (isLCA(action)) {
      return action.payload.reduce(
        reducer,
        state
      )
    }

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

function isLCA(action: LeafStandardAction | LeafCompoundAction): action is LeafCompoundAction {
  return action && action.leaf && action.leaf.compound
}
