import { LeafStandardAction } from './action.type'

/**
 * A function that returns a Leaf Standard Action
 * 
 * @template P - Payload type for the returned LSA
 * @template A - Arguments type for the LSA creator
 */
export type LeafStandardActionCreator<P = any, A extends any[] | [] = any[]> = (...args: A) => LeafStandardAction<P>

