import _ from 'lodash';
import { reducerLeaf } from './reducerLeaf';


export const makeReducerLeaf = (initialState, prefix = "") => {
  return (...route) => {
    return reducerLeaf({
      prefix,
      route,
      initialState: route.length === 0
        ? initialState
        : _.get(initialState, route.join('.'), null)
    })
  }
}