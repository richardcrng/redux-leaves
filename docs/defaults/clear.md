---
id: clear
title: clear
hide_title: true
sidebar_label: clear
---

# `clear(toNull = false)`
**create.clear**
**create(actionType).clear**
*Appropriate leaf state: any*

Returns an object that, *when dispatched to a store created with the original state tree*, clears the leaf's state.

If `toNull === true`, then it updates it to `null`, otherwise it follows the type of the leaf's state:
- *number* clears to `0`
- *string* clears to `''`
- *boolean* clears to `false`
- *array* clears to `[]`
- *object* clears to `{}`

## Parameters
- `toNull` *(boolean, optional)*: defaults to `false`

## Returns
`action` *(object)*: an object to dispatch to the `store`

## Example
```js
import { createStore } from 'redux'
import reduxLeaves from 'reduxLeaves'

const initialState = {
  bool: true,
  num: 2,
  str: 'foo',
  arr: [1, 2, 3]
}

const [reducer, actions] = reduxLeaves(initialState)
const store = createStore(reducer)
```
### Boolean state
```js
const clearBool = actions.bool.create.clear

store.dispatch(clearBool())
console.log(store.getState().bool) // false

store.dispatch(clearBool(true))
console.log(store.getState().bool) // null
```
### Number state
```js
store.dispatch(actions.num.create.clear())
console.log(store.getState().num) // 0

store.dispatch(actions.num.create.clear(true))
console.log(store.getState().num) // null
```
### String state
```js
store.dispatch(actions.str.create.clear())
console.log(store.getState().str) // ''

store.dispatch(actions.str.create.clear(true))
console.log(store.getState().str) // null
```
### Array state
```js
store.dispatch(actions.arr.create.clear())
console.log(store.getState().arr) // []

store.dispatch(actions.arr.create.clear(true))
console.log(store.getState().arr) // null
```
### Object state
```js
store.dispatch(actions.create.clear())
console.log(store.getState()) // {}

store.dispatch(actions.create.clear(true))
console.log(store.getState()) // null
```