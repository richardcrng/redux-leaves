import { LeafStandardAction, LeafActionTypeConfig } from "./action.type"

/**
 * @template LS - The leaf state type for the reducer function to act on
 * @template TS - The whole tree state type
 */
export type LeafReducerFunction<LS = any, TS = any> = (leafState: LS, action: LeafStandardAction, treeState: TS) => LS

/**
 * @template LS - The leaf state
 * @template A - The arguments to the action creator
 * @template P - The payload shape
 * @template TS - The tree state
 */
export type LeafReducerConfig<LS = any, TS = any, A extends any[] | [] = any[], P = any> = {
  reducer: LeafReducerFunction<LS, TS>
  argsToPayload?(...args: A): P
  type?: LeafActionTypeConfig
}

export type LeafReducerDefinition<LS = any, TS = any> = LeafReducerFunction<LS, TS> | LeafReducerConfig<LS, TS>