import LeafCreatorAPI from "./API";
import LeafReducerDict from "../Reducer/Dict";

export type LeafCreateFunction<RD = LeafReducerDict, LS = any> = (actionType?: string) => LeafCreatorAPI<RD, LS>

type LeafCreate<RD = LeafReducerDict, LS = any> = LeafCreateFunction<RD, LS> & LeafCreatorAPI<RD, LS>

export default LeafCreate