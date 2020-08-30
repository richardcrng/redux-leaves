import { OmitByValue } from 'utility-types';
import { LSA, LeafActionData } from "../types"

export type LeafCustomAction<PayloadT = unknown> = LSA<PayloadT> & {
  leaf: LeafActionData & {
    custom: true
  },
  payload: PayloadT
}

export type CustomArgsToPayload<PayloadT = any, ArgsT extends any[] = any[]> = (...args: ArgsT) => PayloadT

export type CustomReducerLogic<TreeT = any, LeafT = any, PayloadT = any> = (leafState: LeafT, action: LeafCustomAction<PayloadT>, treeState: TreeT) => LeafT

export type ReducerDefaultDefinition<TreeT = unknown> = ShorthandReducerDefaultDefinition<TreeT> | LonghandReducerDefaultDefinition<TreeT>

export type ReducerDefinition<T extends ReducerDefinitionG = {
  treeState: any, leafState: any, args: any[], payload: any
}> = LonghandReducerDefinition<T> | ShorthandReducerDefinition<T>

export type CustomReducers<TreeT, DefinitionsT = { [creatorKey: string]: LonghandReducerDefaultDefinition<TreeT> }> = {
  [K in keyof DefinitionsT]: ReducerDefaultDefinition<TreeT>
}

export type LonghandReducerDefaultDefinition<TreeT> =
  LonghandReducerDefinition<{
    treeState: TreeT, leafState: any, payload: any, args: any[]
  }>

export type LonghandReducerDefinition<T extends ReducerDefinitionG = {
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
  >,

  type?: string
}

export type ShorthandReducerDefaultDefinition<TreeT> =
  ShorthandReducerDefinition<{
    treeState: TreeT, leafState: any, payload: any, args: any[]
  }>

export type ShorthandReducerDefinition<T extends ReducerDefinitionG = {
  treeState: any, leafState: any, args: any[], payload: any
}> = LonghandReducerDefinition<T>['reducer']

export type LonghandCreator<T extends LonghandReducerDefinition> = (...args: Parameters<T['argsToPayload']>) => LeafCustomAction<ReturnType<T['argsToPayload']>>

export type ShorthandCreator<T extends LonghandReducerDefinition['reducer'], PayloadT = any> = (payload?: PayloadT) => LeafCustomAction<PayloadT>

export interface ReducerDefinitionG<
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
  [K in keyof CustomReducersT]:
    CustomReducersT[K] extends LonghandReducerDefaultDefinition<TreeT>
      ? LeafT extends Parameters<CustomReducersT[K]['reducer']>[0]
        ? LonghandCreator<CustomReducersT[K]>
        : never :
    CustomReducersT[K] extends LonghandReducerDefaultDefinition<TreeT>['reducer']
      ? LeafT extends Parameters<CustomReducersT[K]>[0]
        ? ShorthandCreator<CustomReducersT[K]>
        : never
    : never
}

export function isCustomAction(action: LSA): action is LeafCustomAction {
  return !!action.leaf.custom
}

export function isShorthandReducer<T extends ReducerDefinitionG>(definition: ReducerDefinition<T>): definition is ShorthandReducerDefinition<T> {
  return typeof definition === 'function'
}

export function isLonghandReducer<T extends ReducerDefinitionG>(definition: ReducerDefinition<T>): definition is LonghandReducerDefinition<T> {
  return !isShorthandReducer(definition)
}

export {
  LeafCustomAction as LCA
}