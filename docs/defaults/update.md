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

Returns an object that, *when dispatched to a store created with the original state tree*, updates the leaf's state to `value`.

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
  arr: [1, 2, 3]
}

const [reducer, actions] = reduxLeaves(initialState)
const store = createStore(reducer)
```

Calling `create.update` on a leaf:

```js
const updateStr = actions.str.create.update
store.dispatch(updateStr("I can put anything here"))
console.log(store.getState().str) // 'I can put anything here'
```

Calling `create(actionType).update` on a leaf:

```js
const updateNum = actions.num.create('UPDATE_NUM').update
store.dispatch(updateNum(9001))
console.log(store.getState().num) // 9001
```

Calling `create.update` on a branch:
```js
const updateState = actions.create.update
store.dispatch(updateState({ any: { properties: true }}))
console.log(store.getState()) // { any: { properties: true } }
```