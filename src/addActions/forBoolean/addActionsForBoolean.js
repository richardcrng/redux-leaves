import { atomicActions } from "../../actions/atomic";

export const addActionsForBoolean = (leafOrBranch, pathToLeafOrBranch = []) => {
  const actionTemplate = (type, payload) => ({
    leaf: {
      path: pathToLeafOrBranch,
      condition: "forBoolean",
      modifier: type
    },
    type: [...pathToLeafOrBranch, `forBoolean.${type}`].join('/'),
    payload
  })

  const set = (path, value) => actionTemplate(atomicActions.SET, { path, value })

  leafOrBranch.forBoolean = {
    set
  }

  return leafOrBranch
}