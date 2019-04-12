# redux-leaves

30 seconds and 3 steps to manage your redux state with *pleasure*, *precision* and *predictability*.

## 30 seconds and 3 steps

### 1. Pleasingly little boilerplate

```bash
npm install --save richardcrng/redux-leaves#master
```

```js
import { createStore } from 'redux'
import { reducerTree } from 'redux-leaves'

const initialState = {
  counter: 0,
  foo: "foo",
  nested: {
    state: {
      deep: false,
      manageable: "maybe...?",
    }
  }
}

const reducer = reducerTree(initialState)
const store = createStore(reducer)
```

### 2. Precise updates

```js
// Step 1 gives us targeted action creators:

store.dispatch(reducer.counter.increment())
store.dispatch(reducer.foo.update("bar"))
store.dispatch(reducer.nested.state.deep.toggle())
store.dispatch(reducer.nested.state.manageable.apply(state => state.concat(" DEFINITELY!")))
```

### 3. Predictable changes
```js
// store.getState()
{
  counter: 1,
  foo: "bar",
  nested: {
    state: {
      deep: true,
      manageable: "maybe...? DEFINITELY!"
    }
  }
}
```

## API

### reducerLeaves
`reducerLeaves(initialState, [prefix])`

Returns a reducer function with attached action creators.

#### Arguments
- **initialState**: the initial state shape for the reducer to use.
- **prefix** *(optional)*: a prefix that you want to supply to the reducer's attached action creator types, e.g. `'app/'`.