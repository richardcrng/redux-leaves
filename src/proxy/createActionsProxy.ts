import { LSAWithPayload, DefaultCreators, CreateDefaults } from '../types'

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

    return {
      do(cb) {
        return {
          type: makeType(DefaultCreators.DO),
          leaf: { path, CREATOR_KEY: DefaultCreators.DO, creatorKey: DefaultCreators.DO.toLowerCase() },
          payload: cb
        }
      },

      reset() {
        return {
          type: makeType(DefaultCreators.RESET),
          leaf: { path, CREATOR_KEY: DefaultCreators.RESET, creatorKey: DefaultCreators.RESET.toLowerCase() }
        }
      },

      update(newVal: S) {
        return {
          type: makeType(DefaultCreators.DO),
          leaf: { path, CREATOR_KEY: DefaultCreators.UPDATE, creatorKey: DefaultCreators.UPDATE.toLowerCase() },
          payload: newVal
        }
      }
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