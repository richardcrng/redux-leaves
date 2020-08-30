---
id: filter
title: filter
hide_title: true
sidebar_label: filter
---

# `filter(callback)`
**`create.filter`**
**`create(actionType).filter`**
*Appropriate leaf state: array*

Returns an (action) object that the [riduce](../README.md) reducer uses to non-mutatively update the leaf's state by selecting elements that return true when passed to `callback`.

(Effectively, this uses the vanilla javascript [`Array.prototype.filter(callback)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) API.)

## Parameters
- `callback` *(function)*: the callback function to test each element with

## Returns
`action` *(object)*: an object to dispatch to the `store`

## Example
```js
import { createStore } from 'redux'
import riduce from 'riduce'

const initialState = {
  foo: [1, 2, 3, 4, 5],
  bar: ['cat', 'dog', 'bat']
}

const [reducer, actions] = riduce(initialState)
const store = createStore(reducer)
```

### Calling create.filter
```js
const filterFoo = actions.foo.create.filter
store.dispatch(filterFoo(e => !(e % 2)))
console.log(store.getState().foo) // [2, 4]
```

### Calling create(actionType).filter
```js
const filterBar = actions.bar.create('FILTER_BAR').filter
store.dispatch(filterBar(e => e.includes('at')))
console.log(store.getState().bar) // ['cat', 'bat']
```