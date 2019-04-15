import { atomicActions } from "../../atomic";

export const forAny = (pathToLeafOrBranch = []) => {
  const actionTemplate = (type, payload) => ({
    leaf: {
      path: pathToLeafOrBranch,
      modifier: type
    },
    type: [...pathToLeafOrBranch, type].join('/'),
    payload
  })

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