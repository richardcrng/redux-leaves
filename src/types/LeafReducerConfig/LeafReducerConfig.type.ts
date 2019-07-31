import LeafReducerFunction from "../LeafReducerFunction";
import LeafActionTypeConfig from "../LeafActionTypeConfig";

type LeafReducerConfig = {
  reducer: LeafReducerFunction
  argsToPayload?(...args: any[]): any
  type?: LeafActionTypeConfig
}

export default LeafReducerConfig