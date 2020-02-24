import * as R from 'ramda'
import { LeafStandardAction, LeafCompoundAction } from '../types/action.type'

function bundle(actions: (LeafStandardAction | LeafCompoundAction)[], type?: string): LeafCompoundAction {
  const actionTypes = actions.map(R.prop('type'))

  return {
    type: type || actionTypes.join('; '),
    payload: actions,
    leaf: { compound: true, bundled: actionTypes }
  }
}

export default bundle