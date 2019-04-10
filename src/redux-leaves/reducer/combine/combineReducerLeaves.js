import _ from 'lodash';
import { combineReducers } from "redux";
import { withActions } from '../../actions/set/actionSet';

export const combineReducerLeaves = (dict = {}, { prefix = "", route = [] } = {}, augment = true) => {
  const reducer = combineReducers(recursivelyCombinedDict(dict, { prefix, route }, augment))
  // const reducer = combineReducers(dict)
  reducer.children = _.mapValues(dict, (reducer, key) => (
    reducer.children
      ? reducer.children
      : augmentWithActions(reducer, [prefix, ...route, key], augment)
  ))
  return augmentWithActions(reducer, [prefix, ...route], augment)
}

const augmentWithActions = (reducer, path, shouldAugment = true) => (
  shouldAugment ? withActions(reducer, path) : reducer
)

const recursivelyCombinedDict = (dict = {}, { prefix, route } = {}, augment) => {
  return _.mapValues(dict, (val, key) => {
    if (typeof val === "function") {
      return val
    } else if (typeof val === "object") {
      return combineReducerLeaves(val, { prefix, route: [...route, key] }, augment)
    } else {
      return val
    }
  })
}