# create.asArray

Every single leaf on our `actions` object has access to `create.asArray` methods.

If the leaf was initialised with array state, then these methods are also accessible directly through the [`create` API](https://github.com/richardcrng/redux-leaves/tree/master/docs/create).

If the current `leafState` is *not* an array, then it is first coerced into an array via lodash's [`_.toArray(leafState)`](https://lodash.com/docs/4.17.11#toArray) method, before the state is updated according to the action dispatched.

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

const reducer = reduxLeaves(initialState)
const store = createStore(reducer)
```
```js
store.dispatch(actions.foocreate.concat(['a', 'b', 'c']))
console.log(store.getState().foo) // [1, 2, 3, 'a', 'b', 'c']
```