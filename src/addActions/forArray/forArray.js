import { atomicActions } from "../../actions/atomic";

export const forArray = (leafOrBranch, pathToLeafOrBranch = []) => {
  const actionTemplate = (type, payload) => ({
    leaf: {
      path: pathToLeafOrBranch,
      condition: "forArray",
      modifier: type
    },
    type: [...pathToLeafOrBranch, `forArray.${type}`].join('/'),
    payload
  })

  const concat = (array) => actionTemplate(atomicActions.CONCAT, array)

  const drop = (n = 1) => actionTemplate(atomicActions.DROP, n)

  const push = (element, index = -1, replace = false) => actionTemplate(atomicActions.PUSH, { element, index, replace })

  return {
    concat,
    drop,
    push
  }
}