import { leafReducer } from './leafReducer';
import standardiseReducersDict from './reducersDict/standardise';
import { getState, updateState } from './utils';
import LeafStandardAction from './types/Actions/LSA';
import { Reducer } from 'redux';
import ActionsProxy from './actions/proxy';
import LeafCompoundAction from './types/Actions/LCA';
import FluxStandardAction from './types/Actions/FSA';
import LeafReducer from './types/Leaf/Reducer';
import LeafReducerDict from './types/Leaf/Reducer/Dict';
import Dict from './types/Dict';

type Action = FluxStandardAction | LeafStandardAction | LeafCompoundAction

function reduxLeaves<S extends Dict<any> = Dict<any>, D extends Dict<LeafReducer> = Dict<LeafReducer>>(initialState: S, reducersDict?: D): [Reducer<S, Action>, ActionsProxy] {
  const leafReducersDict: LeafReducerDict<D> = standardiseReducersDict<D>(reducersDict || {} as D)

  const reducer: Reducer<S, Action> = function(state = initialState, action: Action) {

    if (!isLeafAction(action)) return state

    if (isCompoundAction(action)) return action.payload.reduce(
      reducer,
      state
    )

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

  const actions = new ActionsProxy<S, LeafReducerDict<D>>(initialState, leafReducersDict)

  return [reducer, actions]
}

function isLeafAction(action: Action): action is LeafStandardAction | LeafCompoundAction {
  // @ts-ignore
  return action.leaf
}

function isCompoundAction(action: Action): action is LeafCompoundAction {
  return isLeafAction(action) && action.leaf.compound
}

export { reduxLeaves }
export default reduxLeaves