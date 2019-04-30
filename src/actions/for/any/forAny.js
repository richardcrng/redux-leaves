import { atomicActions } from "../../atomic";
import { makeActionTemplate } from "../../template/makeActionTemplate";

export const forAny = (pathToLeafOrBranch = []) => {
  const actionTemplate = makeActionTemplate(pathToLeafOrBranch)

  const apply = callback => actionTemplate(atomicActions.APPLY, callback)

  const clear = (toNull = false) => actionTemplate(atomicActions.CLEAR, toNull)

  const reset = () => actionTemplate(atomicActions.RESET)

  const update = value => actionTemplate(atomicActions.UPDATE, value)

  return {
    apply,
    clear,
    reset,
    update
  }
}