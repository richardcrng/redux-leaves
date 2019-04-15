# create.asArray

Every single leaf on our `actions` object has access to `create.asArray` methods, even if leaf's `initialState` (as passed into `reduxLeaves`), was not an array.

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