export const atomicActions = {
  CLEAR: "CLEAR",           // updates slice of state to null
  INCREMENT: "INCREMENT",   // increments slice of state by action's payload
  OFF: "OFF",               // updates slice of state to false
  ON: "ON",                 // updates slice of state to true
  RESET: "RESET",           // updates slice of state to initial value
  SET: "SET",               // updates slice of state to action's payload
  TOGGLE: "TOGGLE"          // updates slice of state to !current
}