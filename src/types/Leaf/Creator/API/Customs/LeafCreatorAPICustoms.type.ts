import LeafStandardActionCreator from "../../../../Actions/LSA/Creator";
import LeafReducerDict from "../../../Reducer/Dict";

type LeafCreatorAPICustoms<T = LeafReducerDict> = {
  [K in keyof T]: LeafStandardActionCreator
}

export default LeafCreatorAPICustoms