# create.asNumber

Every single leaf on our `actions` object has access to `create.asNumber` methods.

If the leaf was initialised with number state, then these methods are also accessible directly through the [`create` API](https://github.com/richardcrng/redux-leaves/tree/master/docs/create).

If the current `leafState` is *not* a number, then it is first coerced into an array via lodash's [`_.toNumber(leafState)`](https://lodash.com/docs/4.17.11#toNumber) method, before the state is updated according to the action dispatched.

## `create.asNumber.set(path, value)`
**alias: `create.set(path, value)`** *(when `initialLeafState` is a [plain object](https://lodash.com/docs/4.17.11#toPlainNumber))*

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

// note: object leaves have to be initialised with empty objects
const initialState = {
  foo: {        // branch
    bar: {}     // leaf
  }
  foobar: {}    // leaf
}

const reducer = reduxLeaves(initialState)
const store = createStore(reducer)
```
```js
store.dispatch(actions.foo.bar.create.asNumber.set('accessed', true))
console.log(store.getState().foo.bar) // { accessed: true }
```
```js
store.dispatch(actions.foobar.create.asNumber.set('failed', false))
console.log(store.getState().foobar) // { failed: false }
```