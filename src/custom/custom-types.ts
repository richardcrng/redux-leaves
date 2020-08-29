import { LSA, LeafActionData } from "../types"

export type LeafCustomAction<PayloadT = unknown> = LSA<string, PayloadT> & {
  leaf: LeafActionData<string> & {
    custom: true
  },
  payload: PayloadT
}

export type CustomArgsToPayload<PayloadT = any, ArgsT extends any[] = any[]> = (...args: ArgsT) => PayloadT

export type CustomReducerLogic<TreeT = any, LeafT = any, PayloadT = any> = (leafState: LeafT, action: LeafCustomAction<PayloadT>, treeState: TreeT) => LeafT

export interface CustomReducers<TreeT> {
  [creatorKey: string]: CustomReducerDefinition<{
    treeState: TreeT, leafState: any, payload: any, args: any[]
  }>
}

export type CustomReducerDefinition<T extends CustomReducerDefinitionGeneric = {
  treeState: any, leafState: any, args: any[], payload: any
}> = {
  argsToPayload: CustomArgsToPayload<T['payload'], T['args'] extends unknown[] ? T['args'] : unknown[]>,
  reducer: CustomReducerLogic<T['treeState'], T['leafState'], T['payload']>
}

interface CustomReducerDefinitionGeneric<
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

export type CustomReducerLonghand<
  TreeT,
  CustomReducerLogicT extends CustomReducerLogic<TreeT, LeafT, PayloadT>,
  ArgsToPayloadT extends CustomArgsToPayload<PayloadT, ArgsT>,
  LeafT,
  PayloadT,
  ArgsT extends any[]
> = {
  argsToPayload: ArgsToPayloadT,
  reducer: CustomReducerLogicT
}


// export interface CustomReducerDefinitions {
//   [creatorKey: string]: CustomReducerLonghand
// }

export type CustomReducerCreator<
  PayloadT,
  ArgsT extends unknown[]
> = (...args: ArgsT) => LeafCustomAction<PayloadT>

export type CustomCreators<
  LeafT = unknown,
  TreeT = unknown
> = {

}

export type CustomActions<
  KeyT extends keyof CustomCreators<LeafT, TreeT>,
  LeafT = unknown,
  TreeT = unknown
> = ReturnType<CustomCreators<LeafT, TreeT>[KeyT]>

export function isCustomAction(action: LSA): action is LeafCustomAction {
  return !!action.leaf.custom
}

export {
  LeafCustomAction as LCA
}