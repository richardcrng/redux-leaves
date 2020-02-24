import { LeafStandardAction, LeafActionTypeConfig } from "./action.type"
import { Dict } from "./util.type"

export declare namespace LeafReducer {
  /**
   * @template LS - The leaf state type for the reducer function to act on
   * @template TS - The whole tree state type
   */
  export type Function<LS = any, TS = any> = (leafState: LS, action: LeafStandardAction, treeState: TS) => LS

  /**
   * @template LS - The leaf state
   * @template TS - The tree state
   * @template A - The arguments to the action creator
   * @template P - The payload shape
   */
  export type Config<LS = any, TS = any, A extends any[] | [] = any[], P = any> = {
    reducer: Function<LS, TS>
    argsToPayload?(...args: A): P
    type?: LeafActionTypeConfig
  }

  /**
   * The action creator args
   * 
   * @template C - A LeafReducer.Config
   */
  export type CreatorArgs<C> = C extends Config<infer LS, infer TS, infer A, infer P> ? A : any


  /**
   * The payload of the resultant action
   * 
   * @template C - A LeafReducer.Config
   */
  export type CreatedPayload<C> = C extends Config<infer LS, infer TS, infer A, infer P> ? P : any

  /**
   * @template LS - LeafState
   * @template TS - TreeState
   */
  export type Definition<LS = any, TS = any> = Function<LS, TS> | Config<LS, TS>

  // export type Definitions<DefInterface> = Dict<LeafReducer.Definition, keyof DefInterface>
  export type Definitions<DefInterface = { [key: string]: any }, TS = any> = {
    [K in keyof DefInterface]: LeafReducer.Definition<DefInterface[K], TS>
  }

  /**
   * @template RD - ReducersDict, dictionary of LeafReducer.Definitions
   */
  export type Dictionary<RD extends Dict<LeafReducer.Definition>> = { [K in keyof RD]: LeafReducer.Standardised<RD[K]> }

  /**
   * @template D - LeafReducerDefinition
   */
  export type Standardised<D extends Definition> =
    D extends Config
    ? D
    : D extends Function<infer LS, infer TS>
    ? Config<LS, TS>
    : Config
}

export default LeafReducer