import LeafStandardAction from "../../../Actions/LSA";
import LeafActionTypeConfig from "../Type/Config";

type LeafActionTemplate = (creatorKey: string, payload?: any, actionType?: LeafActionTypeConfig) => LeafStandardAction

export default LeafActionTemplate