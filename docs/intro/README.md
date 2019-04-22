---
id: overview
title: Overview
hide_title: true
---

# Overview

The guiding philosophy of Redux-Leaves is *"write once, reduce anywhere"*.

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

This encapsulates Redux-Leave's *"write once, reduce anywhere"* philosophy.

## Introducing Redux-Leaves

### What?

Redux-Leaves lets you *write once, reduce anywhere* with:
- Quick setup;
- Intuitive API; and
- Advanced customisation.

### Quick setup
1. Define initial state and optional reducer logic;
2. Pass to `reduxLeaves`;
3. Done!
```js
import { createStore } from 'redux'
import reduxLeaves from 'redux-leaves'

const initialState = {
  counter: 1,
  foo: ['foo'],
  nest: { deep: {} }
}

// Optional reducer logic:
const reducers = {
  increment: leafState => leafState + 1,
  push: (leafState, { payload }) => [...leafState, payload],
  recurse: (leafState, { payload }, wholeState) => ({ ...leafState, [payload]: wholeState[payload] })
}

const [reducer, actions] = reduxLeaves(initialState, reducers)
const store = createStore(reducer)
```

We can now access action creators that trigger the `increment`, `push` and `recurse` reducer logic, for any slice of our state, all through the `actions` API.

### Intuitive API

The `actions` object contains action creators for every slice of state, based on the custom reducer logic we passed in to `reduxLeaves`.

```js
// Create an action to increment the counter slice of state
const actionToIncrementCounter = actions.counter.create.increment()

// Create an action to push 'bar' to the foo slice of state
const actionToPushToFoo = actions.foo.create.push('bar')

// Create an action to recurse the counter slice of state within the nest.deep slice of state
const actionToRecurseCounter = actions.nest.deep.create.recurse('counter')
```

The `reducer` produced by `reduxLeaves` and passed to `createStore` uses the supplied custom reducer logic to update the store's state:

```js
store.dispatch(actionToIncrementCounter)
console.log(store.getState()) // { counter: 2, foo: ['foo'], nest: { deep: {} } }

store.dispatch(actionToPushToFoo)
console.log(store.getState()) // { counter: 2, foo: ['foo', 'bar'], nest: { deep: {} } }

store.dispatch(actionToRecurseCounter)
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
