import { makeReducerLeaf, combineReducerLeaves } from '../../redux-leaves';

const prefix = "app/visibilityFilter/"

const initialState = {
  completed: null,
  long: null
}

const reducerLeaf = makeReducerLeaf(initialState, prefix)

export const reducer = combineReducerLeaves({
  completed: reducerLeaf("completed"),
  long: reducerLeaf("long")
})