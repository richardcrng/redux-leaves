import { atomicActions } from "../../atomic";
import { conditions } from "../../condtions/conditions";
import { makeActionTemplate } from "../../template/makeActionTemplate";
import LeafStandardActionCreator from "../../../types/LeafStandardActionCreator";

export const forArray = (pathToLeafOrBranch: string[] = []) => {
  const actionTemplate = makeActionTemplate(
    pathToLeafOrBranch,
    { condition: conditions.ARRAY }
  )

  const concat: LeafStandardActionCreator = (array: any[]) => actionTemplate(atomicActions.CONCAT, array)

  const drop: LeafStandardActionCreator = (n: number = 1) => actionTemplate(atomicActions.DROP, n)

  const filter: LeafStandardActionCreator = (callback: (element: any, index: number, array: any[]) => any[]) => actionTemplate(atomicActions.FILTER, callback)

  const push: LeafStandardActionCreator = (element: any, index: number = -1, replace: boolean = false) => actionTemplate(atomicActions.PUSH, { element, index, replace })

  return {
    concat,
    drop,
    filter,
    push
  }
}