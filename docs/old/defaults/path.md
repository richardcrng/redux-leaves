---
id: path
title: path
hide_title: true
sidebar_label: path
---

# `path(path, value)`
**`create.path`**
**`create(actionType).path`**
*Appropriate leaf type: object*

Returns an (action) object that the [riduce](../README.md) reducer uses to non-mutatively set a property at `path` from the leaf as `value`.

## Parameters
- `path` *(string[])*: an array of strings which represent the property path to set at
- `value` *(any)*: the value to set

## Returns
`action` *(object)*: an object to dispatch to the store

## Example
```js
import { createStore } from 'redux'
import riduce from 'riduce'

const initialState = {
  foo: {}
  bar: { arbitrary: { keys: 3 } }
}

const [reducer, actions] = riduce(initialState)
const store = createStore(reducer)
```

### Setting a new property
```js
const setAtPathInFoo = actions.foo.create.path
store.dispatch(setAtPathInFoo(['nested', 'deep'], true))
console.log(store.getState().foo) // { nested: { deep: true } }

```
### Overwriting a property
```js
const setAtPathInBar = actions.bar.create("SET_AT_PATH_IN_BAR").path
store.dispatch(setAtPathInBar(['arbitrary', 'keys'], 5))
console.log(store.getState().bar) // { arbitrary: { keys: 5 } }
```