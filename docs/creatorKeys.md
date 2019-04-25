---
id: creator-keys
title: Creator Keys
hide_title: true
sidebar_label: Creator keys
---

# Creator keys

A creator key (`creatorKey`) serves two roles:

1. In a [`reducersDict`](README.md#reducersdict), it uniquely identifies a given [leaf reducer](leafReducers.md); and
2. In the `actions` API, it:
  - is an action creator available at a given [leaf](leaf/README.md) through [`.create[creatorKey]`](create/defaults.md), that
  - triggers the corresponding leaf reducer logic (when said action creator is called and its resultant action is dispatched).

## Example

In the below code:
- `addOne` is the creator key that identifies and triggers a reducer to add one to a leaf's state;
- `doubleEach` is the creator key that identifies and triggers a reducer to double each element in a leaf's state.

```js
import reduxLeaves from 'redux-leaves'
import { createStore } from 'redux'

const initialState = {
  foo: 5,
  bar: [1, 2, 3]
}

// Use the creator keys to uniquely identify reducer logic
const reducersDict = {
  addOne: leafState => leafState + 1,
  doubleEach: leafState => leafState.map(n => 2 * n)
}

const [reducer, actions] = reduxLeaves(initialState, reducersDict)
const store = createStore(reducer)

// Use the creator keys to create actions:
const actionToAddOneToFoo = actions.foo.create.addOne()
const actionToDoubleEachAtBar = actions.bar.create.doubleEach()

// Dispatch created actions to trigger the matching reducer logic
store.dispatch(actionToAddOneToFoo)
store.dispatch(actionToDoubleEachAtBar)

console.log(store.getState())
/*
{
  foo: 6,
  bar: [2, 4, 6]
}
*/
```