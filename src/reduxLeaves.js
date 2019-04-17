import _ from 'lodash';
import produce from 'immer';
import { updateState } from './utils';
import { actionsFor } from './actions/';
import { leafReducer } from './leafReducer';
import { getState } from './utils/index';

export const reduxLeaves = (initialState, customLogic = {}) => {
  function immeredReducer(
    state = initialState,
    { leaf = {}, type, payload } = {}
  ) {
    return produce(state, draftState => {
      const { path, condition, modifier, custom } = leaf

      const prevLeafState = getState(draftState, path)

      const newLeafState = leafReducer(
        prevLeafState,
        { path, condition, modifier, payload, custom },
        draftState,
        initialState,
        customLogic
      )

      return updateState(draftState, path, newLeafState)
    })
  }

  const actions = actionsFor(_.cloneDeep(initialState), customLogic)

  return [immeredReducer, actions]
}