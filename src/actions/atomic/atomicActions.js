export const atomicActions = {
  APPLY: "APPLY",           // updates slice of state by applying payload (function) to it
  CLEAR: "CLEAR",           // updates slice of state to null
  CONCAT: "CONCAT",         // concats payload to state
  DROP: "DROP",             // non-mutative drop of n elements from array's beginning
  INCREMENT: "INCREMENT",   // increments slice of state by action's payload
  OFF: "OFF",               // updates slice of state to false
  ON: "ON",                 // updates slice of state to true
  PUSH: "PUSH",             // non-mutative push of payload to state
  REPLACE: "REPLACE",
  RESET: "RESET",           // updates slice of state to initial value
  SET: "SET",               // set a property in state to payload.value at payload.path
  TOGGLE: "TOGGLE",         // updates slice of state to !current
  UPDATE: "UPDATE"          // updates slice of state to action's payload
}