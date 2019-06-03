import * as R from 'ramda'
import produce from 'immer';
import { actionsFor } from './actions/';
import { leafReducer } from './leafReducer';
import { standardiseReducersDict } from './reducersDict/standardise/standardiseReducersDict';

export const reduxLeaves = (initialState, reducersDict = {}) => {
  const leafReducersDict = standardiseReducersDict(reducersDict)

  function immeredReducer(
    state = initialState,
    action
  ) {
    return produce(state, draftState => {
      const { leaf = {} } = action;
      const { path = [], condition, creatorKey, custom } = leaf

      // const prevLeafState = getState(draftState, path)
      const prevLeafState = R.path(path, draftState)

      const newLeafState = leafReducer(
        prevLeafState,
        action,
        draftState,
        initialState,
        leafReducersDict
      )
      
      return R.assocPath(path, newLeafState, draftState)
    })
  }

  const actions = actionsFor(R.clone(initialState), leafReducersDict)

  return [immeredReducer, actions]
}