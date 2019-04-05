import _ from 'lodash';

export const pathJoin = (arr, s = '/') => {
  const flatArr = _.flattenDeep(arr)
  const trimmedArr = flatArr.map(str => _.trim(str, s))
  return (_.compact(trimmedArr)).join(s)
}