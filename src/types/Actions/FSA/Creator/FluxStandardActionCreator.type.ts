import FluxStandardAction from '..';

type FluxStandardActionCreator<P = any, M = any, A extends any[] | [] = []> = (payload?: P, meta?: M, ...args: A) => FluxStandardAction<P, M>

export default FluxStandardActionCreator