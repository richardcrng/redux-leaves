import _ from 'lodash';

export const leafReducerCustom = (customActions, leafState, { modifier, payload }) => {

  switch (modifier) {
    case atomicActions.INCREMENT: return state + payload
    default: return state
  }
}