import { combineReducerLeaves, makeReducerLeaf } from '../redux-leaves';
import * as todosById from './todosById'
import * as visibilityFilter from './visibilityFilter'

const prefix = "app/"

const initialState = {
  todos: ["a", "b", "c"],
  todosById: {
    a: {
      text: "Consider using Redux",
      completed: true
    },
    b: {
      text: "Keep all state in a single tree",
      completed: false
    },
    c: {
      text: "Try using Redux-Leaves for predictable, consistent and granular state management",
      completed: false
    }
  },
  visibilityFilter: {
    completed: null,
    long: null
  },
}

const reducerLeaf = makeReducerLeaf(prefix, initialState)

export const reducer = combineReducerLeaves({
  todos: reducerLeaf("todos"),
  todosById: todosById.reducer,
  visibilityFilter: visibilityFilter.reducer
})