# create.asObject

Every single leaf on our `actions` object has access to `create.asObject` methods.

If the leaf was initialised with [plain object](https://lodash.com/docs/4.17.11#isPlainObject) state, then these methods are also accessible directly through the [`create` API](https://github.com/richardcrng/redux-leaves/tree/master/docs/create).

If the current `leafState` is *not* an array, then it is first coerced into an array via lodash's [`_.toPlainObject(leafState)`](https://lodash.com/docs/4.17.11#toPlainObject) method, before the state is updated according to the action dispatched.

## `create.asObject.set(path, value)`
**alias: `create.push(element, [index = -1], [replace = false])`** *(when `initialLeafState` is a [plain object](https://lodash.com/docs/4.17.11#toPlainObject))*

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
store.dispatch(actions.foo.bar.create.asObject.set('accessed', true))
console.log(store.getState().foo.bar) // { accessed: true }
```
```js
store.dispatch(actions.foobar.create.asObject.set('failed', false))
console.log(store.getState().foobar) // { failed: false }
```