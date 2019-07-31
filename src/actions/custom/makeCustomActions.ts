import * as R from 'ramda'
import { makeActionTemplate } from '../template/makeActionTemplate';
import LeafStandardActionCreator from '../../types/LeafStandardActionCreator';
import LeafStandardAction from '../../types/LeafStandardAction';
import LeafReducerConfig from '../../types/LeafReducerConfig';
import LeafActionTemplate from '../../types/LeafActionTemplate';

export const makeCustomActions = (reducersDict = {}, pathToLeafOrBranch = []) => {
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