---
id: demo
title: 30 Second Demo
hide_title: true
sidebar_label: 30 second demo
---

# Redux-Leaves

**[Write once](#write-once). [Reduce anywhere](#reduce-anywhere).**

## Write once.

```js
import { createStore } from 'redux'
import reduxLeaves from 'redux-leaves'

// 1. Define initialState
const initialState = {
  counter: 1,
  foo: ['foo'],
  nest: { deep: {} }
}

// 2. Define reducers dictionary
const reducersDict = {
  increment: leafState => leafState + 1,
  push: (leafState, { payload }) => [...leafState, payload],
  recurse: (leafState, { payload }, wholeState) => ({ ...leafState, [payload]: wholeState[payload] })
}

// 3. Grab reducer and actions from reduxLeaves, then create the Redux store
const [reducer, actions] = reduxLeaves(initialState, reducersDict)
const store = createStore(reducer)
```

## Reduce anywhere.

```js
// Increment state.counter
store.dispatch(actions.counter.create.increment())
console.log(store.getState()) // { counter: 2, foo: ['foo'], nest: { deep: {} } }

// Push 'bar' to state.foo
store.dispatch(actions.foo.create.push('bar'))
console.log(store.getState()) // { counter: 2, foo: ['foo', 'bar'], nest: { deep: {} } }

// Recurse the 'counter' property at state.nest.deep
store.dispatch(actions.nest.deep.create.recurse('counter'))
console.log(store.getState())
/*
  {
    counter: 2,
    foo: ['foo', 'bar'],
    nest: {
      deep: { counter: 2 }
    }
  }
*/
```
