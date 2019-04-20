---
id: demo
title: 30 Second Demo
hide_title: true
sidebar_label: 30 second demo
---

# redux-leaves

Write once. Reduce anywhere.

## 30 second demo

### 1. Write once.

```js
import { createStore } from 'redux'
import reduxLeaves from 'redux-leaves'

const initialState = {
  counter: 1,
  foo: ['foo'],
  nest: { deep: {} }
}

const reducers = {
  increment: leafState => leafState + 1,
  push: (leafState, { payload }) => leafState.push(payload),
  recurse: (leafState, { payload }, wholeState) => ({ ...leafState, [payload]: wholeState[payload] })
}

const [reducer, actions] = reduxLeaves(initialState, reducers)
const store = createStore(reducer)
```

### 2. Reduce anywhere.

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
