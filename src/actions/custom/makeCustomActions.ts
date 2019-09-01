import * as R from 'ramda'
import { makeActionTemplate } from '../template/makeActionTemplate';
import LeafActionTemplate from '../../types/Leaf/Action/Template';
import LeafReducerConfig from '../../types/Leaf/Reducer/Config';
import LeafStandardAction from '../../types/Actions/LSA';
import LeafStandardActionCreator from '../../types/Actions/LSA/Creator';
import Dict from '../../types/Dict';

export const makeCustomActions = (reducersDict: Dict<LeafReducerConfig> = {}, pathToLeafOrBranch: string[] = []) => {
  const actionTemplate = makeActionTemplate(pathToLeafOrBranch, { custom: true })
  return R.mapObjIndexed(
    makeCustomActionCreator(actionTemplate),
    reducersDict
  )
}

const makeCustomActionCreator = R.curry((actionTemplate: LeafActionTemplate, leafReducer: LeafReducerConfig, creatorKey: string): LeafStandardActionCreator => {
  const { argsToPayload = R.identity } = leafReducer;
  return (...args: any[]): LeafStandardAction => {
    const payload = argsToPayload(...args)
    return actionTemplate(creatorKey, payload, leafReducer.type)
  }
})