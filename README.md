# redux-leaves

Takes a state tree and returns a reducer with all the actions you need to control with *predictability*, *precision* and *pleasure*!

## Why bother?

Let's look at how easy it is to use.

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
```js
store.dispatch(reducer.counter.increment())
store.dispatch(reducer.foo.set("bar"))
store.dispatch(reducer.nested.state.manageable.toggle())
```

### 3. Predictable changes
```js
store.getState()
/*
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
/*
```