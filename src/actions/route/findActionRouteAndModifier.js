import _ from 'lodash';

export const findActionRouteAndModifier = (pathWithActionString = "example/CLEAR", metaPath = "", separator = '/') => {
  const arr = pathWithActionString.split(separator)
  // Remove empty strings, e.g. if we've split "/example/CLEAR/"
  let compacted = _.compact(arr)
  // Pop off the last element - this is the modifier
  const modifier = compacted.pop()
  // Push meta path modifier which action might have
  if (metaPath && metaPath.split && typeof metaPath === "function") compacted = compacted.concat(_.compact(metaPath.split(separator)))
  return {
    route: compacted,
    modifier
  }
}