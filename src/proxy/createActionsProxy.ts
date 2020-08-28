import wrapWithCreate from './wrapWithCreate'
import { DefaultCreators, CreateFn } from '../types'

export type ActionsProxy<S, T> = {
  create: DefaultCreators<S, T> & CreateFn<DefaultCreators<S, T>>
} & {
  [P in keyof S]: ActionsProxy<S[P], T>
}

function createActionsProxy<S, T>(
  state: S,
  path: (string|number)[] = []
): ActionsProxy<S, T> {

  const proxy = new Proxy(wrapWithCreate(state, path), {
    get: (target, prop: Extract<keyof S, string | number> | 'create') => {
      if (prop === 'create') return target.create

      return createActionsProxy(target[prop], [...path, propForPath(prop)])
    }
  })

  return proxy as unknown as ActionsProxy<S, T>
}

const propForPath = (prop: string | number): string | number => (
  isFixedString(prop)
    ? parseInt(String(prop))
    : prop
)

const isFixedString = (s: string | number) => !isNaN(+s) && isFinite(+s) && !/e/i.test(String(s))

export default createActionsProxy