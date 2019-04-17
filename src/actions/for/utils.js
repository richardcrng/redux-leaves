export const makeActionTemplate = (path = [], { condition, custom } = {}) => {
  return (modifier, payload, customType = null) => {
    const type = condition
      ? `${condition}.${modifier}`
      : modifier

    return {
      leaf: {
        path,
        condition,
        modifier,
        custom
      },
      type: customType || [...path, type].join('/'),
      payload
    }
  }
}