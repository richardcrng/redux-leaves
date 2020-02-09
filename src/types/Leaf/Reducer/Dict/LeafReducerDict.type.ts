import LeafReducer from "../LeafReducer.type";
import LeafReducerConfig from "../Config";
import Dict from "../../../Dict";

type LeafReducerDict<RD extends Dict<LeafReducer> = Dict<LeafReducer>> = {
  [K in keyof RD]: LeafReducerConfig
}

export default LeafReducerDict