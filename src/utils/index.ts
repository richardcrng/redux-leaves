import * as R from 'ramda'
import { pathIsEmpty } from './path-utils';
import { updateState } from './update-state';

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

export {
  updateState
}