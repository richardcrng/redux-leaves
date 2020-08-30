---
id: push
title: push
hide_title: true
sidebar_label: push
---

# `push(element, [index = -1], [replace = false])`
**`create.push`**
**`create(actionType).push`**
*Appropriate leaf type: array*

Returns an (action) object that the [riduce](../README.md) reducer uses to non-mutatively push `element` to the leaf's state at index `index`. If `replace` is `true`, then `element` replaces the existing element with that index.

## Parameters
- `element` *(any)*: the element to insert to the leaf's state
- `index` *(integer, optional)*: the index of the array where `element` should be inserted
- `replace` *(boolean, optional)*: whether or not `element` should replace the current `index`<sup>th</sup> element

## Returns
`action` *(object)*: an object to dispatch to the store

## Example
```js
import { createStore } from 'redux'
import riduce from 'riduce'

const initialState = {
  foo: [1, 2, 3],
  bar: [1, 2, 3],
  foobar: [1, 2, 3]
}

const [reducer, actions] = riduce(initialState)
const store = createStore(reducer)
```
### Providing element
```js
const pushToFoo = actions.foo.create.push
store.dispatch(pushToFoo(4))
console.log(store.getState().foo) // [1, 2, 3, 4]
```
### Providing element and index
```js
const pushToBar = actions.bar.create.push
store.dispatch(pushToBar(4, 0)) // push 4 to have index 0
console.log(store.getState().bar) // [4, 1, 2, 3]
```
### Providing element, index and replace
```js
const pushToFoobar = actions.foobar.create.push
store.dispatch(pushToFoobar(4, 0, true)) // replace 0th element with 4
console.log(store.getState().foobar) // [4, 2, 3]
```