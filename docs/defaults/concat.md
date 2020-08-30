---
id: concat
title: concat
hide_title: true
sidebar_label: concat
---

# `concat(arrayOrString)`
**`create.concat`**
**`create(actionType).concat`**
*Appropriate leaf state: array | string*

Returns an (action) object that the [riduce](../README.md) reducer uses to update the leaf's state by concatening it with `arrayOrString`.

## Parameters
- `arrayOrString` *(array | string)*: the array to concatenate

## Returns
`action` *(object)*: an object to dispatch to the `store`

## Example
```js
import { createStore } from 'redux'
import riduce from 'riduce'

const initialState = {
  arr: [1, 2, 3],
  str: 'foo'
}

const [reducer, actions] = riduce(initialState)
const store = createStore(reducer)
```

### Concatenating an array
```js
const concatToArr = actions.arr.create.concat
store.dispatch(concatToArr(['a', 'b', 'c']))
console.log(store.getState().arr) // [1, 2, 3, 'a', 'b', 'c']
```

### Concatenating a string
```js
const concatToStr = actions.str.create.concat
store.dispatch(concatToStr('bar'))
console.log(store.getState().str) // 'foobar'
```
