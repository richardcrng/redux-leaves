---
id: do
title: do
hide_title: true
sidebar_label: do
---

# `do(callback)`
**`create.do`**
**`create(actionType).do`**
*Appropriate leaf state: any*

Returns an (action) object that the [reduxLeaves](../README.md) reducer uses to non-mutatively update the leaf's state to the return value of `callback(leafState, treeState)`.

*Note: creating an action using `do(callback)` does not follow Redux's non-enforced recommendation that [actions should always be serializable](https://redux.js.org/faq/actions#why-should-type-be-a-string-or-at-least-serializable-why-should-my-action-types-be-constants), since the resultant action will have the function `callback` as its `payload`.*

## Parameters
- `callback` *(function)*: invoked by the leaf's reducer with two arguments, `leafState` and `entireState`

## Returns
`action` *(object)*: an object to dispatch to the `store`

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

### Calling `create.do` on a leaf:

```js
const doToString = actions.str.create.do
store.dispatch(doToString(state => state.toUpperCase()))
console.log(store.getState().str) // 'FOO'
```

### Calling `create(actionType).do` on a leaf:

```js
const doToBoolean = actions.bool.create('APPLY_TO_BOOLEAN').do
store.dispatch(doToBoolean(state => !state))
console.log(store.getState().bool) // true
```

### Calling `create.do` on a branch:

```js
const doToState = actions.create.do
store.dispatch(doToState(state => ({ num: state.num, arr: state.arr }))
console.log(store.getState()) // { num: 2, arr: [1, 2, 3] }
```

### Calling `create.do` with two arguments:

```js
const doToArray = actions.arr.create.do
store.dispatch(doToArray(
  (leafState, treeState) => leafState.map(element => element * treeState.num)
))
console.log(store.getState()) // { num: 2, arr: [2, 4, 6] }
```