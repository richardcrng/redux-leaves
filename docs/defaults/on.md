---
id: on
title: on
hide_title: true
sidebar_label: on
---

# `on()`
**`create.on`**
**`create(actionType).on`**
*Appropriate leaf state:*

Returns an object that, *when dispatched to a store created with the original state tree*, updates the leaf's state to `true`.

## Returns
`action` *(object)*: an object to dispatch to the store

## Example
```js
import { createStore } from 'redux'
import reduxLeaves from 'reduxLeaves'

const initialState = {
  foo: false,
  bar: false
}

const [reducer, actions] = reduxLeaves(initialState)
const store = createStore(reducer)
```

### Calling `create.on`
```js
const turnOffFoo = actions.foo.create.on
store.dispatch(turnOffFoo())
console.log(store.getState().foo) // true
```

### Calling `create(actionType).on`
```js
const turnOffBar = actions.bar.create('TURN_ON_BAR').on
store.dispatch(turnOffBar())
console.log(store.getState().bar) // ture
```