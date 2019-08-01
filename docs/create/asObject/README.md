---
id: object-creators
title: Object Action Creators
hide_title: true
sidebar_label: Object
---

# `create.asObject`

Every single leaf on our `actions` object has access to `create.asObject` methods.

If the leaf was initialised with [plain object](#plain-object) state, then these methods are also accessible directly through the [`create` API](../defaults.md).

If the current `leafState` is *not* a plain object, then it is first coerced into a plain object, before the state is updated according to the action dispatched.

#### Plain object
A plain object is created using `{}`, `new Object()` or `Object.create(null)`

## Action creators
- [`.assign(...sources)`](#assignsources)
- [`.set(path, value)`](#setpath-value)

[Back to all `create` action creators](../defaults.md)

## `assign(...sources)`
**`create.asObject.assign`**

**alias: `create.assign`** *(when `initialLeafState` is a [plain object](#plain-object))*

Returns an object that, *when dispatched to a store created with the original state tree*, updates the copies all properties from `sources` into the leaf's state.

(This is essentially a convenience wrapper on top of the vanilla JavaScript [`Object.assign`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign).)

### Parameters
- `sources` *(...objects)*: the path of the property to set

### Returns
`action` *(object)*: an object to dispatch to the store

#### Example
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


## `set(key, value)`
**`create.asObject.set`**

**alias: `create.set`** *(when `initialLeafState` is a [plain object](#plain-object))*

Returns an object that, *when dispatched to a store created with the original state tree*, updates the leaf's state at the property `key` with `value`.

```js
// TODO update this
```

### Parameters
- `key` *(string)*: the path of the property to set

### Returns
`action` *(object)*: an object to dispatch to the store

#### Example
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
console.log(store.getState().foo) // { accessed: true }
```
```js
store.dispatch(actions.bar.create.asObject.set('props', false))
console.log(store.getState().bar.props) // false
```
Back to:
* [`create.asObject` action creators](#action-creators)
* [all `create` action creators](../README.md#action-creators)