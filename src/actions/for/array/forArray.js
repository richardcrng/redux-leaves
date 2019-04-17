import { atomicActions } from "../../atomic";
import { conditions } from "../../condtions/conditions";
import { makeActionTemplate } from "../utils";

export const forArray = (pathToLeafOrBranch = []) => {
  const actionTemplate = makeActionTemplate(
    pathToLeafOrBranch,
    { condition: conditions.ARRAY }
  )

  const concat = (array) => actionTemplate(atomicActions.CONCAT, array)

  const drop = (n = 1) => actionTemplate(atomicActions.DROP, n)

  const filter = (callback) => actionTemplate(atomicActions.FILTER, callback)

  const push = (element, index = -1, replace = false) => actionTemplate(atomicActions.PUSH, { element, index, replace })

  return {
    concat,
    drop,
    filter,
    push
  }
}