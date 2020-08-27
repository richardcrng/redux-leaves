import { createActionsProxy } from "./proxy"
import { ActionsProxy } from "./proxy/createActionsProxy"

export type ReduxLeaves<S> = [string, ActionsProxy<S>]

function reduxLeaves<S>(state: S): ReduxLeaves<S>{
  const reducer = ''
  const actions = createActionsProxy(state)

  return [reducer, actions]
}

export default reduxLeaves