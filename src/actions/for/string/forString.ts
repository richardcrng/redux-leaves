import { atomicActions } from "../../atomic";
import { conditions } from '../../condtions/conditions';
import { makeActionTemplate } from "../../template/makeActionTemplate";

export const forString = (pathToLeafOrBranch: string[] = []) => {
  const actionTemplate = makeActionTemplate(
    pathToLeafOrBranch,
    { condition: conditions.STRING }
  )

  const concat = (...strings: string[]) => actionTemplate(atomicActions.CONCAT, strings)

  const replace = (pattern: string | RegExp, replacement: string) => actionTemplate(atomicActions.REPLACE, { pattern, replacement })

  return {
    concat,
    replace
  }
}