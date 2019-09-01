import { leafReducer } from './leafReducer';
import standardiseReducersDict from './reducersDict/standardise';
import { getState, updateState } from './utils';
import LeafStandardAction from './types/Actions/LSA';
import LeafActionData from './types/Leaf/Action/Data';
import Dict from './types/Dict';
import { Reducer } from 'redux';
import ActionsProxy from './actions/proxy';

export const reduxLeaves = (initialState: Dict<any>, reducersDict = {}): [Reducer<any, LeafStandardAction>, Dict<any>] => {
  const leafReducersDict = standardiseReducersDict(reducersDict)

  const reducer: Reducer<any, LeafStandardAction> = function(state = initialState, action: LeafStandardAction) {
    const { leaf = {} } = action;
    const { path = [] } = leaf as LeafActionData

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