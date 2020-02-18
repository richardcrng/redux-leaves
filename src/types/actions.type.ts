import { Dict } from "./util.type";
import { LeafReducerDefinition } from "./reducer.type";
import { LeafCreatorCustoms, LeafCreatorDefaults } from "./creators.type";
import { LeafStandardAction } from "./action.type";

export type ActionsBranch<BranchShape, TreeShape, LeafShape, ReducersDict> =
  BranchShape extends Array<infer E> ? { create: ActionsLeaf<LeafShape, TreeShape, ReducersDict> }
  : BranchShape extends object ? { create: ActionsLeaf<LeafShape, TreeShape, ReducersDict> } & { [K in keyof BranchShape]: ActionsBranch<BranchShape[K], TreeShape, LeafShape, ReducersDict> }
  : { create: ActionsLeaf<LeafShape, TreeShape, ReducersDict> }

export type ActionsLeaf<LeafShape = any, TreeShape = Dict<any>, ReducersDict = any> = CreateLeafCreators<LeafShape, TreeShape, ReducersDict> & LeafCreators<LeafShape, TreeShape, ReducersDict> & {
  apply: (callback: (leafState: LeafShape, treeState: TreeShape) => boolean) => LeafStandardAction<(leafState: LeafShape, treeState: TreeShape) => boolean>
}

export type CreateLeafCreators<LeafShape = any, TreeShape = Dict<any>, ReducersDict = Dict<any>, > = (actionType?: string) => LeafCreators<LeafShape, TreeShape, ReducersDict>

export type LeafCreators<LeafShape = any, TreeShape = Dict<any>, ReducersDict = any> = LeafCreatorDefaults<LeafShape, TreeShape> & LeafCreatorCustoms<ReducersDict>