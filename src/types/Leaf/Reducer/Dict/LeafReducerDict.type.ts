import { Dictionary } from "ramda";
import LeafReducer from "../LeafReducer.type";
import LeafReducerConfig from "../Config";

type LeafReducerDict<T extends Dictionary<LeafReducer> = Dictionary<LeafReducer>> = {
  [K in keyof T]: LeafReducerConfig
}

export default LeafReducerDict