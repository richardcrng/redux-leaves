import LeafReducerFunction from "../Function";
import LeafActionTypeConfig from "../../Action/Type/Config";
import Dict from "../../../Dict";

type LeafReducerConfig<TS extends Dict<any> = Dict<any>, LS = any, A extends any[] | [] = any[], P = any> = {
  reducer: LeafReducerFunction<TS, LS>
  argsToPayload?(...args: A): P
  mutate?: boolean
  type?: LeafActionTypeConfig
}

export default LeafReducerConfig