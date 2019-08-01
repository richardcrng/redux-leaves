import * as R from 'ramda'

export const getState = (state: any, path: string | string[]) => (
  (pathIsEmpty(path))
    ? state
    : Array.isArray(path)
      ? R.path(path, state)
      : R.path(path.split('.'), state)
)

export const resetState = (state: any, path: string | string[], initialState: any) => (
  updateState(
    state,
    path,
    getState(initialState, path)
  )
)

export const updateState = (state: any, path: string | string[], val: any) => (
  (pathIsEmpty(path))
    ? val
    : Array.isArray(path)
      ? R.assocPath(path, val, state)
      : R.assocPath(path.split('.'), val, state)
)

const pathIsEmpty = (path: string | string[]) => (
  ['', null, undefined].includes(path as string) || path.length === 0
)