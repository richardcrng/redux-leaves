import _ from 'lodash';
import { combineReducers } from "redux";

export const combineReducerLeaves = (dict = {}) => {
  const reducer = combineReducers(recursivelyCombinedDict(dict))
  // const reducer = combineReducers(dict)
  reducer.children = _.mapValues(dict, reducer => (
    reducer.children ? reducer.children : reducer
  ))
  return reducer
}

const recursivelyCombinedDict = (dict = {}) => (
  _.mapValues(dict, val => {
    if (typeof val === "function") {
      return val
    } else if (typeof val === "object") {
      return combineReducerLeaves(val)
    } else {
      return val
    }
  })
)