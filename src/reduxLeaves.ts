import { createActionsProxy } from "./proxy"
import { ActionsProxy } from "./proxy/createActionsProxy"

function reduxLeaves<S>(state: S): [unknown, ActionsProxy<S>] {
  const reducer = ''
  const actions = createActionsProxy(state)

  return [reducer, actions]
}

export default reduxLeaves