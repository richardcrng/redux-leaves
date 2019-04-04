import { makeReducerLeaf } from '../../redux-leaves';

const prefix = "app/todosById/"

const initialState = {
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
}

const reducerLeaf = makeReducerLeaf(prefix, initialState)

export const reducer = reducerLeaf()