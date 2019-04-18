---
id: object-creators
title: Object Action Creators
hide_title: true
sidebar_label: create.asObject
---

# `create.asObject`

Every single leaf on our `actions` object has access to `create.asObject` methods.

If the leaf was initialised with [plain object](https://lodash.com/docs/4.17.11#isPlainObject) state, then these methods are also accessible directly through the [`create` API](../README.md).

If the current `leafState` is *not* a plain object, then it is first coerced into a plain object via lodash's [`_.toPlainObject(leafState)`](https://lodash.com/docs/4.17.11#toPlainObject) method, before the state is updated according to the action dispatched.

### Action creators
- [`create.asObject.assign(...sources)`](#createasobjectassignsources)
- [`create.asObject.set(path, value)`](#createasobjectsetpath-value)

[Back to all `create` action creators](../README.md#action-creators)

## `create.asObject.assign(...sources)`
**alias: `create.assign(...sources)`** *(when `initialLeafState` is a [plain object](https://lodash.com/docs/4.17.11#toPlainObject))*

Returns an object that, *when dispatched to a store created with the original state tree*, updates the copies all properties from `sources` into the leaf's state.

(This is essentially a convenience wrapper on top of the vanilla JavaScript [`Object.assign`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign).)

### Parameters
- `sources` *(...objects)*: the path of the property to set

### Returns
`action` *(object)*: an object to dispatch to the store

### Example
```js
import { createStore } from 'redux'
import reduxLeaves from 'reduxLeaves'

const initialState = {
  foo: { props: true }
}

const [reducer, actions] = reduxLeaves(initialState)
const store = createStore(reducer)
```
```js
store.dispatch(actions.foo.create.asObject.assign({ string: 'foo' }))
console.log(store.getState().foo) // { props: true, string: 'foo' }
```
```js
store.dispatch(actions.ar.create.asObject.assign({ props: false }))
console.log(store.getState().foo) // { props: false, string: 'foo' }
```
Back to:
* [`create.asObject` action creators](#action-creators)
* [all `create` action creators](../README.md#action-creators)


## `create.asObject.set(path, value)`
**alias: `create.set(path, value)`** *(when `initialLeafState` is a [plain object](https://lodash.com/docs/4.17.11#toPlainObject))*

Returns an object that, *when dispatched to a store created with the original state tree*, updates the leaf's state at `path` with `value`.

(This uses lodash's [`_.set(object, path, value)`](https://lodash.com/docs/4.17.11#set), where `object` is `leafState`.)

### Parameters
- `path` *(array | string)*: the path of the property to set

### Returns
`action` *(object)*: an object to dispatch to the store

### Example
```js
import { createStore } from 'redux'
import reduxLeaves from 'reduxLeaves'

const initialState = {
  foo: {}
  bar: { props: true }
}

const [reducer, actions] = reduxLeaves(initialState)
const store = createStore(reducer)
```
```js
store.dispatch(actions.foo.create.asObject.set('accessed', true))
console.log(store.getState().foo.bar) // { accessed: true }
```
```js
store.dispatch(actions.ar.create.asObject.set('other.thing', false))
console.log(store.getState().foobar) // { props: true, other: { thing: false } }
```
Back to:
* [`create.asObject` action creators](#action-creators)
* [all `create` action creators](../README.md#action-creators)