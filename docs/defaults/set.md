---
id: set
title: set
hide_title: true
sidebar_label: set
---

# `set(key, value)`
**`create.set`**
**`create(actionType).set`**
*Appropriate leaf type: object*

Returns an object that, *when dispatched to a store created with the original state tree*, updates the leaf's state at the property `key` with `value`.

## Parameters
- `key` *(string)*: the path of the property to set
- `value` *(any)*: the value to set

## Returns
`action` *(object)*: an object to dispatch to the store

## Example
```js
import { createStore } from 'redux'
import reduxLeaves from 'reduxLeaves'

const initialState = {
  foo: {},
  bar: { props: true }
}

const [reducer, actions] = reduxLeaves(initialState)
const store = createStore(reducer)
```

### Setting a new property
```js
const setInFoo = actions.foo.create.set
store.dispatch(setInFoo('accessed', true))
console.log(store.getState().foo) // { accessed: true }
```

### Overwriting a property
```js
const setInBar = actions.bar.create.set
store.dispatch(setInBar('props', false))
console.log(store.getState().bar) // { props: false }
```