---
id: off
title: off
hide_title: true
sidebar_label: off
---

# `off()`
**`create.off`**
**`create(actionType).off`**
*Appropriate leaf state:*

Returns an object that, *when dispatched to a store created with the original state tree*, updates the leaf's state to `false`.

## Returns
`action` *(object)*: an object to dispatch to the store

## Example
```js
import { createStore } from 'redux'
import reduxLeaves from 'reduxLeaves'

const initialState = {
  foo: true,
  bar: true
}

const [reducer, actions] = reduxLeaves(initialState)
const store = createStore(reducer)
```

### Calling `create.off`
```js
const turnOffFoo = actions.foo.create.off
store.dispatch(turnOffFoo())
console.log(store.getState().foo) // false
```

### Calling `create(actionType).off`
```js
const turnOffBar = actions.bar.create('TURN_OFF_BAR').off
store.dispatch(turnOffBar())
console.log(store.getState().bar) // false
```