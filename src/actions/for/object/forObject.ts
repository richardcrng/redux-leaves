import { atomicActions } from "../../atomic";
import { conditions } from '../../condtions/conditions';
import { makeActionTemplate } from "../../template/makeActionTemplate";

export const forObject = (pathToLeafOrBranch: (string|number)[] = []) => {
  const actionTemplate = makeActionTemplate(
    pathToLeafOrBranch,
    { condition: conditions.OBJECT }
  )

  const assign = (...sources: object[]) => actionTemplate(atomicActions.ASSIGN, sources)
  const path = (path: string[], value: any) => actionTemplate(atomicActions.SET, { path, value })
  const set = (key: string, value: any) => actionTemplate(atomicActions.SET, { path: [key], value })

  return {
    assign,
    path,
    set
  }
}