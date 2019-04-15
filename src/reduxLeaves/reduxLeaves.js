import _ from 'lodash';
import { actionsFor } from '../actionsFor/actionsFor';

export const reduxLeaves = (initialState) => {
  function reducer(
    state = initialState,
    { leaf = {}, type, payload } = {}
  ) {
    const { path, condition, modifier } = leaf



    return state
  }

  const actions = actionsFor(initialState)

  return [reducer, actions]
}