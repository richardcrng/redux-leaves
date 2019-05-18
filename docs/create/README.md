---
id: creators
title: Action Creators
hide_title: true
sidebar_label: Actions
---

# `actions`

## Action creators

With Redux-Leaves, all [leaf reducers](../leafReducers.md) that you define in your [`reducersDict`](../README.md#reducersdict) are automatically given a corresponding action creator.

The action creator has a [creator key](../creatorKeys.md) (`creatorKey`) corresponding to the one which the leaf reducer is defined with.

`create[creatorKey]` is then an action creator function available at every single [leaf](../leaf/README.md) on our `actions` object.

Dispatch an action created by `create[creatorKey]` will trigger the matching leaf reducer.

## `create[creatorKey]`

### Parameters
- `...args` *(...any)*: passed to the leaf reducer's [`argsToPayload`](../leafReducers.md#argstopayload) function

### Returns
`action` *(object)*: a Leaf-Standard-Action

## Example

### 1. Grab actions from `reduxLeaves`

```js
import reduxLeaves from 'redux-leaves'
import { createStore } from 'redux'

const initialState = {
  foo: 1
}

const reducersDict = {
  addOne: leafState => leafState + 1,
  double: leafState => 2 * n,
  exponentiate: (leafState, { payload }) => leafState ** payload
}

const [reducer, actions] = reduxLeaves(initialState, reducersDict)
```

### 2. Create actions using creator keys
```js
const { create } = actions.foo    // action creators for the foo leaf of state

const actionToAddOneToFoo = create.addOne()
const actionToDoubleFoo = create.double()
const actionToCubeFoo = create.exponentiate(3)
```
Redux-Leaves' action creators can take optional arguments. By default, the first argument (if it exists) becomes the action's payload, but [this behaviour can be configured](../leafReducers.md#argstopayload).

### 3. Dispatch actions to the store
```js
const store = createStore(initialState)

store.dispatch(actionToAddOneToFoo)
store.dispatch(actionToDoubleFoo)
store.dispatch(actionToCubeFoo)

// ((1+1)*2)^3 = 64
console.log(store.getState())   // { foo: 64 }; success!
```

## Defaults

Redux-Leaves also ships with some [default action creators](defaults.md) available.