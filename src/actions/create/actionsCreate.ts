import makeCreateDefaults from './defaults';
import makeCreateCustoms from './customs';
import { CreateLeafCreators, Actions, LeafCreators } from '../../types/actions.type';

function actionsCreate<RD, LS, TS>(reducersDict: RD, pathToLeafOrBranch: (string | number)[] = []): Actions.Leaf<LS, TS, RD> {
  const createDefaults = makeCreateDefaults<TS, LS>(pathToLeafOrBranch)
  const createCustoms = makeCreateCustoms<RD>(pathToLeafOrBranch, reducersDict)

  const createFunction: CreateLeafCreators<LS, TS, RD> = (actionType?: string) => Object.assign(createDefaults(actionType), createCustoms(actionType))

  const create = Object.assign<CreateLeafCreators<LS, TS, RD>, LeafCreators<LS, TS, RD>>(createFunction, createFunction())

  return create
}

export default actionsCreate