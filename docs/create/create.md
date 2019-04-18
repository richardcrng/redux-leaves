---
id: action-creators
title: Create API
hide_title: true
---

# Action creators API

Every single leaf on our `actions` object has a `create` property, through which we can access action creator functions.

### Action creators
#### Type-agnostic
- [`create.apply(callback)`](#createapplycallback)
- [`create.clear([toNull = false])`](#createcleartonull--false)
- [`create.reset()`](#createreset)
- [`create.update(value)`](#createupdatevalue)

#### Type-specific
- [`create.asArray`](asArray/#createasarray)
- [`create.asBoolean`](asBoolean/#createasboolean)
- [`create.asNumber`](asNumber/#createasnumber)
- [`create.asObject`](asObject/#createasobject)
- [`create.asString`](asString/#createasstring)

It is also possible to add [custom action creators](../customLogic.md) by passing in a `customLogic` argument to [`reduxLeaves`](../reduxLeaves.md).


## Type-specific `create` methods

All type-agnostic methods can be accessed through every leaf's `create` property.

Additionally, every leaf has access to type-specific methods (e.g. [`create.asArray` methods](https://github.com/richardcrng/redux-leaves/tree/master/docs/create/asArray#createasarray)), even if the leaf state is not an array.

For convenience, *if applicable at initialisation through [`reduxLeaves`](reduxLeaves.md)*, type-specific methods are also aliased so that they are directly available through `create` directly.

### Example
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
All leaves have access to [`create.asArray.push`](asArray/asArray.md#createpushelement-index---1-replace--false):
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

## Type-agnostic `create` methods

### `create.apply(callback)`
***(`initialLeafState`: any)***

Returns an object that, *when dispatched to a store created with the original state tree*, updates the leaf's state to the return value of `callback(leafState, entireState)`.

#### Parameters
- `callback` *(function)*: invoked by the leaf's reducer with two arguments, `leafState` and `entireState`

#### Returns
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

### `create.clear([toNull = false])`
***(`initialLeafState`: any)***

Returns an object that, *when dispatched to a store created with the original state tree*, clears the leaf's state.

If `toNull === true`, then it updates it to `null`, otherwise it follows the type of the leaf's initial state:
- *number*: `0`
- *string*: `''`
- *boolean*: `false`
- *array*: `[]`
- *object*: `{}`

#### Parameters
- `toNull` *(boolean, optional)*: defaults to `false`

#### Returns
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
##### bool
```js
store.dispatch(actions.bool.create.clear())
console.log(store.getState().bool) // false

store.dispatch(actions.bool.create.clear(true))
console.log(store.getState().bool) // null
```
##### num
```js
store.dispatch(actions.num.create.clear())
console.log(store.getState().num) // 0

store.dispatch(actions.num.create.clear(true))
console.log(store.getState().num) // null
```
##### str
```js
store.dispatch(actions.str.create.clear(true))
console.log(store.getState().str) // null

store.dispatch(actions.str.create.clear())
console.log(store.getState().str) // ''
```
##### arr
```js
store.dispatch(actions.arr.create.clear(true))
console.log(store.getState().arr) // null

store.dispatch(actions.arr.create.clear())
console.log(store.getState().arr) // []
```
##### obj
```js
store.dispatch(actions.create.clear(true))
console.log(store.getState()) // null

store.dispatch(actions.create.clear())
console.log(store.getState()) // {}
```

[Back to all `create` action creators](#action-creators)

### `create.reset()`
***(`initialLeafState`: any)***

Returns an object that, *when dispatched to a store created with the original state tree*, resets the leaf's state to its initial state stored in the actions.

#### Returns
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

### `create.update(value)`
***(`initialLeafState`: any)***

Returns an object that, *when dispatched to a store created with the original state tree*, updates the leaf's state to `value`.

#### Parameters
- `value` *(any)*: the new value for the leaf's state

#### Returns
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