import { Dictionary } from "ramda";
import LeafReducerConfig from "../../../Reducer/Config";
import LeafStandardActionCreator from "../../../../Actions/LSA/Creator";

type LeafCreatorAPICustoms<T extends Dictionary<LeafReducerConfig>> = {
  [K in keyof T]: LeafStandardActionCreator
}

export default LeafCreatorAPICustoms