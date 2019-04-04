import _ from 'lodash';
import { combineReducers } from "redux";

export const combineReducerLeaves = (dict = {}) => {
  const reducer = combineReducers(dict)
  reducer.children = _.mapValues(dict, reducer => (
    reducer.children ? reducer.children : reducer
  ))
  return reducer
}