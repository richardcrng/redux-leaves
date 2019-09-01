import { atomicActions } from "../../atomic";
import { conditions } from '../../condtions/conditions';
import { makeActionTemplate } from "../../template/makeActionTemplate";

export const forNumber = (pathToLeafOrBranch: (string|number)[] = []) => {
  const actionTemplate = makeActionTemplate(
    pathToLeafOrBranch,
    { condition: conditions.NUMBER }
  )

  const increment = (n = 1) => actionTemplate(atomicActions.INCREMENT, n)

  return {
    increment
  }
}