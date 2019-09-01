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

export const updateState = (state: any, path: (string|number)[], val: any) => (
  (pathIsEmpty(path))
    ? val
    : R.assocPath(path, val, state)
)

const pathIsEmpty = (path: string | (string|number)[]) => (
  ['', null, undefined].includes(path as string) || path.length === 0
)