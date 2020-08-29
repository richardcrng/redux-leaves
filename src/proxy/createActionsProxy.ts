import wrapWithCreate from './wrapWithCreate'
import { CustomReducers, CreateAPI } from '../types'

export type ActionsProxy<
  LeafT,
  TreeT,
  CustomReducersT extends CustomReducers<TreeT>
> = {
  create: CreateAPI<LeafT, TreeT, CustomReducersT>
} & {
  [K in keyof LeafT]: ActionsProxy<LeafT[K], TreeT, CustomReducersT>
}

function createActionsProxy<
  LeafT,
  TreeT,
  CustomReducersT extends CustomReducers<TreeT>
>(
  leafState: LeafT,
  treeState: TreeT,
  reducersDict: CustomReducersT,
  path: (string|number)[] = []
): ActionsProxy<LeafT, TreeT, CustomReducersT> {

  const proxy = new Proxy(wrapWithCreate(leafState, treeState, reducersDict, path), {
    get: (target, prop: Extract<keyof LeafT, string | number> | 'create') => {
      if (prop === 'create') return target.create

      return createActionsProxy(
        target[prop],
        treeState,
        reducersDict,
        [...path, propForPath(prop)]
      )
    }
  })

  return proxy as unknown as ActionsProxy<LeafT, TreeT, CustomReducersT>
}

const propForPath = (prop: string | number): string | number => (
  isFixedString(prop)
    ? parseInt(String(prop))
    : prop
)

const isFixedString = (s: string | number) => !isNaN(+s) && isFinite(+s) && !/e/i.test(String(s))

export default createActionsProxy