import { Action } from 'redux'

interface LeafStandardAction {
  type: string
}

export interface LSAWithPayload<P> extends LeafStandardAction {
  payload: P
}

type StandardCreators<S> = {
  update(newVal: S): LSAWithPayload<S>
}

export type ActionsProxy<S> = {
  create: StandardCreators<S>
} & {
  [P in keyof S]: ActionsProxy<S[P]>
}

function createActionsProxy<S>(state: S): ActionsProxy<S> {

  const proxy = new Proxy(wrapForProxy(state), {
    get: (target, prop: Extract<keyof S, string> | 'create') => {
      if (prop === 'create') return target.create

      return createActionsProxy(target[prop])
    }
  })

  return proxy as unknown as ActionsProxy<S>
}

function wrapForProxy<S>(state: S) {
  const wrapping = {
    create: {
      update(newVal: S) {
        return {
          type: 'blah',
          payload: newVal
        }
      }
    }
  }
  return Object.assign(wrapping, state)
}

export default createActionsProxy