import _ from 'lodash';
import { recursivelyAddActions } from '../addActions';
import { recursivelyGeneratePaths, addActionsDeep } from '../addActions/addActions';

export const reduxLeaves = (initialState) => {
  function reducer(
    state = initialState,
    { leaf = {}, type, payload } = {}
  ) {
    const { path, condition, modifier } = leaf



    return state
  }

  const paths = recursivelyGeneratePaths(initialState)
  const actions = addActionsDeep(initialState, paths)

  return [reducer, actions]
}