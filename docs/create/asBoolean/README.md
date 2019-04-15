# create.asBoolean

Every single leaf on our `actions` object has access to `create.asBoolean` methods.

If the leaf was initialised with boolean state, then these methods are also accessible directly through the [`create` API](https://github.com/richardcrng/redux-leaves/tree/master/docs/create).

If the current `leafState` is *not* a boolean, then it is first coerced into a boolean as `!!leafState`, before the state is updated according to the action dispatched.

## `create.asBoolean.off()`
**alias: `create.off()`** *(when `initialLeafState` is a boolean)*

Returns an object that, *when dispatched to a store created with the original state tree*, updates the leaf's state to `false`.

### Returns
`action` *(object)*: an object to dispatch to the store

### Example
```js
import { createStore } from 'redux'
import reduxLeaves from 'reduxLeaves'

const initialState = {
  foo: true
  bar: false
}

const reducer = reduxLeaves(initialState)
const store = createStore(reducer)
```
```js
store.dispatch(actions.foo.create.asBoolean.off())
console.log(store.getState().foo) // false
```
```js
store.dispatch(actions.bar.create.asBoolean.off())
console.log(store.getState().bar) // false
```

## `create.asBoolean.on()`
**alias: `create.on()`** *(when `initialLeafState` is a boolean)*

Returns an object that, *when dispatched to a store created with the original state tree*, updates the leaf's state to `true`.

### Returns
`action` *(object)*: an object to dispatch to the store

### Example
```js
import { createStore } from 'redux'
import reduxLeaves from 'reduxLeaves'

const initialState = {
  foo: true
  bar: false
}

const reducer = reduxLeaves(initialState)
const store = createStore(reducer)
```
```js
store.dispatch(actions.foo.create.asBoolean.on())
console.log(store.getState().foo) // true
```
```js
store.dispatch(actions.bar.create.asBoolean.on())
console.log(store.getState().bar) // true
```

## `create.toggle()`
**alias: `create.toggle()`** *(when `initialLeafState` is a boolean)*

Returns an object that, *when dispatched to a store created with the original state tree*, updates the leaf's state to `!leafState`.

### Returns
`action` *(object)*: an object to dispatch to the store

### Example
```js
import { createStore } from 'redux'
import reduxLeaves from 'reduxLeaves'

const initialState = {
  foo: true
  bar: false
}

const reducer = reduxLeaves(initialState)
const store = createStore(reducer)
```
```js
store.dispatch(actions.foo.create.asBoolean.toggle())
console.log(store.getState().foo) // false
```
```js
store.dispatch(actions.bar.create.asBoolean.toggle())
console.log(store.getState().bar) // true
```