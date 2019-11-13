import * as R from 'ramda'
import LeafStandardAction from "../types/Actions/LSA";
import LeafCompoundAction from "../types/Actions/LCA";

function bundle(actions: (LeafStandardAction | LeafCompoundAction)[], type?: string): LeafCompoundAction {
  return {
    type: type || actions.map(R.prop('type')).join('; '),
    payload: actions,
    leaf: { compound: true }
  }
}

export default bundle