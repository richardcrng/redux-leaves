import { OmitByValue } from 'utility-types';
import { LSA, LeafActionData } from "../types"

export type LeafCustomAction<PayloadT = unknown> = LSA<string, PayloadT> & {
  leaf: LeafActionData<string> & {
    custom: true
  },
  payload: PayloadT
}

export type CustomArgsToPayload<PayloadT = any, ArgsT extends any[] = any[]> = (...args: ArgsT) => PayloadT

export type CustomReducerLogic<TreeT = any, LeafT = any, PayloadT = any> = (leafState: LeafT, action: LeafCustomAction<PayloadT>, treeState: TreeT) => LeafT

export type CustomReducers<TreeT, DefinitionsT = { [creatorKey: string]: CustomReducerDefaultDefinition<TreeT> }> = {
  [K in keyof DefinitionsT]: CustomReducerDefaultDefinition<TreeT>
}

export type CustomReducerDefaultDefinition<TreeT> =
  CustomReducerDefinition<{
    treeState: TreeT, leafState: any, payload: any, args: any[]
  }>

export type CustomReducerDefinition<T extends ICustomReducerDefinitionGeneric = {
  treeState: any, leafState: any, args: any[], payload: any
}> = {

  argsToPayload: CustomArgsToPayload<
    T['payload'],
    T['args'] extends unknown[] ? T['args'] : unknown[]
  >,

  reducer: CustomReducerLogic<
    T['treeState'],
    T['leafState'],
    T['payload']
  >
}

export type CustomReducerCreator<T extends CustomReducerDefinition> = (...args: Parameters<T['argsToPayload']>) => LeafCustomAction<ReturnType<T['argsToPayload']>>

export interface ICustomReducerDefinitionGeneric<
  TreeT = unknown,
  LeafT = unknown,
  PayloadT = unknown,
  ArgsT extends unknown[] = unknown[]
> {
  treeState?: TreeT,
  leafState?: LeafT,
  payload?: PayloadT,
  args?: ArgsT
}

export type CustomCreators<
  LeafT,
  TreeT,
  CustomReducersT extends CustomReducers<TreeT>
> = OmitByValue<CustomCreatorsAll<LeafT, TreeT, CustomReducersT>, never>

export type CustomCreatorsAll<
  LeafT,
  TreeT,
  CustomReducersT extends CustomReducers<TreeT>
> = {
  [K in keyof CustomReducersT]: Parameters<CustomReducersT[K]['reducer']>[0] extends LeafT
  ? CustomReducerCreator<CustomReducersT[K]>
  : never
}

export function isCustomAction(action: LSA): action is LeafCustomAction {
  return !!action.leaf.custom
}

export {
  LeafCustomAction as LCA
}