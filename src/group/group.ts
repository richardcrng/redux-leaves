import LeafStandardAction from "../types/Actions/LSA";
import LeafCompoundAction from "../types/Actions/LCA";

function group(actions: (LeafStandardAction | LeafCompoundAction)[], type: string = 'GROUPED_UPDATE'): LeafCompoundAction {
  return {
    type,
    payload: actions,
    leaf: { compound: true }
  }
}

export default group