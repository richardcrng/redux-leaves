import LeafStandardAction from "../../../Actions/LSA";
import Dict from "../../../Dict";

type LeafReducerFunction<LS = any, TS extends Dict<any> = Dict<any>> = (leafState?: LS, action?: LeafStandardAction, treeState?: TS) => any

export default LeafReducerFunction