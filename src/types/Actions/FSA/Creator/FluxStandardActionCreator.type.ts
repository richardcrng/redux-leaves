import FluxStandardAction from '..';

type FluxStandardActionCreator<P = any, M = any> = (payload?: P, meta?: M, ...args: any[]) => FluxStandardAction

export default FluxStandardActionCreator