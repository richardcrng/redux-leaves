---
id: type-specific
title: Type-Specific Action Creators
hide_title: true
sidebar_label: Type-specific creators
---

# Type-specific `create` methods

- [`create.asArray`](asArray/README.md#createasarray)
- [`create.asBoolean`](asBoolean/README.md#createasboolean)
- [`create.asNumber`](asNumber/README.md#createasnumber)
- [`create.asObject`](asObject/README.md#createasobject)
- [`create.asString`](asString/README.md#createasstring)


All type-agnostic methods can be accessed through every leaf's `create` property.

Additionally, every leaf has access to type-specific methods (e.g. [`create.asArray` methods](asArray/README.md#createasarray)), even if the leaf state is not an array.

For convenience, *if applicable at initialisation through [`reduxLeaves`](../README.md)*, type-specific methods are also aliased so that they are directly available through `create` directly.


#### Example
```js
import { createStore } from 'redux'
import reduxLeaves from 'reduxLeaves'

const initialState = {
  bool: false,        // initialised as boolean
  num: 2,             // initialised as number
  str: 'foo',         // initialised as string
  arr: [1, 2, 3],     // initialised as array
  obj: {}             // initialised as object
}

const [reducer, actions] = reduxLeaves(initialState)
const store = createStore(reducer)
```
All leaves have access to [`create.asArray.push`](asArray/README.md#createpushelement-index---1-replace--false):
```js
console.log(typeof actions.bool.create.asArray.push)      // function
console.log(typeof actions.num.create.asArray.push)       // function
console.log(typeof actions.str.create.asArray.push)       // function
console.log(typeof actions.str.arr.create.asArray.push)   // function
console.log(typeof actions.str.obj.create.asArray.push)   // function
```
But **only** `actions.arr.create` has *direct* access to `create.push`, since it is the only leaf that was initialised as an array:
```js
console.log(typeof actions.bool.create.push)      // undefined
console.log(typeof actions.num.create.push)       // undefined
console.log(typeof actions.str.create.push)       // undefined
console.log(typeof actions.str.arr.create.push)   // function: initialised as array
console.log(typeof actions.str.obj.create.push)   // undefined
```