// Returns a function to create actions of given type
export const makeActionCreator = type => {
  // First argument passed becomes payload property of action
  //  Second argument is object that becomes spread inside action
  const actionCreator = (payload, spread = {}) => ({ type, payload, ...spread })

  actionCreator.type = type

  return actionCreator
}