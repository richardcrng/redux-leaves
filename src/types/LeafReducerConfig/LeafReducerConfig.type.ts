import LeafReducerFunction from "../LeafReducerFunction";
import LeafActionTypeConfig from "../LeafAction/Type/Config";

type LeafReducerConfig = {
  reducer: LeafReducerFunction
  argsToPayload?(...args: any[]): any
  type?: LeafActionTypeConfig
}

export default LeafReducerConfig