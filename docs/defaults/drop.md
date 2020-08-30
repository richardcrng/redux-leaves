---
id: drop
title: drop
hide_title: true
sidebar_label: drop
---

# `drop([n = 1])`
**`create.drop`**
**`create(actionType).drop`**
*Appropriate leaf state: array*

Returns an (action) object that the [riduce](../README.md) reducer uses to non-mutatively drop the first `n` elements from the leaf's state.

## Parameters
- `n` *(number, optional)*: the number of elements to drop

## Returns
`action` *(object)*: an object to dispatch to the `store`

## Example
```js
import { createStore } from 'redux'
import riduce from 'riduce'

const initialState = {
  foo: ['a', 'b', 'c'],
  bar: ['a', 'b', 'c']
}

const [reducer, actions] = riduce(initialState)
const store = createStore(reducer)
```
### No argument provided
```js
const dropFromFoo = actions.foo.create.drop
store.dispatch(dropFromFoo())
console.log(store.getState().foo) // ['b', 'c']
```

### Providing an argument
```js
const dropFromBar = actions.bar.create.drop
store.dispatch(dropFromBar(2))
console.log(store.getState().bar) // ['c']
```