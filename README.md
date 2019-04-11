# redux-leaves

Less than 30 seconds to manage your redux state with *pleasure*, *precision* and *predictability*.

## 30 second setup

Start your timer:

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

Aaand stop - that's all the boilerplate we need!

### 2. Precise updates

Target any specific leaf in your reducer tree:

```js
store.dispatch(reducer.counter.increment())
store.dispatch(reducer.foo.set("bar"))
store.dispatch(reducer.nested.state.manageable.toggle())
// No boilerplate - action creators are ready to go!
```

### 3. Predictable changes
```js
{
  counter: 1,
  foo: "bar",
  nested: {
    state: {
      deep: true,
      manageable: true
    }
  }
}
```