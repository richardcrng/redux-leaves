import { atomicActions } from "../../atomic";
import { conditions } from '../../condtions/conditions';

export const forNumber = (pathToLeafOrBranch = []) => {
  const actionTemplate = (type, payload) => ({
    leaf: {
      path: pathToLeafOrBranch,
      condition: conditions.NUMBER,
      modifier: type
    },
    type: [...pathToLeafOrBranch, `${conditions.NUMBER}.${type}`].join('/'),
    payload
  })

  const increment = (n = 1) => actionTemplate(atomicActions.INCREMENT, n)

  return {
    increment
  }
}