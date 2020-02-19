import { LeafStandardAction } from './action.type'

/**
 * A function that returns a Leaf Standard Action
 * 
 * @template A - Arguments type for the LSA creator
 * @template P - Payload type for the returned LSA
 */
export type LeafStandardActionCreator<A extends any[] | [] = any[], P = any> = (...args: A) => LeafStandardAction<P>

