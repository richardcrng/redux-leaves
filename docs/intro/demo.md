---
id: demo
title: 30 Second Demo
hide_title: true
sidebar_label: 30 second demo
---

# redux-leaves

**[Write once](#write-once). [Reduce anywhere](#reduce-anywhere).**

## Write once.

```js
import { createStore } from 'redux'
import reduxLeaves from 'redux-leaves'

const initialState = {
  counter: 1,
  foo: ['foo'],
  nest: { deep: {} }
}

const reducersDict = {
  increment: leafState => leafState + 1,
  push: (leafState, { payload }) => [...leafState, payload],
  recurse: (leafState, { payload }, wholeState) => ({ ...leafState, [payload]: wholeState[payload] })
}

const [reducer, actions] = reduxLeaves(initialState, reducersDict)
const store = createStore(reducer)
```

## Reduce anywhere.

```js
store.dispatch(actions.counter.create.increment())
console.log(store.getState()) // { counter: 2, foo: ['foo'], nest: { deep: {} } }

store.dispatch(actions.foo.create.push('bar'))
console.log(store.getState()) // { counter: 2, foo: ['foo', 'bar'], nest: { deep: {} } }

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
