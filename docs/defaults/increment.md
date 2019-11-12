---
id: increment
title: increment
hide_title: true
sidebar_label: increment
---

# `increment([n = 1])`
**`create.increment`**
**`create(actionType).increment`**
*Appropriate leaf state: number*

Returns an (action) object that the [reduxLeaves](../README.md) reducer uses to increment the leaf's state by `n`.

## Parameters
- `n` *(number, optional)*: the number to increment the leaf's state by, defaulting to 1

## Returns
`action` *(object)*: an object to dispatch to the store

## Example
```js
import { createStore } from 'redux'
import reduxLeaves from 'reduxLeaves'

const initialState = {
  foo: 5,
  bar: 5
}

const [reducer, actions] = reduxLeaves(initialState)
const store = createStore(reducer)
```
### No argument provided
```js
const incrementFoo = actions.foo.create.increment
store.dispatch(incrementFoo())
console.log(store.getState().foo) // 6
```
### Providing an argument
```js
const incrementBar = actions.bar.create.increment
store.dispatch(incrementBar(37))
console.log(store.getState().bar) // 42
```