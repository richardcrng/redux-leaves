import * as R from 'ramda'

export const getState = (state: any, path: (string|number)[]) => (
  (pathIsEmpty(path))
    ? state
    : R.path(path, state)
)

export const resetState = (state: any, path: (string|number)[], initialState: any) => (
  updateState(
    state,
    path,
    getState(initialState, path)
  )
)

const updateIn = (path: (string | number)[], val: any, obj: object | any[]) => R.compose(
  // @ts-ignore
  R.set(R.__, val, obj),
  R.apply(R.compose),
  R.map(R.cond([[R.is(Number), R.lensIndex], [R.T, R.lensProp]]))
  // @ts-ignore
)(path);

export const updateState = (state: any, path: (string|number)[], val: any) => (
  (pathIsEmpty(path))
    ? val
    // : R.assocPath(path, val, state)
    : updateIn(path, val, state)
)

const pathIsEmpty = (path: string | (string|number)[]) => (
  ['', null, undefined].includes(path as string) || path.length === 0
)