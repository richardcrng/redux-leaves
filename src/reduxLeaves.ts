import { leafReducer } from './leafReducer';
import standardiseReducersDict from './reducersDict/standardise';
import { getState, updateState } from './utils';
import { Reducer } from 'redux';
import proxyActions from './actions/proxy';
import { FluxStandardAction, LeafStandardAction, LeafCompoundAction } from './types/action.type';
import LeafReducer from './types/reducer.type';
import { Actions } from './types/actions.type';

type Action = FluxStandardAction | LeafStandardAction | LeafCompoundAction

/**
 * 
 * @param initialState - Initial state of the reducer
 * @param reducersDict - Object of leaf reducer definitions keyed by creatorKeys
 * 
 * @template TS - TreeShape
 * @template RD - Dictionary of LeafReducer.Definition
 */
function reduxLeaves<TS extends object = any, RD extends LeafReducer.Definitions = {}>(
  initialState: TS,
  reducersDict?: RD
): [Reducer<TS, Action>, Actions.Branch<TS, TS, TS, RD>] {
  const leafReducersDict: LeafReducer.Dictionary<RD> = standardiseReducersDict<RD>(reducersDict || {} as RD)

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

  const actions = proxyActions<TS, typeof leafReducersDict, TS, TS, RD>(initialState, leafReducersDict)

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