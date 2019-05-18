---
id: defaults
title: Default Action Creators
hide_title: true
sidebar_label: Universal
---

# `create`

Every single [leaf](../leaf/README.md) on our [`actions`](README.md) object has a `create` property, through which we can access action creator functions corresponding to the [`reducersDict`](../README.md#reducersdict) passed to to [`reduxLeaves`](../README.md).

In addition, `create` also contains a number of default action creators, which are listed below.

The default action creators can be overwritten by supplying your own [leaf reducer](../leafReducers.md) definition (with the same [`creatorKey`](../creatorKeys.md)) in your `reducersDict`.

## Action creators
### Universal
- [`.apply(callback)`](#applycallback)
- [`.clear([toNull = false])`](#cleartonull--false)
- [`.reset()`](#reset)
- [`.update(value)`](#updatevalue)

### Type-specific
These are [spread into the `create` object](typeSpecific.md) depending on the `initialLeafState`, or accessible through their respective APIs:

- [`create.asArray`](asArray/README.md#createasarray)
- [`create.asBoolean`](asBoolean/README.md#createasboolean)
- [`create.asNumber`](asNumber/README.md#createasnumber)
- [`create.asObject`](asObject/README.md#createasobject)
- [`create.asString`](asString/README.md#createasstring)


## `apply(callback)`
**`create.apply`**

Returns an object that, *when dispatched to a store created with the original state tree*, updates the leaf's state to the return value of `callback(leafState, entireState)`.

*Note: creating an action using `apply(callback)` violates Redux's recommendation that [actions should always be serializable](https://redux.js.org/faq/actions#why-should-type-be-a-string-or-at-least-serializable-why-should-my-action-types-be-constants), since the resultant action will have the function `callback` as its `payload`.*

### Parameters
- `callback` *(function)*: invoked by the leaf's reducer with two arguments, `leafState` and `entireState`

### Returns
`action` *(object)*: an object to dispatch to the `store`

#### Example
```js
import { createStore } from 'redux'
import reduxLeaves from 'reduxLeaves'

const initialState = {
  bool: false,
  num: 2,
  str: 'foo',
  arr: [1, 2, 3]
}

const [reducer, actions] = reduxLeaves(initialState)
const store = createStore(reducer)
```

Calling `create.apply` on a leaf:

```js
store.dispatch(actions.str.create.apply(state => state.toUpperCase()))
console.log(store.getState().str) // 'FOO'
```

Calling `create.apply` on a branch:

```js
store.dispatch(actions.create.apply(state => ({ num: state.num, arr: state.arr }))
console.log(store.getState()) // { num: 2, arr: [1, 2, 3] }
```

Calling `create.apply` with two arguments:

```js
store.dispatch(actions.arr.create.apply(
  (leafState, entireState) => leafState.map(element => element * entireState.num)
))
console.log(store.getState()) // { num: 2, arr: [2, 4, 6] }
```

[Back to all `create` action creators](#action-creators)

## `clear([toNull = false])`
**`create.clear`**

Returns an object that, *when dispatched to a store created with the original state tree*, clears the leaf's state.

If `toNull === true`, then it updates it to `null`, otherwise it follows the type of the leaf's initial state:
- *number*: `0`
- *string*: `''`
- *boolean*: `false`
- *array*: `[]`
- *object*: `{}`

### Parameters
- `toNull` *(boolean, optional)*: defaults to `false`

### Returns
`action` *(object)*: an object to dispatch to the `store`

#### Example
```js
import { createStore } from 'redux'
import reduxLeaves from 'reduxLeaves'

const initialState = {
  bool: true,
  num: 2,
  str: 'foo',
  arr: [1, 2, 3]
}

const [reducer, actions] = reduxLeaves(initialState)
const store = createStore(reducer)
```
#### bool
```js
store.dispatch(actions.bool.create.clear())
console.log(store.getState().bool) // false

store.dispatch(actions.bool.create.clear(true))
console.log(store.getState().bool) // null
```
#### num
```js
store.dispatch(actions.num.create.clear())
console.log(store.getState().num) // 0

store.dispatch(actions.num.create.clear(true))
console.log(store.getState().num) // null
```
#### str
```js
store.dispatch(actions.str.create.clear(true))
console.log(store.getState().str) // null

store.dispatch(actions.str.create.clear())
console.log(store.getState().str) // ''
```
#### arr
```js
store.dispatch(actions.arr.create.clear(true))
console.log(store.getState().arr) // null

store.dispatch(actions.arr.create.clear())
console.log(store.getState().arr) // []
```
#### obj
```js
store.dispatch(actions.create.clear(true))
console.log(store.getState()) // null

store.dispatch(actions.create.clear())
console.log(store.getState()) // {}
```

[Back to all `create` action creators](#action-creators)

## `reset()`
**`create.reset`**

Returns an object that, *when dispatched to a store created with the original state tree*, resets the leaf's state to its initial state stored in the actions.

### Returns
`action` *(object)*: an object to dispatch to the store

#### Example
```js
import { createStore } from 'redux'
import reduxLeaves from 'reduxLeaves'

const initialState = {
  num: 2,
  arr: [1, 2, 3]

const otherState = {
  num: 11,
  arr: ['a', 'b', 'c']
}

const [reducer, actions] = reduxLeaves(initialState)
const store = createStore(reducer, otherState)        // preloads otherState

/* store.getState()
* {
*   num: 11,
*   arr: ['a', 'b', 'c']
* }
*/

```
Calling `create.reset` on a leaf:
```js
store.dispatch(actions.num.create.reset())
console.log(store.getState().num) // 2
```
Calling `create.reset` on a branch:
```js
store.dispatch(actions.create.reset())
console.log(store.getState()) // { num: 2, arr: [1, 2, 3] }
```

[Back to all `create` action creators](#action-creators)

## `update(value)`
**`create.update`**

Returns an object that, *when dispatched to a store created with the original state tree*, updates the leaf's state to `value`.

### Parameters
- `value` *(any)*: the new value for the leaf's state

### Returns
`action` *(object)*: an object to dispatch to the store

#### Example
```js
import { createStore } from 'redux'
import reduxLeaves from 'reduxLeaves'

const initialState = {
  bool: false,
  num: 2,
  str: 'foo',
  arr: [1, 2, 3]
}

const [reducer, actions] = reduxLeaves(initialState)
const store = createStore(reducer)
```

Calling `create.update` on a leaf:

```js
store.dispatch(actions.str.create.update("I can put anything here"))
console.log(store.getState().str) // 'I can put anything here'
```

Calling `create.update` on a branch:
```js
store.dispatch(actions.create.update({ any: { properties: true }}))
console.log(store.getState()) // { any: { properties: true } }
```

[Back to all `create` action creators](#action-creators)