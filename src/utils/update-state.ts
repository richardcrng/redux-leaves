import * as R from 'ramda'
import { pathIsEmpty } from './path-utils';

const updateIn = (path: (string | number)[], val: any, obj: object | any[]) => R.compose(
  // @ts-ignore
  R.set(R.__, val, obj),
  R.apply(R.compose),
  R.map(R.cond([[R.is(Number), R.lensIndex], [R.T, R.lensProp]]))
  // @ts-ignore
)(path);

export const updateState = (state: any, path: (string | number)[], val: any) => (
  (pathIsEmpty(path))
    ? val
    // : R.assocPath(path, val, state)
    : updateIn(path, val, state)
)