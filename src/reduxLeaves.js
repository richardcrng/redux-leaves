import _ from 'lodash';
import produce from 'immer';
import { updateState } from './utils';
import { actionsFor } from './actions/';
import { leafReducer } from './leafReducer';
import { getState } from './utils/index';
import { standardiseReducersDict } from './reducersDict/standardise/standardiseReducersDict';

export const reduxLeaves = (initialState, reducersDict = {}) => {
  const leafReducersDict = standardiseReducersDict(reducersDict)

  function immeredReducer(
    state = initialState,
    action
  ) {
    return produce(state, draftState => {
      const { leaf = {} } = action;
      const { path, condition, creatorKey, custom } = leaf

      const prevLeafState = getState(draftState, path)

      const newLeafState = leafReducer(
        prevLeafState,
        action,
        draftState,
        initialState,
        leafReducersDict
      )

      return updateState(draftState, path, newLeafState)
    })
  }

  const actions = actionsFor(_.cloneDeep(initialState), leafReducersDict)

  return [immeredReducer, actions]
}