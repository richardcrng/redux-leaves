# Action creators API

Every single leaf on our `actions` object has a `create` property, through which we can access action creator functions.

The actions immediately accessible through `create` depends on the data type at that leaf in the `initialState` passed to `reduxLeaves`.


## `create.apply(callback)`
***(`initialLeafState`: any)***

Returns an object that, *when dispatched to a store created with the original state tree*, updates the leaf's state to the return value of `callback(leafState, entireState)`.

### Parameters
- `callback` *(function)*: invoked by the leaf's reducer with the leaf's current state

### Returns
`action` *(object)*: an object to dispatch to the `store`

### Example
```js
import { createStore } from 'redux'
import reduxLeaves from 'reduxLeaves'

const initialState = {
  bool: false,
  num: 2,
  str: 'foo',
  arr: [1, 2, 3],
  obj: {}
}

const reducer = reduxLeaves(initialState)
const store = createStore(reducer)
```
#### bool
```js
store.dispatch(actions.boolcreate.apply(state => !state))
console.log(store.getState().bool) // true
```
#### num
```js
store.dispatch(actions.numcreate.apply(state => state * 3))
console.log(store.getState().num) // 6
```
#### str
```js
store.dispatch(actions.strcreate.apply(state => state.toUpperCase()))
console.log(store.getState().str) // 'FOO'
```
#### arr
```js
store.dispatch(actions.arrcreate.apply(state => state.reverse()))
console.log(store.getState().arr) // [3, 2, 1]
```
#### obj
```js
store.dispatch(actions.objcreate.apply(state => { ...state, a: 1, b: 2 }))
console.log(store.getState().obj) // { a: 1, b: 2 }
```

## `create.clear([toNull = false])`
***(`initialLeafState`: any)***

Returns an object that, *when dispatched to a store created with the original state tree*, clears the leaf's state.

If `toNull === true`, then it updates it to true, otherwise it follows the type of the leaf's initial state:
- *number*: `0`
- *string*: `''`
- *boolean*: `false`
- *array*: `[]`
- *object*: `{}`

### Parameters
- `toNull` *(boolean, optional)*: defaults to `false`

### Returns
`action` *(object)*: an object to dispatch to the `store`

### Example
```js
import { createStore } from 'redux'
import reduxLeaves from 'reduxLeaves'

const initialState = {
  bool: true,
  num: 2,
  str: 'foo',
  arr: [1, 2, 3],
  obj: {}
}

const reducer = reduxLeaves(initialState)
const store = createStore(reducer)
```
#### bool
```js
store.dispatch(actions.boolcreate.clear(true))
console.log(store.getState().bool) // null

store.dispatch(actions.boolcreate.clear())
console.log(store.getState().bool) // false
```
#### num
```js
store.dispatch(actions.numcreate.clear(true))
console.log(store.getState().num) // null

store.dispatch(actions.numcreate.clear())
console.log(store.getState().num) // 0
```
#### str
```js
store.dispatch(actions.strcreate.clear(true))
console.log(store.getState().str) // null

store.dispatch(actions.strcreate.clear())
console.log(store.getState().str) // ''
```
#### arr
```js
store.dispatch(actions.arrcreate.clear(true))
console.log(store.getState().arr) // null

store.dispatch(actions.arrcreate.clear())
console.log(store.getState().arr) // []
```
#### obj
```js
store.dispatch(actions.objcreate.clear(true))
console.log(store.getState().obj) // null

store.dispatch(actions.objcreate.clear())
console.log(store.getState().obj) // {}
```

## `create.concat(...strings)`
***(`initialLeafState`: string)***

Returns an object that, *when dispatched to a store created with the original state tree*, updates the leaf's state by concatening it with `strings`.

### Parameters
- `...strings` *(string)*: the strings to concatenate

### Returns
`action` *(object)*: an object to dispatch to the store

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
store.dispatch(actions.foo.create.concat(['a', 'b', 'c']))
console.log(store.getState().foo) // [1, 2, 3, 'a', 'b', 'c']
```

## `create.increment([n = 1])`
***(`initialLeafState`: number)***

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

const reducer = reduxLeaves(initialState)
const store = createStore(reducer)
```
#### No argument provided
```js
store.dispatch(actions.foo.create.increment())
console.log(store.getState().foo) 6
```
#### Providing an argument
```js
store.dispatch(actions.bar.create.increment(-6))
console.log(store.getState().bar) // -1
```

## `create.reset()`
***(`initialLeafState`: any)***

Returns an object that, *when dispatched to a store created with the original state tree*, resets the leaf's state to its initial state stored in the actions.

### Returns
`action` *(object)*: an object to dispatch to the store

### Example
```js
import { createStore } from 'redux'
import reduxLeaves from 'reduxLeaves'

const initialState = {
  bool: true,
  num: 2,
  str: 'foo',
  arr: [1, 2, 3],
  obj: {}
}

const otherState = {
  bool: false,
  num: 11,
  str: 'bar',
  arr: ['a', 'b', 'c'],
  obj: { property: true }
}

const reducer = reduxLeaves(initialState)
const store = createStore(reducer, otherState)

/* store.getState()
* {
*   bool: false,
*   num: 11,
*   str: 'bar',
*   arr: ['a', 'b', 'c'],
*   obj: { property: true }
* }
*/

```
#### bool
```js
store.dispatch(actions.bool.create.reset())
console.log(store.getState().bool) // true
```
#### num
```js
store.dispatch(actions.num.create.reset())
console.log(store.getState().num) // 2
```
#### str
```js
store.dispatch(actions.str.create.reset())
console.log(store.getState().str) // 'foo'
```
#### arr
```js
store.dispatch(actions.arr.create.reset())
console.log(store.getState().arr) // [1, 2, 3]
```
#### obj
```js
store.dispatch(actions.obj.create.reset())
console.log(store.getState().obj) // {}
```

## `create.update(value)`
***(`initialLeafState`: any)***

Returns an object that, *when dispatched to a store created with the original state tree*, updates the leaf's state to `value`.

### Parameters
- `value` *(any)*: the new value for the leaf's state

### Returns
`action` *(object)*: an object to dispatch to the store

### Example
```js
import { createStore } from 'redux'
import reduxLeaves from 'reduxLeaves'

const initialState = {
  bool: false,
  num: 2,
  str: 'foo',
  arr: [1, 2, 3],
  obj: {}
}

const reducer = reduxLeaves(initialState)
const store = createStore(reducer)
```
```js
store.dispatch(actions.bool.create.update("I can put anything here"))
console.log(store.getState().bool) // 'I can put anything here'
```