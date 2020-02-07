import LeafStandardActionCreator from "../../../../Actions/LSA/Creator";
import LeafReducerDict from "../../../Reducer/Dict";

type LeafCreatorAPICustoms<RD = LeafReducerDict> = {
  [K in keyof RD]: LeafStandardActionCreator
}

export default LeafCreatorAPICustoms