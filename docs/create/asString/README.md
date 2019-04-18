---
id: string-creators
title: String Action Creators
hide_title: true
sidebar_label: String
---

# `create.asString`

Every single leaf on our `actions` object has access to `create.asString` methods.

If the leaf was initialised with string state, then these methods are also accessible directly through the [`create` API](../README.md).

If the current `leafState` is *not* a string, then it is first coerced into a string via lodash's [`_.toString(leafState)`](https://lodash.com/docs/4.17.11#toString) method, before the state is updated according to the action dispatched.

## Action creators
- [`.concat(...strings)`](#concatstrings)
- [`.replace(pattern, replacement)`](#replacepattern-replacement)

[Back to all `create` action creators](../README.md#action-creators)

## `concat(...strings)`
**`create.asString.concat`**

**alias: `create.concat`** *(when `initialLeafState` is a string)*

Returns an object that, *when dispatched to a store created with the original state tree*, updates the leaf's state by concatening it with `strings`.

### Parameters
- `strings` *(...strings)*: the strings to concatenate

### Returns
`action` *(object)*: an object to dispatch to the store

#### Example
```js
import { createStore } from 'redux'
import reduxLeaves from 'reduxLeaves'

const initialState = {
  foo: 'foo'
}

const [reducer, actions] = reduxLeaves(initialState)
const store = createStore(reducer)
```
```js
store.dispatch(actions.foo.create.asString.concat('bar', '!'))
console.log(store.getState().foo) // 'foobar!'
```

## `replace(pattern, replacement)`
**`create.asString.replace`**

**alias: `create.replace`** *(when `initialLeafState` is a string)*

Returns an object that, *when dispatched to a store created with the original state tree*, updates the leaf's state by replacing some, or all, matches of `pattern` with `replacement`.

### Parameters
- `pattern` *(RegExp | string)*: the pattern to replace

### Returns
`action` *(object)*: an object to dispatch to the store

#### Example
```js
import { createStore } from 'redux'
import reduxLeaves from 'reduxLeaves'

const initialState = {
  foo: 'foo'
}

const [reducer, actions] = reduxLeaves(initialState)
const store = createStore(reducer)
```
```js
store.dispatch(actions.foo.create.asString.replace('f', 'B'))
console.log(store.getState().foo) // 'Boo'
```
Back to:
* [`create.asString` action creators](#action-creators)
* [all `create` action creators](../README.md#action-creators)