import * as R from 'ramda'

export const getState = (state: any, path: string[]) => (
  (pathIsEmpty(path))
    ? state
    : R.path(path, state)
)

export const resetState = (state: any, path: string[], initialState: any) => (
  updateState(
    state,
    path,
    getState(initialState, path)
  )
)

export const updateState = (state: any, path: string[], val: any) => (
  (pathIsEmpty(path))
    ? val
    : R.assocPath(path, val, state)
)

const pathIsEmpty = (path: string | string[]) => (
  ['', null, undefined].includes(path as string) || path.length === 0
)