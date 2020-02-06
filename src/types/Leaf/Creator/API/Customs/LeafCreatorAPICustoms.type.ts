import LeafStandardAction from "../../../../Actions/LSA";
import { Dictionary } from "ramda";
import LeafReducerConfig from "../../../Reducer/Config";

type LeafCreatorAPICustoms<T extends Dictionary<LeafReducerConfig>> = {
  [K in keyof T]: (...args: any[]) => LeafStandardAction
}

export default LeafCreatorAPICustoms