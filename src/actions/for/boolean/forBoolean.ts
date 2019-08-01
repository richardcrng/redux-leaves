import { atomicActions } from "../../atomic";
import { conditions } from "../../condtions/conditions";
import { makeActionTemplate } from "../../template/makeActionTemplate";

export const forBoolean = (pathToLeafOrBranch: string[] = []) => {
  const actionTemplate = makeActionTemplate(
    pathToLeafOrBranch,
    { condition: conditions.BOOLEAN }
  )

  const off = () => actionTemplate(atomicActions.OFF)
  const on = () => actionTemplate(atomicActions.ON)
  const toggle = () => actionTemplate(atomicActions.TOGGLE)


  return {
    off,
    on,
    toggle
  }
}