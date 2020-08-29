import { LSA, LeafActionData } from "../types"

export type LeafCustomAction<PayloadT = unknown> = LSA<string, PayloadT> & {
  leaf: LeafActionData<string> & {
    custom: true
  },
  payload: PayloadT
}

export type CustomArgsToPayload<PayloadT = any, ArgsT extends any[] = any[]> = (...args: ArgsT) => PayloadT

export type CustomReducerLogic<TreeT = any, LeafT = any, PayloadT = any> = (leafState: LeafT, action: LeafCustomAction<PayloadT>, treeState: TreeT) => LeafT

// export type Definitions<Schemas = { [key: string]: any }, TS = any> = {
//   [K in keyof Schemas]: Schemas[K] extends Schema<infer LS, infer A, infer P>
//   ? Configuration<LS, TS, A, P>
//   : Configuration<Schemas[K], TS>
// }

export type CustomReducers<TreeT, DefinitionsT = { [creatorKey: string]: CustomReducerDefaultDefinition<TreeT> }> = {
  [K in keyof DefinitionsT]: CustomReducerDefaultDefinition<TreeT>
}

// export interface CustomReducers<TreeT> {
//   [creatorKey: string]: CustomReducerDefinition<{
//     treeState: TreeT, leafState: any, payload: any, args: any[]
//   }>
// }

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

// export type CustomReducerCreator<
//   PayloadT,
//   ArgsT extends unknown[]
// > = (...args: ArgsT) => LeafCustomAction<PayloadT>

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


export type CustomCreators<
  LeafT,
  TreeT,
  CustomReducersT extends CustomReducers<TreeT>
> = {
  [K in keyof CustomReducersT]: CustomReducerCreator<CustomReducersT[K]>
}

// export interface CustomReducerDefinitions {
//   [creatorKey: string]: CustomReducerLonghand
// }

// export type CustomActions<
//   KeyT extends keyof CustomCreators<LeafT, TreeT>,
//   LeafT = unknown,
//   TreeT = unknown
// > = ReturnType<CustomCreators<LeafT, TreeT>[KeyT]>

export function isCustomAction(action: LSA): action is LeafCustomAction {
  return !!action.leaf.custom
}

export {
  LeafCustomAction as LCA
}