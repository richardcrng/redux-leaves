import { atomicActions } from "../../atomic";
import { conditions } from '../../condtions/conditions';

export const forString = (pathToLeafOrBranch = []) => {
  const actionTemplate = (type, payload) => ({
    leaf: {
      path: pathToLeafOrBranch,
      condition: conditions.STRING,
      modifier: type
    },
    type: [...pathToLeafOrBranch, `${conditions.STRING}.${type}`].join('/'),
    payload
  })

  const concat = (...strings) => actionTemplate(atomicActions.CONCAT, strings)

  const replace = (pattern, replacement) => actionTemplate(atomicActions.REPLACE, { pattern, replacement })

  return {
    replace
  }
}