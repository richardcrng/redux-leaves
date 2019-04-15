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

  const set = (path, value) => actionTemplate(atomicActions.SET, { path, value })

  return {
    set
  }
}