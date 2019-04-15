import { atomicActions } from "../../atomic";
import { conditions } from "../../condtions/conditions";

export const forArray = (pathToLeafOrBranch = []) => {
  const actionTemplate = (type, payload) => ({
    leaf: {
      path: pathToLeafOrBranch,
      condition: conditions.ARRAY,
      modifier: type
    },
    type: [...pathToLeafOrBranch, `${conditions.ARRAY}.${type}`].join('/'),
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