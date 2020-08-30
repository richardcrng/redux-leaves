---
id: clear
title: clear
hide_title: true
sidebar_label: clear
---

# `clear(toNull = false)`
**`create.clear`**
**`create(actionType).clear`**
*Appropriate leaf state: any*

Returns an (action) object that the [riduce](../README.md) reducer uses to clears the leaf's state.

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
import riduce from 'riduce'

const initialState = {
  bool: true,
  num: 2,
  str: 'foo',
  arr: [1, 2, 3]
}

const [reducer, actions] = riduce(initialState)
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
const clearNum = actions.num.create.clear

store.dispatch(clearNum())
console.log(store.getState().num) // 0

store.dispatch(clearNum(true))
console.log(store.getState().num) // null
```
### String state
```js
const clearStr = actions.str.create.clear

store.dispatch(clearStr())
console.log(store.getState().str) // ''

store.dispatch(clearStr(true))
console.log(store.getState().str) // null
```
### Array state
```js
const clearArr = actions.arr.create.clear

store.dispatch(clearArr())
console.log(store.getState().arr) // []

store.dispatch(clearArr(true))
console.log(store.getState().arr) // null
```
### Object state
```js
const clearState = actions.create.clear

store.dispatch(clearState())
console.log(store.getState()) // {}

store.dispatch(clearState(true))
console.log(store.getState()) // null
```