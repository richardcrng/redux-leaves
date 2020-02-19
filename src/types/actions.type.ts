import { LeafCreatorCustoms, LeafCreatorDefaults } from "./creators.type";
import { LeafStandardAction } from "./action.type";

export namespace Actions {
  /**
   * @template BS - BranchShape
   * @template TS - TreeShape
   * @template LS - LeafShape
   * @template RD - ReducersDict
   */
  export type Branch<BS, TS, LS, RD> =
    BS extends Array<infer E>
      ? { create: Leaf<LS, TS, RD> }
      : BS extends object
        ? { create: Leaf<LS, TS, RD> }
          & { [K in keyof BS]: Branch<BS[K], TS, LS, RD> }
        : { create: Leaf<LS, TS, RD> }
  
  /**
   * @template LS - LeafShape
   * @template TS - TreeShape
   * @template RD - ReducersDict
   */
  export type Leaf<LS, TS, RD> =
    CreateFunction<LS, TS, RD>
      & Creators<LS, TS, RD>
      & { apply: (callback: (leafState: LS, treeState: TS) => boolean) => LeafStandardAction<(leafState: LS, treeState: TS) => boolean> }

  /**
    * @template LS - LeafShape
    * @template TS - TreeShape
    * @template RD - ReducersDict
    */
  export type CreateFunction<LS, TS, RD> = (actionType?: string) => Creators<LS, TS, RD>
  
  /**
   * @template LS - LeafShape
   * @template TS - TreeShape
   * @template RD - ReducersDict
   */
  export type Creators<LS, TS, RD> = LeafCreatorDefaults<LS, TS> & LeafCreatorCustoms<RD>
}

export default Actions