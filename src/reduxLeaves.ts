import { leafReducer } from './leafReducer';
import standardiseReducersDict from './reducersDict/standardise';
import { getState, updateState } from './utils';
import LeafStandardAction from './types/Actions/LSA';
import { Reducer } from 'redux';
import proxyActions from './actions/proxy';
import LeafCompoundAction from './types/Actions/LCA';
import FluxStandardAction from './types/Actions/FSA';
import LeafReducer from './types/Leaf/Reducer';
import LeafReducerDict from './types/Leaf/Reducer/Dict';
import Dict from './types/Dict';
import ProxiedActions from './types/Actions/Proxied';

type Action = FluxStandardAction | LeafStandardAction | LeafCompoundAction

function reduxLeaves<TS extends Dict<any> = Dict<any>, RD extends Dict<LeafReducer> = Dict<LeafReducer>>(initialState: TS, reducersDict?: RD): [Reducer<TS, Action>, ProxiedActions<TS, LeafReducerDict<RD>>] {
  const leafReducersDict: LeafReducerDict<RD> = standardiseReducersDict<RD>(reducersDict || {} as RD)

  const reducer: Reducer<TS, Action> = function(state = initialState, action: Action) {

    if (!isLeafAction(action)) return state

    if (isCompoundAction(action)) return action.payload.reduce(
      reducer,
      state
    )

    const { leaf } = action;
    const { path } = leaf

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

  const actions = proxyActions<TS, LeafReducerDict<RD>, TS, TS>(initialState, leafReducersDict)

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