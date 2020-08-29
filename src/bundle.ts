import { prop } from 'ramda';
import { LeafStandardAction, LeafCompoundAction } from "./types"

function bundle(actions: (LeafStandardAction | LeafCompoundAction)[], type?: string): LeafCompoundAction {
  const actionTypes = actions.map(prop('type'))

  return {
    type: type || actionTypes.join('; '),
    payload: actions,
    leaf: {
      creatorKey: 'bundle',
      CREATOR_KEY: 'bundle',
      custom: false,
      compound: true,
      bundled: actionTypes,
      path: []
    }
  }
}

export default bundle