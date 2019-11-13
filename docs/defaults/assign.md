---
id: assign
title: assign
hide_title: true
sidebar_label: assign
---

# `assign(...sources)`
**`create.assign`**
**`create(actionType).assign`**

Returns an (action) object that the [reduxLeaves](../README.md) reducer uses to non-mutatively copy all properties from `sources` into the leaf's state.

(This is essentially a convenience wrapper on top of the vanilla JavaScript [`Object.assign`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign).)

## Parameters
- `sources` *(...objects)*: the path of the property to set

## Returns
`action` *(object)*: an object to dispatch to the store

## Example
```js
import { createStore } from 'redux'
import reduxLeaves from 'reduxLeaves'

const initialState = {
  foo: { props: true },
  bar: { props: false }
}

const [reducer, actions] = reduxLeaves(initialState)
const store = createStore(reducer)
```

### Assigning new properties
```js
const assignToFoo = actions.foo.create.assign
store.dispatch(assignToFoo({ count: 2 }))
console.log(store.getState().foo) // { props: true, count: 2 }
```
### Overwriting properties
```js
const assignToBar = actions.bar.create.assign
store.dispatch(assignToBar({ props: true }))
console.log(store.getState().bar) // { props: true }
```