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

Returns an object that, *when dispatched to a store created with the original state tree*, sets a property at `path` as `value`.

## Parameters
- `path` *(string[])*: the property path to set at
- `value` *(any)*: the value to set

## Returns
`action` *(object)*: an object to dispatch to the store

## Example
```js
import { createStore } from 'redux'
import reduxLeaves from 'reduxLeaves'

const initialState = {
  foo: { someProps: true }
  bar: {}
}

const [reducer, actions] = reduxLeaves(initialState)
const store = createStore(reducer)
```

### Calling create.path
```js
const setAtPathInFoo = actions.foo.create.path
store.dispatch(setAtPathInFoo(['nested', 'deep'], true))
console.log(store.getState().foo) // { nested: { deep: true } }

```
### Calling create(actionType).path
```js
const setAtPathInBar = actions.bar.create.path
store.dispatch(setAtPathInBar(['arbitrary', 'keys'], 4))
console.log(store.getState().bar) // { arbitrary: { keys: 12 } }
```