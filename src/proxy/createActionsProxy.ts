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
}

function createActionsProxy<S>(state: S): ActionsProxy<S> {

  return new Proxy(wrapForProxy(state), {})
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