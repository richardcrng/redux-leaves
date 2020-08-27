import { StandardCreators, LeafStandardAction, LSAWithPayload, LSATypes } from '../types'

export type ActionsProxy<S> = {
  create: StandardCreators<S>
} & {
  [P in keyof S]: ActionsProxy<S[P]>
}

function createActionsProxy<S>(
  state: S,
  path: (string|number)[] = []
): ActionsProxy<S> {

  const proxy = new Proxy(wrapForProxy(state, path), {
    get: (target, prop: Extract<keyof S, string | number> | 'create') => {
      if (prop === 'create') return target.create

      return createActionsProxy(target[prop], [...path, propForPath(prop)])
    }
  })

  return proxy as unknown as ActionsProxy<S>
}

function wrapForProxy<S>(
  state: S,
  path: (string|number)[] = []
) {
  const wrapping = {
    create: {
      update(newVal: S): LSAWithPayload<S> {
        return {
          type: LSATypes.UPDATE,
          path,
          payload: newVal
        }
      }
    }
  }

  

  return Object.assign(wrapping, state)
}

const propForPath = (prop: string | number): string | number => (
  isFixedString(prop)
    ? parseInt(String(prop))
    : prop
)

const isFixedString = (s: string | number) => !isNaN(+s) && isFinite(+s) && !/e/i.test(String(s))

export default createActionsProxy