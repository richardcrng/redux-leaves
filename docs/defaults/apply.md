---
id: apply
title: apply
hide_title: true
sidebar_label: apply
---

# `apply(callback)`
**`create.apply`**
**`create(actionType).apply`**
*Appropriate leaf state: any*

Returns an action object that, *when dispatched to a store created with the original state tree*, updates the leaf's state to the return value of `callback(leafState, treeState)`.

*Note: creating an action using `apply(callback)` does not follow Redux's non-enforced recommendation that [actions should always be serializable](https://redux.js.org/faq/actions#why-should-type-be-a-string-or-at-least-serializable-why-should-my-action-types-be-constants), since the resultant action will have the function `callback` as its `payload`.*

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

### Calling `create.apply` on a leaf:

```js
const applyToString = actions.str.create.apply
store.dispatch(applyToString(state => state.toUpperCase()))
console.log(store.getState().str) // 'FOO'
```

### Calling `create(actionType).apply` on a leaf:

```js
const applyToBoolean = actions.bool.create('APPLY_TO_BOOLEAN').apply
store.dispatch(applyToBoolean(state => !state))
console.log(store.getState().bool) // true
```

### Calling `create.apply` on a branch:

```js
const applyToState = actions.create.apply
store.dispatch(applyToState(state => ({ num: state.num, arr: state.arr }))
console.log(store.getState()) // { num: 2, arr: [1, 2, 3] }
```

### Calling `create.apply` with two arguments:

```js
const applyToArray = actions.arr.create.apply
store.dispatch(applyToArray(
  (leafState, treeState) => leafState.map(element => element * treeState.num)
))
console.log(store.getState()) // { num: 2, arr: [2, 4, 6] }
```