import FluxStandardActionCreatorTypeAware from "../../types/Actions/FSA/Creator/TypeAware";

// Returns a function to create actions of given type
export function makeActionCreator<P = any, M = any>(type: string) {
  // First argument passed becomes payload property of action
  //  Second argument is object that becomes spread inside action
  const actionCreator: FluxStandardActionCreatorTypeAware<P, M> = (payload?: P, meta?: M) => ({ type, payload, meta })

  actionCreator.type = type

  return actionCreator
}