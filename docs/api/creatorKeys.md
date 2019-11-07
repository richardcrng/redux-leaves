---
id: creator-keys
title: Creator Keys
hide_title: true
sidebar_label: Creator keys
---

# Creator keys

A creator key (`creatorKey`) serves two roles:

1. In a [`reducersDict`](../README.md#reducersdict), it uniquely identifies a given [leaf reducer](leafReducers.md); and
2. In the `actions` API, it:
  - is an action creator available at a given leaf through [`.create[creatorKey]`](create.md), that
  - triggers the corresponding leaf reducer logic (when said action creator is called and its resultant action is dispatched).

## Example

In the below code:
- `addOne` is the creator key that identifies and triggers a reducer to add one to a leaf's state;
- `doubleEach` is the creator key that identifies and triggers a reducer to double each element in a leaf's state.

### Setup

```js
import reduxLeaves from 'redux-leaves'
import { createStore } from 'redux'

const initialState = {
  foo: 5,
  bar: [1, 2, 3]
}
```

### Identifying leaf reducers
```js
// Use the creator keys to uniquely identify leaf reducers
const reducersDict = {
  addOne: leafState => leafState + 1,
  doubleEach: leafState => leafState.map(n => 2 * n)
}
```

### Creating actions

```js
// Grab the actions object using reduxLeaves
const [reducer, actions] = reduxLeaves(initialState, reducersDict)
const store = createStore(reducer)

// Use the creator keys at a chosen leaf's create property:
const actionToAddOneToFoo = actions.foo.create.addOne()
const actionToDoubleEachAtBar = actions.bar.create.doubleEach()
```

### Triggering the leaf reducer
```js
// Dispatch created actions to trigger the matching leaf reducer
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