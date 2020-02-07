// import * as R from 'ramda'
import produce from 'immer'

import { pathIsEmpty } from './path-utils';

// const updateIn = (path: (string | number)[], val: any, obj: object | any[]) => R.compose(
//   // @ts-ignore
//   R.set(R.__, val, obj),
//   R.apply(R.compose),
//   R.map(R.cond([[R.is(Number), R.lensIndex], [R.T, R.lensProp]]))
//   // @ts-ignore
// )(path);

export const setValue = (obj: any, path: (string | number)[], value: any) => {
  // let i;
  const pathTo = [...path]
  const finalProp = pathTo.pop()
  let currentObj = obj
  
  pathTo.forEach(prop => {
    if (currentObj[prop] == null) {
      currentObj[prop] = {}
    }
    currentObj = currentObj[prop];
  })
  
  currentObj[finalProp as string | number] = value;
}

export const updateState = (state: any, path: (string | number)[], val: any): any => {
  if (pathIsEmpty(path)) return val
  
  return produce(state, (draftState: any) => {
    setValue(draftState, path, val)
  })
}