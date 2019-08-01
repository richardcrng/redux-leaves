import { atomicActions } from "../../atomic";
import { conditions } from '../../condtions/conditions';
import { makeActionTemplate } from "../../template/makeActionTemplate";

export const forObject = (pathToLeafOrBranch: string[] = []) => {
  const actionTemplate = makeActionTemplate(
    pathToLeafOrBranch,
    { condition: conditions.OBJECT }
  )

  const assign = (...sources: object[]) => actionTemplate(atomicActions.ASSIGN, sources)

  const set = (path: string[], value: any) => actionTemplate(atomicActions.SET, { path, value })

  return {
    assign,
    set
  }
}