import * as R from 'ramda'
import LeafReducerConfig from "../../types/Leaf/Reducer/Config";
import makeCreateDefaults from './defaults';
import makeCreateCustoms from './customs';
import { LeafCreateFunction } from '../../types/Leaf/Creator';
import LeafCreatorAPI from '../../types/Leaf/Creator/API';
import { Dictionary } from 'ramda';

function actionsCreate<S = Dictionary<any>, D extends Dictionary<LeafReducerConfig> = Dictionary<LeafReducerConfig>>(stateShape: S, customReducers: D, pathToLeafOrBranch: (string | number)[] = []) {
  const createDefaults = makeCreateDefaults(pathToLeafOrBranch)
  const createCustoms = makeCreateCustoms(pathToLeafOrBranch, customReducers)

  const createFunction: LeafCreateFunction<D> = (actionType?: string): LeafCreatorAPI<D> => Object.assign(createDefaults(actionType), createCustoms(actionType))

  const create = Object.assign<LeafCreateFunction, LeafCreatorAPI<D>>(createFunction, createFunction())

  return create
}

export default actionsCreate