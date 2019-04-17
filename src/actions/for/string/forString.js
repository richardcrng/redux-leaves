import { atomicActions } from "../../atomic";
import { conditions } from '../../condtions/conditions';
import { makeActionTemplate } from "../utils";

export const forString = (pathToLeafOrBranch = []) => {
  const actionTemplate = makeActionTemplate(
    pathToLeafOrBranch,
    { condition: conditions.STRING }
  )

  const concat = (...strings) => actionTemplate(atomicActions.CONCAT, strings)

  const replace = (pattern, replacement) => actionTemplate(atomicActions.REPLACE, { pattern, replacement })

  return {
    concat,
    replace
  }
}