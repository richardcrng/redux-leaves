---
id: overview
title: Overview
hide_title: true
---

# Overview

The guiding philosophy of Redux-Leaves is *write once, reduce anywhere*.

**Just want to see some code? Check out the [30 second demo](demo.md).**

This page explains more about the motivation of Redux-Leaves and how its design philosophy is put into practice.

## Motivation

### Why?

Redux is great, but some developers complain about the boilerplate being [tedious, cumbersome and convoluted](https://medium.com/@Charles_Stover/no-boilerplate-global-state-management-in-react-41e905944eb7).

Redux-Leaves aims to **make Redux easier to learn *and* quicker to scale**.

### How?

One of the three core principles of Redux is: "[Changes \[to global state\] are made with pure \[reducer\] functions"](https://redux.js.org/introduction/three-principles#changes-are-made-with-pure-functions).

This can be easier said than done.

Achieving this can feel like it requires a lot of boilerplate in:
- action types;
- action creators; and
- switch/case logic...

... for *every single slice of state*.

**What if we could just write some reducer logic and have it instantly available *throughout our global state tree?***

This encapsulates Redux-Leave's *write once, reduce anywhere* philosophy.

### What?

Redux-Leaves lets you *write once, reduce anywhere* with:
- Quick setup;
- Intuitive API; and
- Advanced customisation.

#### Quick setup
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
  push: (leafState, { payload }) => [...leafState, payload],
  recurse: (leafState, { payload }, wholeState) => ({ ...leafState, [payload]: wholeState[payload] })
}

const [reducer, actions] = reduxLeaves(initialState, reducers)
const store = createStore(reducer)
```

#### Intuitive API

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

#### Advanced customisation
