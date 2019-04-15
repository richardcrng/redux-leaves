import { atomicActions } from "../../actions/atomic";

export const forBoolean = (pathToLeafOrBranch = []) => {
  const actionTemplate = (type, payload) => ({
    leaf: {
      path: pathToLeafOrBranch,
      condition: "forBoolean",
      modifier: type
    },
    type: [...pathToLeafOrBranch, `forBoolean.${type}`].join('/'),
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