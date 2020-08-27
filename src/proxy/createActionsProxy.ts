import { DefaultCreators, CreateDefaults, LeafStandardAction, LSAWithPayload } from '../types'

export type ActionsProxy<S, T> = {
  create: CreateDefaults<S, T>
} & {
  [P in keyof S]: ActionsProxy<S[P], T>
}

function createActionsProxy<S, T>(
  state: S,
  path: (string|number)[] = []
): ActionsProxy<S, T> {

  const proxy = new Proxy(wrapForProxy(state, path), {
    get: (target, prop: Extract<keyof S, string | number> | 'create') => {
      if (prop === 'create') return target.create

      return createActionsProxy(target[prop], [...path, propForPath(prop)])
    }
  })

  return proxy as unknown as ActionsProxy<S, T>
}

function wrapForProxy<S, T>(
  state: S,
  path: (string|number)[] = []
) {

  const makeCreators = (passedType?: string): CreateDefaults<S, T > => {
    const makeType = passedType
      ? (_: string) => passedType
      : (str: string) => [...path, str].join('/')
    
    function creatorOfType<T>(str: string, payload: T): LSAWithPayload<T>
    function creatorOfType(str: string): LeafStandardAction
    function creatorOfType<T>(str: string, payload?: T) {
      return {
        type: makeType(str),
        leaf: { path, CREATOR_KEY: str.toUpperCase(), creatorKey: str.toLowerCase() },
        ...payload ? { payload } : {}
      }
    }

    return {
      do: (cb) => creatorOfType(DefaultCreators.DO, cb),
      reset: () => creatorOfType(DefaultCreators.RESET),
      update: (newVal: S) => creatorOfType(DefaultCreators.UPDATE, newVal)
    }
  }

  const create = Object.assign(makeCreators, makeCreators())

  return Object.assign({ create }, state)
}

const propForPath = (prop: string | number): string | number => (
  isFixedString(prop)
    ? parseInt(String(prop))
    : prop
)

const isFixedString = (s: string | number) => !isNaN(+s) && isFinite(+s) && !/e/i.test(String(s))

export default createActionsProxy