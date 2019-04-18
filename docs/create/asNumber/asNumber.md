# create.asNumber

Every single leaf on our `actions` object has access to `create.asNumber` methods.

If the leaf was initialised with number state, then these methods are also accessible directly through the [`create` API](create.md).

If the current `leafState` is *not* a number, then it is first coerced into an array via lodash's [`_.toNumber(leafState)`](https://lodash.com/docs/4.17.11#toNumber) method, before the state is updated according to the action dispatched.

### Action creators
- [`create.asNumber.increment([n = 1])`](#createasnumberincrementn--1)

[Back to all `create` action creators](create.md#action-creators)

## `create.asNumber.increment([n = 1])`
**alias: `create.increment([n = 1])`** *(when `initialLeafState` is a number)*

Returns an object that, *when dispatched to a store created with the original state tree*, increments leaf's state by `n`.

### Parameters
- `n` *(number)*: the number to increment the leaf's state by

### Returns
`action` *(object)*: an object to dispatch to the store

### Example
```js
import { createStore } from 'redux'
import reduxLeaves from 'reduxLeaves'

const initialState = {
  foo: 5
  bar: 5
}

const [reducer, actions] = reduxLeaves(initialState)
const store = createStore(reducer)
```
#### No argument provided
```js
store.dispatch(actions.foo.create.asNumber.increment())
console.log(store.getState().foo) // 6
```
#### Providing an argument
```js
store.dispatch(actions.bar.create.asNumber.increment(-6))
console.log(store.getState().bar) // -1
```
Back to:
* [`create.asNumber` action creators](#action-creators)
* [all `create` action creators](create.md#action-creators)