
export const makeCustomActions = (pathToLeafOrBranch, customActions) => {
  const actions = {
    compact: (values = [false, null, 0, '', undefined, NaN]) => null
  }

  const actionTemplate = (type, payload) => ({
    leaf: {
      path: pathToLeafOrBranch,
      modifier: type,
      custom: true
    },
    type: [...pathToLeafOrBranch, type].join('/'),
    payload
  })
}