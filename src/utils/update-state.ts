import produce from 'immer'

export const pathIsEmpty = (path: string | (string | number)[]) => (
  ['', null, undefined].includes(path as string) || path.length === 0
)

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

export const updateState = <S, V = any>(state: S, path: (string | number)[], val: V): S => {
  if (pathIsEmpty(path)) return val as unknown as S

  return produce(state, (draftState) => {
    setValue(draftState, path, val)
  })
}

export default updateState