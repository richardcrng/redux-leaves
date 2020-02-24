import makeCreateDefaults from './defaults';
import makeCreateCustoms from './customs';
import { Actions } from '../../types/actions.type';
import LeafReducer from '../../types/reducer.type';

/**
 * Returns the core Create API
 * @param reducersDict LeafReducer.Dictionary
 * @param pathToLeafOrBranch 
 * 
 * @returns The core Create API at a given path
 * 
 * @template RD - Standardised Leaf Reducer Dictionary
 * @template LS - LeafShape
 * @template TS - TreeShape
 * @template LRD - LeafReducer.Definitions
 */
function actionsCreate<RD, LS, TS, LRD extends LeafReducer.Definitions>(reducersDict: RD, pathToLeafOrBranch: (string | number)[] = []): Actions.CreateAPI<LS, TS, LRD> {
  const createDefaults = makeCreateDefaults<TS, LS>(pathToLeafOrBranch)
  const createCustoms = makeCreateCustoms<RD, LRD>(pathToLeafOrBranch, reducersDict)

  const createFunction: Actions.CreateFunction<LS, TS, LRD> = (actionType?: string) => Object.assign(createDefaults(actionType), createCustoms(actionType))

  const create = Object.assign<Actions.CreateFunction<LS, TS, LRD>, Actions.Creators<LS, TS, LRD>>(createFunction, createFunction())

  return create
}

export default actionsCreate