---
id: on
title: on
hide_title: true
sidebar_label: on
---

# `on()`
**`create.on`**
**`create(actionType).on`**
*Appropriate leaf state: boolean*

Returns an (action) object that the [riduce](../README.md) reducer uses to update the leaf's state to `true`.

## Returns
`action` *(object)*: an object to dispatch to the store

## Example
```js
import { createStore } from 'redux'
import riduce from 'riduce'

const initialState = {
  foo: false,
  bar: false
}

const [reducer, actions] = riduce(initialState)
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