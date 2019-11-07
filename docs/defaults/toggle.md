---
id: toggle
title: toggle
hide_title: true
sidebar_label: toggle
---

# `toggle()`
**`create.toggle`**
**`create(actionType).toggle`**
*Appropriate leaf state:*

Returns an object that, *when dispatched to a store created with the original state tree*, updates the leaf's state to `!leafState`.

## Returns
`action` *(object)*: an object to dispatch to the store

## Example
```js
import { createStore } from 'redux'
import reduxLeaves from 'reduxLeaves'

const initialState = {
  foo: true,
  bar: false
}

const [reducer, actions] = reduxLeaves(initialState)
const store = createStore(reducer)
```

### Calling `create.toggle`
```js
const toggleFoo = actions.foo.create.toggle
store.dispatch(toggleFoo())
console.log(store.getState().foo) // false
```

### Calling `create(actionType).toggle`
```js
const toggleBar = actions.bar.create('TOGGLE_BAR').toggle
store.dispatch(toggleBar())
console.log(store.getState().bar) // true
```