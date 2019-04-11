export const atomicActions = {
  APPLY: "APPLY",           // updates slice of state by applying payload (function) to it
  CLEAR: "CLEAR",           // updates slice of state to null
  INCREMENT: "INCREMENT",   // increments slice of state by action's payload
  OFF: "OFF",               // updates slice of state to false
  ON: "ON",                 // updates slice of state to true
  PUSH: "PUSH",             // non-mutative push of payload to state
  RESET: "RESET",           // updates slice of state to initial value
  SET: "SET",               // updates slice of state to action's payload
  TOGGLE: "TOGGLE"          // updates slice of state to !current
}