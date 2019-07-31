import FluxStandardActionCreatorTypeAware from "../../types/FluxStandardAction/Creator/TypeAware";


// Returns a function to create actions of given type
export const makeActionCreator = (type: string) => {
  // First argument passed becomes payload property of action
  //  Second argument is object that becomes spread inside action
  const actionCreator: FluxStandardActionCreatorTypeAware = (payload: any, meta: any, spread = {}) => ({ type, payload, meta, ...spread })

  actionCreator.type = type

  return actionCreator
}