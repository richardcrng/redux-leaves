import { path } from 'ramda'
import produce from 'immer'

export const getState = <S>(state: S, propPath: (string | number)[]) => (
  (pathIsEmpty(propPath))
    ? state
    : path(propPath, state)
)

export const pathIsEmpty = (propPath: string | (string | number)[]) => (
  ['', null, undefined].includes(propPath as string) || propPath.length === 0
)

export const setValue = <S, V = unknown>(obj: S, propPath: (string | number)[], value: V) => {
  const pathTo = [...propPath]
  const finalProp = pathTo.pop()
  let currentObj = obj

  pathTo.forEach(prop => {
    // @ts-ignore
    if (currentObj[prop] == null) {
      // @ts-ignore
      currentObj[prop] = {}
    }
    // @ts-ignore
    currentObj = currentObj[prop];
  })

  // @ts-ignore
  currentObj[finalProp as string | number] = value;
}

export const updateState = <S, V = unknown>(state: S, propPath: (string | number)[], val: V): S => {
  if (pathIsEmpty(propPath)) return val as unknown as S
  return produce(state, (draftState) => {
    setValue(draftState, propPath, val)
  })
}

export default updateState