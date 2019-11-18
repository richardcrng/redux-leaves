---
id: update
title: update
hide_title: true
sidebar_label: update
---

# `update(value)`
**`create.update`**
**`create(actionType).update`**
*Appropriate leaf state: any*

Returns an (action) object that the [reduxLeaves](../README.md) reducer uses to update the leaf's state to `value`.

## Parameters
- `value` *(any)*: the new value for the leaf's state

## Returns
`action` *(object)*: an object to dispatch to the store

## Example
```js
import { createStore } from 'redux'
import reduxLeaves from 'reduxLeaves'

const initialState = {
  bool: false,
  num: 2,
  str: 'foo',
  arr: [1, 2, { number: 3 }]
}

const [reducer, actions] = reduxLeaves(initialState)
const store = createStore(reducer)
```

### Calling `create.update` on a leaf:

```js
const updateStr = actions.str.create.update
store.dispatch(updateStr("I can put anything here"))
console.log(store.getState().str) // 'I can put anything here'
```

### Calling `create.update` on an array element:

```js
const updateFirstElementOfArr = actions.arr[1].create.update
store.dispatch(updateFirstElementOfArr('second'))
console.log(store.getState().arr) // [1, 'second', { number: 3 }]
```

### Calling `create.update` within an array element:

```js
const updateSecondElementNumberProp = actions.arr[2].number.create.update
store.dispatch(updateSecondElementNumberProp(1337))
console.log(store.getState().arr) // [1, 'second', { number: 1337 }]
```

### Calling `create.update` on a branch:
```js
const updateState = actions.create.update
store.dispatch(updateState({ any: { properties: true }}))
console.log(store.getState()) // { any: { properties: true } }
```