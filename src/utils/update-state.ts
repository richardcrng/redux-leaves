import R from 'ramda'
import produce from 'immer'

export const getState = <S>(state: S, path: (string | number)[]) => (
  (pathIsEmpty(path))
    ? state
    : R.path(path, state)
)

export const pathIsEmpty = (path: string | (string | number)[]) => (
  ['', null, undefined].includes(path as string) || path.length === 0
)

export const setValue = <S, V = unknown>(obj: S, path: (string | number)[], value: V) => {
  const pathTo = [...path]
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

export const updateState = <S, V = unknown>(state: S, path: (string | number)[], val: V): S => {
  if (pathIsEmpty(path)) return val as unknown as S

  return produce(state, (draftState) => {
    setValue(draftState, path, val)
  })
}

export default updateState