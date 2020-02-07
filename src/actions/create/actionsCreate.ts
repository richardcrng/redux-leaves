import makeCreateDefaults from './defaults';
import makeCreateCustoms from './customs';
import { LeafCreateFunction } from '../../types/Leaf/Creator';
import LeafCreatorAPI from '../../types/Leaf/Creator/API';
import LeafReducerDict from '../../types/Leaf/Reducer/Dict';

function actionsCreate<D = LeafReducerDict>(customReducers: D, pathToLeafOrBranch: (string | number)[] = []) {
  const createDefaults = makeCreateDefaults(pathToLeafOrBranch)
  const createCustoms = makeCreateCustoms(pathToLeafOrBranch, customReducers)

  const createFunction: LeafCreateFunction<D> = (actionType?: string): LeafCreatorAPI<D> => Object.assign(createDefaults(actionType), createCustoms(actionType))

  const create = Object.assign<LeafCreateFunction, LeafCreatorAPI<D>>(createFunction, createFunction())

  return create
}

export default actionsCreate