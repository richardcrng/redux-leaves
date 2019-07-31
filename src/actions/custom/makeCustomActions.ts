import * as R from 'ramda'
import { makeActionTemplate } from '../template/makeActionTemplate';
import LeafStandardActionCreator from '../../types/LeafStandardActionCreator';
import LeafStandardAction from '../../types/LeafStandardAction';
import LeafReducerConfig from '../../types/LeafReducer/Config';
import LeafActionTemplate from '../../types/LeafAction/Template';

export const makeCustomActions = (reducersDict = {}, pathToLeafOrBranch = []) => {
  const actionTemplate = makeActionTemplate(pathToLeafOrBranch, { custom: true })
  return R.mapObjIndexed<LeafReducerConfig, LeafStandardActionCreator>(
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