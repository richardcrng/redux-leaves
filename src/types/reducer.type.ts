import { LeafStandardAction, LeafActionTypeConfig } from "./action.type"
import { Dict } from "./util.type"

export declare namespace LeafReducer {
  /**
   * @template LS - The leaf state type for the reducer function to act on
   * @template TS - The whole tree state type
   * @template P - The action payload
   */
  export type FunctionDef<LS = any, TS = any, P = any> = (leafState: LS, action: LeafStandardAction<P>, treeState: TS) => LS

  /**
   * @template LS - The leaf state
   * @template TS - The tree state
   * @template A - The arguments to the action creator
   * @template P - The payload shape
   */
  export type ConfigDef<LS = any, TS = any, A extends any[] | [] = any[], P = any> = {
    reducer: FunctionDef<LS, TS, P>
    argsToPayload?(...args: A): P
    type?: LeafActionTypeConfig
  }

  /**
   * The action creator args
   * 
   * @template C - A LeafReducer.ConfigDef
   */
  export type CreatorArgs<C> = C extends ConfigDef<infer LS, infer TS, infer A, infer P> ? A : any


  /**
   * The payload of the resultant action
   * 
   * @template C - A LeafReducer.ConfigDef
   */
  export type CreatedPayload<C> = C extends ConfigDef<infer LS, infer TS, infer A, infer P> ? P : any

  /**
   * @template LS - LeafState
   * @template TS - TreeState
   */
  export type Definition<LS = any, TS = any, A extends any[] | [] = any[], P = any> = FunctionDef<LS, TS> | ConfigDef<LS, TS, A, P>

  export interface IDefinition<LS = any, A extends any[] | [] = any[], P = any> {
    type: LS,
    args: A,
    payload: P
  }

  export type Definitions<DefInterface = { [key: string]: any }, TS = any> = {
    [K in keyof DefInterface]: DefInterface[K] extends IDefinition<infer LS, infer A, infer P>
      ? Definition<LS, TS, A, P>
      : Definition<any, TS>
  }

  /**
   * @template RD - ReducersDict, dictionary of LeafReducer.Definitions
   */
  export type Dictionary<RD extends Dict<LeafReducer.Definition>> = { [K in keyof RD]: LeafReducer.Standardised<RD[K]> }

  /**
   * @template D - LeafReducerDefinition
   */
  export type Standardised<D extends Definition> =
    D extends ConfigDef
    ? D
    : D extends FunctionDef<infer LS, infer TS>
    ? ConfigDef<LS, TS>
    : ConfigDef
}

export default LeafReducer