import { OmitByValue } from 'utility-types';
import { Action, LeafData } from "../types"

export type CustomAction<PayloadT = unknown> = Action<PayloadT> & {
  leaf: LeafData & {
    custom: true
  },
  payload: PayloadT
}

export type RiducerArgsToPayoad<PayloadT = any, ArgsT extends any[] = any[]> = (...args: ArgsT) => PayloadT

export type RiducerReducer<TreeT = any, LeafT = any, PayloadT = any> = (leafState: LeafT, action: CustomAction<PayloadT>, treeState: TreeT) => LeafT

export type PermissiveRiducer<TreeT = unknown> = ShorthandPermissiveRiducer<TreeT> | LonghandPermissiveRiducer<TreeT>

export type Riducer<T extends RiducerGeneric = {
  treeState: any, leafState: any, args: any[], payload: any
}> = LonghandRiducer<T> | ShorthandRiducer<T>

export type RiducerDict<TreeT, DefinitionsT = { [creatorKey: string]: LonghandPermissiveRiducer<TreeT> }> = {
  [K in keyof DefinitionsT]: PermissiveRiducer<TreeT>
}

export type LonghandPermissiveRiducer<TreeT> =
  LonghandRiducer<{
    treeState: TreeT, leafState: any, payload: any, args: any[]
  }>

export type LonghandRiducer<T extends RiducerGeneric = {
  treeState: any, leafState: any, args: any[], payload: any
}> = {

  argsToPayload: RiducerArgsToPayoad<
    T['payload'],
    T['args'] extends unknown[] ? T['args'] : unknown[]
  >,

  reducer: RiducerReducer<
    T['treeState'],
    T['leafState'],
    T['payload']
  >,

  type?: string
}

export type ShorthandPermissiveRiducer<TreeT> =
  ShorthandRiducer<{
    treeState: TreeT, leafState: any, payload: any, args: any[]
  }>

export type ShorthandRiducer<T extends RiducerGeneric = {
  treeState: any, leafState: any, args: any[], payload: any
}> = LonghandRiducer<T>['reducer']

export type LonghandCreator<T extends LonghandRiducer> = (...args: Parameters<T['argsToPayload']>) => CustomAction<ReturnType<T['argsToPayload']>>

export type ShorthandCreator<T extends LonghandRiducer['reducer'], PayloadT = any> = (payload?: PayloadT) => CustomAction<PayloadT>

export interface RiducerGeneric<
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
  RiducerDictT extends RiducerDict<TreeT>
> = OmitByValue<CustomCreatorsAll<LeafT, TreeT, RiducerDictT>, never>

export type CustomCreatorsAll<
  LeafT,
  TreeT,
  RiducerDictT extends RiducerDict<TreeT>
> = {
  [K in keyof RiducerDictT]:
    RiducerDictT[K] extends LonghandPermissiveRiducer<TreeT>
      ? LeafT extends Parameters<RiducerDictT[K]['reducer']>[0]
        ? LonghandCreator<RiducerDictT[K]>
        : never :
    RiducerDictT[K] extends LonghandPermissiveRiducer<TreeT>['reducer']
      ? LeafT extends Parameters<RiducerDictT[K]>[0]
        ? ShorthandCreator<RiducerDictT[K]>
        : never
    : never
}

export function isCustomAction(action: Action): action is CustomAction {
  return !!action.leaf.custom
}

export function isShorthandReducer<T extends RiducerGeneric>(definition: Riducer<T>): definition is ShorthandRiducer<T> {
  return typeof definition === 'function'
}

export function isLonghandReducer<T extends RiducerGeneric>(definition: Riducer<T>): definition is LonghandRiducer<T> {
  return !isShorthandReducer(definition)
}