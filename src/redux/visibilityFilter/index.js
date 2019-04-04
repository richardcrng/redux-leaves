import { makeReducerLeaf, combineReducerLeaves } from '../../redux-leaves';

const prefix = "app/visibilityFilter/"

const initialState = {
  completed: null,
  long: null
}

const reducerLeaf = makeReducerLeaf(prefix, initialState)

export const reducer = combineReducerLeaves({
  completed: reducerLeaf("completed"),
  long: reducerLeaf("long")
})