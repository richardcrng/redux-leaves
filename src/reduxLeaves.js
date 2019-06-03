import * as R from 'ramda'
import { actionsFor } from './actions/';
import { leafReducer } from './leafReducer';
import { standardiseReducersDict } from './reducersDict/standardise/standardiseReducersDict';

export const reduxLeaves = (initialState, reducersDict = {}) => {
  const leafReducersDict = standardiseReducersDict(reducersDict)

  function reducer(state = initialState, action) {
    const { leaf = {} } = action;
    const { path = [], condition, creatorKey, custom } = leaf

    const prevLeafState = R.path(path, state)

    const newLeafState = leafReducer(
      prevLeafState,
      action,
      state,
      initialState,
      leafReducersDict
    )

    return R.assocPath(path, newLeafState, state)
  }

  const actions = actionsFor(R.clone(initialState), leafReducersDict)

  return [reducer, actions]
  // return [immeredReducer, actions]
}