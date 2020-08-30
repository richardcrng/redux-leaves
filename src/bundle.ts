import { prop } from 'ramda';
import { Action, BundledAction } from "./types"

function bundle(actions: (Action | BundledAction)[], type?: string): BundledAction {
  const actionTypes = actions.map(prop('type'))

  return {
    type: type || actionTypes.join('; '),
    payload: actions,
    leaf: {
      creatorKey: 'bundle',
      CREATOR_KEY: 'bundle',
      custom: false,
      bundled: actionTypes,
      path: []
    }
  }
}

export default bundle