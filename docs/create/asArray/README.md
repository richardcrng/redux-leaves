# create.asArray

Every single leaf on our `actions` object has access to `create.asArray` methods.

If the leaf was initialised with array state, then these methods are also accessible directly through the [`create` API](https://github.com/richardcrng/redux-leaves/tree/master/docs/create).

If the current `leafState` is *not* an array, then it is first coerced into an array via lodash's [`_.toArray(leafState)`](https://lodash.com/docs/4.17.11#toArray) method, before the state is updated according to the action dispatched.

### Action creators
- [`create.asArray.concat(array)`](#createasarrayconcatarray)
- [`create.asArray.drop([n = 1])`](#createdropn--1)
- [`create.asArray.push(element, [index = -1], [replace = false])`](#createpushelement-index---1-replace--false)

[Back to all `create` action creators](https://github.com/richardcrng/redux-leaves/tree/master/docs/create#action-creators)

## `create.asArray.concat(array)`
**alias: `create.concat(array)`** *(when `initialLeafState` is an array)*

Returns an object that, *when dispatched to a store created with the original state tree*, updates the leaf's state by concatening it with `array`.

### Parameters
- `array` *(array)*: the array to concatenate

### Returns
`action` *(object)*: an object to dispatch to the `store`

### Example
```js
import { createStore } from 'redux'
import reduxLeaves from 'reduxLeaves'

const initialState = {
  foo: [1, 2, 3]
}

const [reducer, actions] = reduxLeaves(initialState)
const store = createStore(reducer)
```
```js
store.dispatch(actions.foo.create.asArray.concat(['a', 'b', 'c']))
console.log(store.getState().foo) // [1, 2, 3, 'a', 'b', 'c']
```
Back to:
* [`create.asArray` action creators](#action-creators)
* [all `create` action creators](https://github.com/richardcrng/redux-leaves/tree/master/docs/create#action-creators)


## `create.asArray.filter(callback)`
**alias: `create.filter(callback)`** *(when `initialLeafState` is an array)*

Returns an object that, *when dispatched to a store created with the original state tree*, updates the leaf's state by selecting elements that return true when passed to `callback`.

(Effectively, this uses the vanilla javascript [`Array.prototype.filter(callback)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) API.)

### Parameters
- `callback` *(function)*: the callback function to test each element with

### Returns
`action` *(object)*: an object to dispatch to the `store`

### Example
```js
import { createStore } from 'redux'
import reduxLeaves from 'reduxLeaves'

const initialState = {
  foo: [1, 2, 3, 4, 5]
}

const [reducer, actions] = reduxLeaves(initialState)
const store = createStore(reducer)
```
```js
store.dispatch(actions.foo.create.asArray.filter(e => !(e % 2)))
console.log(store.getState().foo) // [2, 4]
```
Back to:
* [`create.asArray` action creators](#action-creators)
* [all `create` action creators](https://github.com/richardcrng/redux-leaves/tree/master/docs/create#action-creators)

## `create.drop([n = 1])`
**alias: `create.drop([n = 1])`** *(when `initialLeafState` is an array)*

Returns an object that, *when dispatched to a store created with the original state tree*, drops the first `n` elements from the leaf's state.

### Parameters
- `n` *(number, optional)*: the number of elements to drop

### Returns
`action` *(object)*: an object to dispatch to the `store`

### Example
```js
import { createStore } from 'redux'
import reduxLeaves from 'reduxLeaves'

const initialState = {
  foo: ['a', 'b', 'c']
  bar: ['a', 'b', 'c']
}

const [reducer, actions] = reduxLeaves(initialState)
const store = createStore(reducer)
```
#### No argument provided
```js
store.dispatch(actions.foo.create.asArray.drop())
console.log(store.getState().foo) // ['b', 'c']
```
#### Providing an argument
```js
store.dispatch(actions.bar.create.asArray.drop(2))
console.log(store.getState().bar) // ['c']
```
Back to:
* [`create.asArray` action creators](#action-creators)
* [all `create` action creators](https://github.com/richardcrng/redux-leaves/tree/master/docs/create#action-creators)

## `create.push(element, [index = -1], [replace = false])`
**alias: `create.push(element, [index = -1], [replace = false])`** *(when `initialLeafState` is an array)*

Returns an object that, *when dispatched to a store created with the original state tree*, non-mutatively pushes `element` to the leaf's state at index `index`. If `replace === true`, then `element` replaces the existing element with that index.

### Parameters
- `element` *(any)*: the element to insert to the leaf's state
- `index` *(integer, optional)*: the index of the array where `element` should be inserted
- `replace` *(boolean, optional)*: whether or not `element` should replace the current `index`<sup>th</sup> element

### Returns
`action` *(object)*: an object to dispatch to the store

### Example
```js
import { createStore } from 'redux'
import reduxLeaves from 'reduxLeaves'

const initialState = {
  foo: [1, 2, 3]
  bar: [1, 2, 3]
  foobar: [1, 2, 3]
}

const [reducer, actions] = reduxLeaves(initialState)
const store = createStore(reducer)
```
#### Providing element
```js
store.dispatch(actions.foo.create.asArray.push(4))
console.log(store.getState().foo) // [1, 2, 3, 4]
```
#### Providing element and index
```js
store.dispatch(actions.bar.create.asArray.push(4, 0))
console.log(store.getState().bar) // [4, 1, 2, 3]
```
#### Providing element, index and replace
```js
store.dispatch(actions.foobar.create.asArray.push(4, 0, true))
console.log(store.getState().foobar) // [4, 2, 3]
```
Back to:
* [`create.asArray` action creators](#action-creators)
* [all `create` action creators](https://github.com/richardcrng/redux-leaves/tree/master/docs/create#action-creators)