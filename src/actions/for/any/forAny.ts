import { atomicActions } from "../../atomic";
import { makeActionTemplate } from "../../template/makeActionTemplate";
import LeafStandardActionCreator from "../../../types/LeafStandardActionCreator";

export const forAny = (pathToLeafOrBranch: string[] = []) => {
  const actionTemplate = makeActionTemplate(pathToLeafOrBranch)

  const apply: LeafStandardActionCreator = (callback: (leafState: any, treeState: any) => any) => actionTemplate(atomicActions.APPLY, callback)

  const clear: LeafStandardActionCreator = (toNull: boolean = false) => actionTemplate(atomicActions.CLEAR, toNull)

  const reset: LeafStandardActionCreator = () => actionTemplate(atomicActions.RESET)

  const update: LeafStandardActionCreator = (value: any) => actionTemplate(atomicActions.UPDATE, value)

  return {
    apply,
    clear,
    reset,
    update
  }
}