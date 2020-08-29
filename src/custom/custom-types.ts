import { LCA } from "../types"

export type CustomReducerLonghand<
  TreeT = unknown,
  LeafT = unknown,
  PayloadT = unknown,
  ArgsT extends unknown[] = unknown[]
> = {
  argsToPayload: (...args: ArgsT) => PayloadT,
  reducer: (leafState: LeafT, action: LCA<PayloadT>, treeState: TreeT) => LeafT
}

export type CustomReducerCreator<
  PayloadT,
  ArgsT extends unknown[]
> = (...args: ArgsT) => LCA<PayloadT>

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
