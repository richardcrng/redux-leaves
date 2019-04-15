import { atomicActions } from "../../atomic";
import { conditions } from "../../condtions/conditions";

export const forBoolean = (pathToLeafOrBranch = []) => {
  const actionTemplate = (type, payload) => ({
    leaf: {
      path: pathToLeafOrBranch,
      condition: conditions.BOOLEAN,
      modifier: type
    },
    type: [...pathToLeafOrBranch, `${conditions.BOOLEAN}.${type}`].join('/'),
    payload
  })

  const off = () => actionTemplate(atomicActions.OFF)
  const on = () => actionTemplate(atomicActions.ON)
  const toggle = () => actionTemplate(atomicActions.TOGGLE)


  return {
    off,
    on,
    toggle
  }
}