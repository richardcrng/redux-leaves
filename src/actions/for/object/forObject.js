import { atomicActions } from "../../atomic";
import { conditions } from '../../condtions/conditions';

export const forObject = (pathToLeafOrBranch = []) => {
  const actionTemplate = (type, payload) => ({
    leaf: {
      path: pathToLeafOrBranch,
      condition: conditions.OBJECT,
      modifier: type
    },
    type: [...pathToLeafOrBranch, `${conditions.OBJECT}.${type}`].join('/'),
    payload
  })

  const set = (path, value) => actionTemplate(atomicActions.SET, { path, value })

  return {
    set
  }
}