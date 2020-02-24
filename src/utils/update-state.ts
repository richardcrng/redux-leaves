import produce from 'immer'

import { pathIsEmpty } from './path-utils';


export const setValue = (obj: any, path: (string | number)[], value: any) => {
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