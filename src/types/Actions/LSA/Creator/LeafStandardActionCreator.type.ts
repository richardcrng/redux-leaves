import LeafStandardAction from "..";

type LeafStandardActionCreator<P = any, A extends any[] | [] = []> = (...args: A) => LeafStandardAction<P>

export default LeafStandardActionCreator