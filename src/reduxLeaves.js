import _ from 'lodash';
import produce from 'immer';
import { updateState } from './utils';
import { actionsFor } from './actions/';
import { leafReducer } from './leafReducer';
import { getState } from './utils/index';

export const reduxLeaves = (initialState, reducersDict = {}) => {
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
        reducersDict
      )

      return updateState(draftState, path, newLeafState)
    })
  }

  const actions = actionsFor(_.cloneDeep(initialState), reducersDict)

  return [immeredReducer, actions]
}