import { LeafStandardAction, LeafActionTypeConfig } from "./action.type"
import { Dict } from "./util.type"

export declare namespace LeafReducer {
  /**
   * @template LS - The leaf state type for the reducer function to act on
   * @template TS - The whole tree state type
   * @template P - The action payload
   */
  export type ReducerFunction<LS = any, TS = any, P = any> = (leafState: LS, action: LeafStandardAction<P>, treeState: TS) => LS

  /**
   * @template LS - The leaf state
   * @template TS - The tree state
   * @template A - The arguments to the action creator
   * @template P - The payload shape
   */
  export type ConfigObj<LS = any, TS = any, A extends any[] | [] = any[], P = any> = {
    reducer: ReducerFunction<LS, TS, P>
    argsToPayload?(...args: A): P
    type?: LeafActionTypeConfig
  }

  /**
   * The action creator args
   * 
   * @template C - A LeafReducer.ConfigObj
   */
  export type CreatorArgs<C> = C extends ConfigObj<infer LS, infer TS, infer A, infer P> ? A : any


  /**
   * The payload of the resultant action
   * 
   * @template C - A LeafReducer.ConfigObj
   */
  export type CreatedPayload<C> = C extends ConfigObj<infer LS, infer TS, infer A, infer P> ? P : any

  /**
   * @template LS - LeafState
   * @template TS - TreeState
   */
  export type Configuration<LS = any, TS = any, A extends any[] | [] = any[], P = any> = ReducerFunction<LS, TS> | ConfigObj<LS, TS, A, P>

  /**
   * @template LS - LeafShape
   * @template A - Args
   * @template P - Payload
   */
  export interface Schema<LS, A extends any[] | [] = any[], P = any> {
    type: LS,
    args: A,
    payload: P
  }

  export type Definitions<Schemas = { [key: string]: any }, TS = any> = {
    [K in keyof Schemas]: Schemas[K] extends Schema<infer LS, infer A, infer P>
      ? Configuration<LS, TS, A, P>
      : Configuration<Schemas[K], TS>
  }

  /**
   * @template RD - ReducersDict, dictionary of LeafReducer.Definitions
   */
  export type Dictionary<RD extends Dict<LeafReducer.Configuration>> = { [K in keyof RD]: LeafReducer.Standardised<RD[K]> }

  /**
   * @template D - LeafReducerConfiguration
   */
  export type Standardised<D extends Configuration> =
    D extends ConfigObj
    ? D
    : D extends ReducerFunction<infer LS, infer TS>
    ? ConfigObj<LS, TS>
    : ConfigObj
}

export default LeafReducer