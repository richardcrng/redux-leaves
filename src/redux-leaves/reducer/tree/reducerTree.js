import _ from 'lodash';
import { combineReducerLeaves } from '../combine';
import { makeReducerLeaf } from '../leaf';

export const reducerTree = (initialState = {}, prefix = "", augment = true) => {
  const reducerLeaf = makeReducerLeaf(initialState, prefix)
  const reducerDict = asReducers(initialState, reducerLeaf)
  return combineReducerLeaves(reducerDict, { prefix }, augment)
}

const asReducers = (stateTree, reducerLeaf, route = []) => {
  return _.mapValues(stateTree, (val, key) => {
    return (typeof val === "object" && _.size(val) >= 1)
      ? asReducers(val, reducerLeaf, [...route, key])
      : reducerLeaf(...route, key)
  })
}