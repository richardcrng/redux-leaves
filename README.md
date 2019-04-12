# redux-leaves

30 seconds and 3 steps to manage your redux state with *pleasure*, *precision* and *predictability*.

## 30 seconds and 3 steps

### 1. Pleasingly little boilerplate

```bash
npm install --save richardcrng/redux-leaves#master
```

```js
import { createStore } from 'redux'
import reduxLeaves from 'redux-leaves'

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

const reducer = reduxLeaves(initialState)
const store = createStore(reducer)
```

### 2. Precise updates

```js
// All these action creators, and more, come with our reducer for free!

store.dispatch(reducer.counter.increment())
store.dispatch(reducer.foo.update("bar"))
store.dispatch(reducer.nested.state.deep.toggle())
store.dispatch(reducer.nested.state.manageable.apply(state => state.concat(" DEFINITELY!"))) // (non-mutative!)
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

## Motivation

### Problem

I have found that [Redux](https://redux.js.org/) and [Redux DevTools](https://github.com/zalmoxisus/redux-devtools-extension) both work great for following what is happening (*cf. what you intended to happen...*) in your app.

However, there are three pain points that I encountered:

1. **Ugly boilerplate maintenance**: one more slice of state =  another load of action types, creators and reducers to write.
2. **Unhelpfully named constants**: what was `NONTRIVIAL_THING_HAPPENED` meant to do, again...?
3. **Repetitive reducer logic**: an action that updates some slice of state to true? *How novel!*

### Solution

`redux-leaves` is a library that is written to provide:

1. **Pleasingly little boilerplate**: access your reducer, action types and creators with `const reducer = reducerLeaves(initialState)`
2. **Precise updates**: no matter how you nested that counter, increment it with `dispatch(reducer.distressingly.and.foolishly.deeply.nested.counter.increment())`
3. **Predictable changes**: an action is dispatched with type `distressingly/and/foolishly/deeply/nested/counter/INCREMENT`, so you can understand exactly what happened at a glance!


## API

### reducerLeaves
`reducerLeaves(initialState, [prefix])`

Returns a reducer function with attached action creators.

#### Arguments
- **initialState**: the initial state shape for the reducer to use.
- **prefix** *(optional)*: a prefix that you want to supply to the reducer's attached action creator types, e.g. `'app/'`.