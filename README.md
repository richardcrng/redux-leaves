# redux-leaves

Manage every leaf of your state tree with *pleasure*, *precision* and *predictability*.

#### Getting started
- [30 second demo](#30-second-demo)
- [Motivation](#motivation)

#### API reference
- [Core API: `reduxLeaves(initialState)`](https://github.com/richardcrng/redux-leaves/tree/master/docs)
- [Action creators API: `create`](https://github.com/richardcrng/redux-leaves/tree/master/docs/create)

## 30 second demo

### 1. Pleasingly little boilerplate

```bash
npm install --save redux-leaves
```

```js
import { createStore } from 'redux'
import reduxLeaves from 'redux-leaves'

const initialState = {
  counter: 1,
  foo: ['foo'],
  nested: {
    deep: {},
    state: {
      manageable: 'you bet'
    }
  }
}

const [reducer, actions] = reduxLeaves(initialState) // ES6 array destructuring
const store = createStore(reducer)
```

### 2. Precise updates

```js
// actions API allows us to access action creators targeted at any leaf of our state shape

store.dispatch(actions.counter.create.increment())
store.dispatch(actions.foo.create.push('bar'))
store.dispatch(actions.nested.state.deep.create.set('arbitrarily', true))
store.dispatch(actions.nested.state.manageable.create.apply(state => state.toUpperCase()))
```

### 3. Predictable changes
```js
// store.getState()
{
  counter: 2,
  foo: ['foo', 'bar'],
  nested: {
    deep: {
      arbitrarily: true
    },
    state: {
      manageable: 'YOU BET'
    }
  }
}
```

## Motivation

### Problem

I have found that [Redux](https://redux.js.org/) and [Redux DevTools](https://github.com/zalmoxisus/redux-devtools-extension) both work great for following what is happening in your app.<sup>1</sup>

However, there are three pain points that I encountered:

1. **Ugly boilerplate maintenance**: one more slice of state =  another load of action types, creators and reducers to write.
2. **Unhelpfully named constants**: what was `NONTRIVIAL_THING_HAPPENED` meant to do, again...?
3. **Repetitive reducer logic**: an action that updates some slice of state to true? *How novel!*

<sup>1</sup> *cf. what you* intended *to happen in your app...*

### Solution

`redux-leaves` is a library that is written to provide:

1. **Pleasingly little boilerplate**: set up your reducer and actions in one line
```js
const [reducer, actions] = reduxLeaves(initialState)
```

2. **Precise updates**: easily increment that counter, no matter how deeply you nested it
```js
dispatch(actions.distressingly.and.foolishly.deeply.nested.counter.create.increment(2))
```
3. **Predictable changes**: understand exactly what's happening with clear and consistently named action types:
```js
// action type dispatched above:
'distressingly/and/foolishly/deeply/nested/counter/asNumber.INCREMENT'
``` 