---
id: reset
title: reset
hide_title: true
sidebar_label: reset
---

# `reset()`
**`create.reset`**
**`create(actionType).reset`**
*Appropriate leaf state: any*

Returns an object that, *when dispatched to a store created with the original state tree*, resets the leaf's state to its initial state stored in the actions.

## Returns
`action` *(object)*: an object to dispatch to the store

## Example
```js
import { createStore } from 'redux'
import reduxLeaves from 'reduxLeaves'

const initialState = {
  num: 2,
  arr: [1, 2, 3],
  bool: true
}

const otherState = {
  num: 11,
  arr: ['a', 'b', 'c'],
  bool: false
}

const [reducer, actions] = reduxLeaves(initialState)
const store = createStore(reducer, otherState)        // preloads otherState

/* store.getState()
* {
*   num: 11,
*   arr: ['a', 'b', 'c']
* }
*/

```

### Calling `create.reset` on a leaf:
```js
const resetNum = actions.num.create.reset
store.dispatch(resetNum())
console.log(store.getState().num) // 2
```

### Calling `create(actionType).reset` on a leaf:
```js
const resetBool = actions.bool.create.reset
store.dispatch(resetBool())
console.log(store.getState().bool) // true
```

### Calling `create.reset` on a branch:
```js
const resetState = actions.create.reset
store.dispatch(resetState())
console.log(store.getState()) // { num: 2, arr: [1, 2, 3], bool: true }
```
