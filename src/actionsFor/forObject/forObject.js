import { atomicActions } from "../../actions/atomic";

export const forObject = (pathToLeafOrBranch = []) => {
  const actionTemplate = (type, payload) => ({
    leaf: {
      path: pathToLeafOrBranch,
      condition: "forObject",
      modifier: type
    },
    type: [...pathToLeafOrBranch, `forObject.${type}`].join('/'),
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