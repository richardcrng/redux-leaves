export const makeActionTemplate = (path = [], { condition, custom } = {}) => {
  return (creatorKey, payload, customType = null) => {
    const type = condition
      ? `${condition}.${creatorKey}`
      : creatorKey

    return {
      leaf: {
        path,
        condition,
        creatorKey,
        custom
      },
      type: customType || [...path, type].join('/'),
      payload
    }
  }
}