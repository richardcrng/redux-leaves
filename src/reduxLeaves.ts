import { Reducer } from 'redux'
import { createActionsProxy } from "./proxy"
import { ActionsProxy } from "./proxy/createActionsProxy"
import { LeafStandardAction, LSATypes } from './types';
import updateState from './utils/update-state';

export type ReduxLeaves<S> = [Reducer<S>, ActionsProxy<S>]

function reduxLeaves<S>(state: S): ReduxLeaves<S>{
  const reducer = (state: S, action: LeafStandardAction) => {
    if (action.type === LSATypes.UPDATE) {
      return updateState(state, action.path, action.payload)
    }

    return state
  }

  const actions = createActionsProxy(state)

  return [reducer as Reducer<S>, actions]
}

export default reduxLeaves