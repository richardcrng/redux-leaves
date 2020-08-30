---
id: redux-leaves
title: riduce
hide_title: true
sidebar_label: riduce
---

# `riduce(initialState, [reducersDict = {}])`

Returns a reducer function and an actions object.

**See the [30 second demo](examples/basicExample.md)** for usage.

## Parameters
- [`initialState`](#initialstate) *(object)*: the state shape and initial values for your Redux store
- [`reducersDict`](#reducersdict) *(object, optional)*: a collection of [leaf reducers](api/leafReducers.md) keyed by their [creator keys](api/creatorKeys.md)

### `initialState`
*(object)*

This is the state shape and initial values for your Redux store.

It is described as having state 'branches' and 'leaves'.

#### Example

```js
const initialState = {
  todos: {
    byId: {},
    allIds: []
  },
  visibilityFilter: "SHOW_ALL"
}
```

### `reducersDict`
*(object)*

This is an object where every `key`-`value` pair is such that:
- `value` *(function | object)* is a [leaf reducer](api/leafReducers.md);
- `key` is a [creator key](api/creatorKeys.md) for that leaf reducer.

#### Example

```js
const reducersDict = {
  increment: (state, { payload }) => state + payload,
  slice: {
    argsToPayload: (begin, end) => [begin, end]
    reducer: (state, { payload }) => state.slice(payload[0], payload[1])
  }
}
```

## Returns
`array`, with two elements:
- 0th: `reducer` *(function)*: a reducer function to pass to redux's `createStore`
- 1st: [`actions`](api/actions.md) *(object)*: an object with same shape as `initialState`

### `reducer`

The root reducer for your Redux store.

It listens to actions created through [`actions`](api/actions.md) at a given leaf for a given [creator key](api/creatorKeys.md), and updates that leaf's state using the [leaf reducer](api/leafReducers.md) keyed by the creator key.

### `actions`

See documentation on the [`actions`](api/actions.md) object.