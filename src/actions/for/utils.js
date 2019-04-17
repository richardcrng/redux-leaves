export const makeActionTemplate = (path = [], { condition, custom } = {}) => {
  return (modifier, payload) => {
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
      type: [...path, type].join('/'),
      payload
    }
  }
}