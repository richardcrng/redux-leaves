import _ from 'lodash';
import { combineReducers } from "redux";

export const combineReducerLeaves = (dict = {}) => {
  const reducer = combineReducers(dict)
  console.log("dict is", dict)
  _.forEach(dict, (reducer, key) => {
    _.set(reducer, key, key)
  })
  return reducer
}