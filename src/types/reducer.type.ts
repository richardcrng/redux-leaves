import { LeafStandardAction, LeafActionTypeConfig } from "./action.type"
import { Dict } from "./util.type"

export namespace LeafReducer {
  /**
   * @template LS - The leaf state type for the reducer function to act on
   * @template TS - The whole tree state type
   */
  export type Function<LS = any, TS = any> = (leafState: LS, action: LeafStandardAction, treeState: TS) => LS

  /**
   * @template LS - The leaf state
   * @template A - The arguments to the action creator
   * @template P - The payload shape
   * @template TS - The tree state
   */
  export type Config<LS = any, TS = any, A extends any[] | [] = any[], P = any> = {
    reducer: Function<LS, TS>
    argsToPayload?(...args: A): P
    type?: LeafActionTypeConfig
  }

  export type Definition<LS = any, TS = any> = Function<LS, TS> | Config<LS, TS>

  export type Standardised<Def extends Definition> =
    Def extends Config
    ? Def
    : Def extends Function<infer LS, infer TS>
    ? Config<LS, TS>
    : Config
}

export type StandardisedReducersDict<ReducerDefinitions extends Dict<LeafReducer.Definition>> = { [K in keyof ReducerDefinitions]: LeafReducer.Standardised<ReducerDefinitions[K]> }

export default LeafReducer