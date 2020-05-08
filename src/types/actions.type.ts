import { LeafCreatorCustoms, LeafCreatorDefaults } from "./creators.type";
import { LeafStandardAction } from "./action.type";
import LeafReducer from "./reducer.type";

export declare namespace Actions {
  /**
   * @template BS - BranchShape
   * @template TS - TreeShape
   * @template LS - LeafShape
   * @template LRD - LeafReducer.Definitions
   */
  export type Branch<BS, TS, LS, LRD extends LeafReducer.Definitions> =
    BS extends Array<infer E>
      ? { create: CreateAPI<LS, TS, LRD> }
      : BS extends object
        ? { create: CreateAPI<LS, TS, LRD> }
          & { [K in keyof BS]: Branch<BS[K], TS, LS, LRD> }
        : { create: CreateAPI<LS, TS, LRD> }
  
  /**
   * @template LS - LeafShape
   * @template TS - TreeShape
   * @template LRD - LeafReducer.Definitions
   */
  export type CreateAPI<LS, TS, LRD extends LeafReducer.Definitions> =
    CreateFunction<LS, TS, LRD>
      & Creators<LS, TS, LRD>
      & { do: <T = unknown>(callback: (leafState: T, treeState: TS) => boolean) => LeafStandardAction<(leafState: T, treeState: TS) => TS> }

  /**
    * @template LS - LeafShape
    * @template TS - TreeShape
    * @template LRD - LeafReducer.Definitions
    */
  export type CreateFunction<LS, TS, LRD extends LeafReducer.Definitions> = (actionType?: string) => Creators<LS, TS, LRD>
  
  /**
   * @template LS - LeafShape
   * @template TS - TreeShape
   * @template LRD - LeafReducer.Definitions
   */
  export type Creators<LS, TS, LRD extends LeafReducer.Definitions> = LeafCreatorDefaults<LS, TS> & LeafCreatorCustoms<LRD>
}

export default Actions