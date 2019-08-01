import * as R from 'ramda'
import { actionsFor } from './actions';
import { leafReducer } from './leafReducer';
import standardiseReducersDict from './reducersDict/standardise';
import { getState, updateState } from './utils';
import StateTree from './types/State/Tree';
import LeafStandardAction from './types/Actions/LSA';
import LeafActionData from './types/Leaf/Action/Data';

export const reduxLeaves = (initialState: StateTree, reducersDict = {}) => {
  const leafReducersDict = standardiseReducersDict(reducersDict)

  function reducer(state = initialState, action: LeafStandardAction) {
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

  const actions = actionsFor(R.clone(initialState), leafReducersDict)

  return [reducer, actions]
}