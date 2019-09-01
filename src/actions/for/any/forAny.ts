import { atomicActions } from "../../atomic";
import { makeActionTemplate } from "../../template/makeActionTemplate";

export const forAny = (pathToLeafOrBranch: (string | number)[] = []) => {
  const actionTemplate = makeActionTemplate(pathToLeafOrBranch)

  const apply = (callback: (leafState: any, treeState: any) => any) => actionTemplate(atomicActions.APPLY, callback)

  const clear = (toNull: boolean = false) => actionTemplate(atomicActions.CLEAR, toNull)

  const reset = () => actionTemplate(atomicActions.RESET)

  const update = (value: any) => actionTemplate(atomicActions.UPDATE, value)

  return {
    apply,
    clear,
    reset,
    update
  }
}