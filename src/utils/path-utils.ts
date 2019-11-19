export const pathIsEmpty = (path: string | (string | number)[]) => (
  ['', null, undefined].includes(path as string) || path.length === 0
)