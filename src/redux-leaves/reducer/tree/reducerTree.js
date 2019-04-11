// import _ from 'lodash';
// import { combineReducerLeaves } from '../combine';

// export const reducerTree = initialState => {
//   reducerDict = asReducers(initialState)
//   return combineReducerLeaves(reducerDict)
// }

// const asReducers = stateTree => {
//   return _.mapValues(stateTree, (val, key) => (
//     (typeof val === "object" && _.size >= 1) ? asReducers(val) : val
//   ))
// }