import { atomicActions } from "../../actions/atomic";

export const forNumber = (leafOrBranch, pathToLeafOrBranch = []) => {
  const actionTemplate = (type, payload) => ({
    leaf: {
      path: pathToLeafOrBranch,
      condition: "forNumber",
      modifier: type
    },
    type: [...pathToLeafOrBranch, `forNumber.${type}`].join('/'),
    payload
  })

  const increment = (n = 1) => actionTemplate(atomicActions.INCREMENT, n)

  return {
    increment
  }
}