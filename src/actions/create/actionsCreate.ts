import makeCreateDefaults from './defaults';
import makeCreateCustoms from './customs';
import LeafCreate, { LeafCreateFunction } from '../../types/Leaf/Creator';
import LeafCreatorAPI from '../../types/Leaf/Creator/API';
import LeafReducerDict from '../../types/Leaf/Reducer/Dict';
import Dict from '../../types/Dict';

function actionsCreate<RD = LeafReducerDict, LS = any, TS = Dict<any>>(reducersDict: RD, pathToLeafOrBranch: (string | number)[] = []): LeafCreate<RD, LS> {
  const createDefaults = makeCreateDefaults<TS, LS>(pathToLeafOrBranch)
  const createCustoms = makeCreateCustoms<RD>(pathToLeafOrBranch, reducersDict)

  const createFunction: LeafCreateFunction<RD, LS> = (actionType?: string) => Object.assign(createDefaults(actionType), createCustoms(actionType))

  const create = Object.assign<LeafCreateFunction<RD>, LeafCreatorAPI<RD, LS>>(createFunction, createFunction())

  return create as LeafCreate<RD, LS, TS>
}

export default actionsCreate