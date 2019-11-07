import * as R from 'ramda'
import Dict from "../../types/Dict";
import LeafReducerConfig from "../../types/Leaf/Reducer/Config";
import makeCreateDefaults from './defaults';
import makeCreateCustoms from './customs';

function actionsCreate(stateShape: Dict<any>, customReducers: Dict<LeafReducerConfig>, pathToLeafOrBranch: string[] = []) {
  const createDefaults = makeCreateDefaults(pathToLeafOrBranch)
  const createCustoms = makeCreateCustoms(pathToLeafOrBranch, customReducers)

  const create = (actionType?: string) => R.mergeRight(createDefaults(actionType), createCustoms(actionType))

  Object.assign(create, create())

  return create
}

export default actionsCreate