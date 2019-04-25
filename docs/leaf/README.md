---
id: concept
title: Leaves in Redux-Leaves
hide_title: true
sidebar_label: Leaves in Redux-Leaves
---

# 'Leaves' in Redux-Leaves

*Leaves* are a simple but important concept in Redux-Leaves.

## In short
- [**Every node** of the initial state shape is a leaf](#every-node-of-the-initial-state-shape-is-a-leaf); and
- [**Nothing else** is a leaf](#nothing-else-is-a-leaf).

In particular: *not every node of the Redux state is a leaf*, since the Redux state can have nodes that weren't present in the [initial state shape passed to `reduxLeaves`](../README.md#initialstate).

This is explored further through a worked example of a simple todo app.

### Every node of the initial state shape is a leaf

First, let's set up, assuming that we have defined [`reducersDict`](../README.md#reducersdict) elsewhere.

```js
import { createStore } from 'redux'
import reduxLeaves from 'redux-leaves'
import reducersDict from './path/to/reducersDict'

const initialState = {
  todos: {
    byId: {},
    allIds: []
  },
  visibilityFilter: "SHOW_ALL"
}

const [reducer, actions] = reduxLeaves(initialState, reducersDict)
```
[From before:](#in-short)
> - **Every node** of the initial state shape is a leaf;
> - **Nothing else** is a leaf.

Thus, each of the following is a leaf:
- `todos`;
- `todos.byId`;
- `todos.allIds`; and
- `visibilityFilter`.

#### All leaves are available on `actions`

Every leaf is defined as an object on `actions`.
```js
console.log(typeof actions.todos)              // object
console.log(typeof actions.todos.allIds)       // object
console.log(typeof actions.visibilityFilter)   // object

// Non-leaves are not defined:
console.log(typeof actions.todos.byStatus)    // undefined - no todos.byStatus in initialState
```

### Not every node of the Redux state is a leaf

Having established what are and what are not leaves, let's now create our Redux store, and [hydrate it with some preloaded state](https://redux.js.org/api/createstore#createstorereducer-preloadedstate-enhancer):

```js
const preloadedState = {
  todos: {
    byId: {
      f23f: {
        title: "Read a book",
        completed: true
      }
    },
    allIds: ['f23f']
  },
  visibilityFilter: "SHOW_INCOMPLETE"
}

const store = createStore(initialState, preloadedState)
```
