# redux-leaves

Takes a state tree and returns a reducer with all the actions you need to control it precisely and predictably.

## Why bother?
```js
import { createStore } from 'redux'
import { reducerTree } from 'redux-leaves'

const state = {
  counter: 0,
  foo: "",
  nested: {
    state: {
      deep: true,
      manageable: false,
    }
  }
}

const reducer = reducerTree(state)

const store = createStore(reducer)
```