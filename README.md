# redux-leaves

30 seconds and 3 steps to manage your redux state with *pleasure*, *precision* and *predictability*.

## 30 seconds and 3 steps

### 1. Pleasingly little boilerplate

```js
import { createStore } from 'redux'
import { reducerTree } from 'redux-leaves'

const initialState = {
  counter: 0,
  foo: "",
  nested: {
    state: {
      deep: true,
      manageable: false,
    }
  }
}

const reducer = reducerTree(initialState)
const store = createStore(reducer)
```

### 2. Precise updates

Target any specific leaf in your reducer tree:

```js
// These standard action creators come from step 1!

store.dispatch(reducer.counter.increment())
store.dispatch(reducer.foo.set("bar"))
store.dispatch(reducer.nested.state.manageable.toggle())
```

### 3. Predictable changes
```js
{
  counter: 1,
  foo: "bar",
  nested: {
    state: {
      deep: true,
      manageable: true // true indeed!
    }
  }
}
```