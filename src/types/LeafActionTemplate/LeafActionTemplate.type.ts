import LeafStandardAction from "../LeafStandardAction";
import LeafActionTypeConfig from "../LeafActionTypeConfig";

type LeafActionTemplate = (creatorKey: string, payload?: any, actionType?: LeafActionTypeConfig) => LeafStandardAction

export default LeafActionTemplate