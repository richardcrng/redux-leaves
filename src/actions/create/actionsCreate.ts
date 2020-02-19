import makeCreateDefaults from './defaults';
import makeCreateCustoms from './customs';
import { Actions } from '../../types/actions.type';

/**
 * Returns the core Create API
 * @param reducersDict LeafReducer.Dictionary
 * @param pathToLeafOrBranch 
 * 
 * @returns The core Create API at a given path
 * 
 * @template RD - LeafReducer.Dictionary
 * @template LS - LeafShape
 * @template TS - TreeShape
 */
function actionsCreate<RD, LS, TS>(reducersDict: RD, pathToLeafOrBranch: (string | number)[] = []): Actions.CreateAPI<LS, TS, RD> {
  const createDefaults = makeCreateDefaults<TS, LS>(pathToLeafOrBranch)
  const createCustoms = makeCreateCustoms<RD>(pathToLeafOrBranch, reducersDict)

  const createFunction: Actions.CreateFunction<LS, TS, RD> = (actionType?: string) => Object.assign(createDefaults(actionType), createCustoms(actionType))

  const create = Object.assign<Actions.CreateFunction<LS, TS, RD>, Actions.Creators<LS, TS, RD>>(createFunction, createFunction())

  return create
}

export default actionsCreate