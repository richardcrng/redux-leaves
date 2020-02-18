import { Dict } from "./util.type";
import { LeafCreatorCustoms, LeafCreatorDefaults } from "./creators.type";
import { LeafStandardAction } from "./action.type";

export namespace Actions {
  export type Branch<BranchShape, TreeShape, LeafShape, ReducersDict> =
    BranchShape extends Array<infer E> ? { create: Leaf<LeafShape, TreeShape, ReducersDict> }
    : BranchShape extends object ? { create: Leaf<LeafShape, TreeShape, ReducersDict> } & { [K in keyof BranchShape]: Branch<BranchShape[K], TreeShape, LeafShape, ReducersDict> }
    : { create: Leaf<LeafShape, TreeShape, ReducersDict> }
  
  export type Leaf<LeafShape = any, TreeShape = Dict<any>, ReducersDict = any> = CreateLeafCreators<LeafShape, TreeShape, ReducersDict> & LeafCreators<LeafShape, TreeShape, ReducersDict> & {
    apply: (callback: (leafState: LeafShape, treeState: TreeShape) => boolean) => LeafStandardAction<(leafState: LeafShape, treeState: TreeShape) => boolean>
  }
}

export type CreateLeafCreators<LeafShape = any, TreeShape = Dict<any>, ReducersDict = Dict<any>, > = (actionType?: string) => LeafCreators<LeafShape, TreeShape, ReducersDict>

export type LeafCreators<LeafShape = any, TreeShape = Dict<any>, ReducersDict = any> = LeafCreatorDefaults<LeafShape, TreeShape> & LeafCreatorCustoms<ReducersDict>

export default Actions