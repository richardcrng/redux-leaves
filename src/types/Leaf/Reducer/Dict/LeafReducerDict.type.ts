import LeafReducer from "../LeafReducer.type";
import LeafReducerConfig from "../Config";
import Dict from "../../../Dict";

type LeafReducerDict<T extends Dict<LeafReducer> = Dict<LeafReducer>> = {
  [K in keyof T]: LeafReducerConfig
}

export default LeafReducerDict