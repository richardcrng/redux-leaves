import LeafCreatorAPI from "./API";
import LeafReducerDict from "../Reducer/Dict";
import Dict from "../../Dict";
import LeafStandardAction from "../../Actions/LSA";

export type LeafCreateFunction<RD = LeafReducerDict, LS = any, TS = Dict<any>> = (actionType?: string) => LeafCreatorAPI<RD, LS, TS>

type LeafCreate<RD = LeafReducerDict, LS = any, TS = Dict<any>> = LeafCreateFunction<RD, LS, TS> & LeafCreatorAPI<RD, LS, TS> & {
  apply: (callback: (leafState: LS, treeState: TS) => boolean) => LeafStandardAction
}

export default LeafCreate