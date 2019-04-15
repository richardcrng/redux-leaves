# API

## `reduxLeaves(initialState)`

Returns a reducer function bundled with action creators at every [branch](#branch) and [leaf](#leaf).

- Every non-empty object is treated as a reducer branch, with branches or leaves beneath it.
- Every other value is treated as a reducer leaf.

### Parameters
- `initialState` *(object)*: the initial state shape for the reducer to use

### Returns
`function(state, action)`: A reducer function intended for redux's `createStore()`.

### Example
```js
import { createStore } from 'redux'
import reduxLeaves from 'reduxLeaves'

const initialState = {
  counter: 1,                   // leaf
  foo: ['bar']                  // leaf
  nested: {                     // branch
    deep: {}                    // leaf: empty object
    state: {                    // branch
      manageable: 'maybe...?'   // leaf
    }
  }
}

const reducer = reduxLeaves(initialState)
const store = createStore(reducer)
```

## branch

## leaf

Returns a reducer function that is responsible for a granular piece of state (*boolean*, *string*, *array* or *object*).

Every reducer leaf has the following action creators attached:

### `leaf.apply(callback)`

Returns an object that, *when dispatched to a store created with the original state tree*, updates the leaf's state to the return value of `callback(leafState)`.

#### Parameters
- `callback` *(function)*: invoked by the leaf's reducer with the leaf's current state

#### Returns
`action` *(object)*: an object with properties:
- `leaf` *(object)*: an object with properties:
  - `path` *(array)*: path to the leaf,
  - `action` *(string)*: `'APPLY'`
- `type` *(string)*
- `payload` *(function)*: the callback provided

#### Example
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
##### bool
```js
store.dispatch(reducer.bool.apply(state => !state))
console.log(store.getState().bool) // true
```
##### num
```js
store.dispatch(reducer.num.apply(state => state * 3))
console.log(store.getState().num) // 6
```
##### str
```js
store.dispatch(reducer.str.apply(state => state.toUpperCase()))
console.log(store.getState().str) // 'FOO'
```
##### arr
```js
store.dispatch(reducer.arr.apply(state => state.reverse()))
console.log(store.getState().arr) // [3, 2, 1]
```
##### obj
```js
store.dispatch(reducer.obj.apply(state => { ...state, a: 1, b: 2 }))
console.log(store.getState().obj) // { a: 1, b: 2 }
```

### `leaf.clear([toNull = false])`

Returns an object that, *when dispatched to a store created with the original state tree*, clears the leaf's state.

If `toNull === true`, then it updates it to true, otherwise it follows the type of the leaf's initial state:
- *number*: `0`
- *string*: `''`
- *boolean*: `false`
- *array*: `[]`
- *object*: `{}`

#### Parameters
- `toNull` *(boolean, optional)*: defaults to `false`

#### Returns
`action` *(object)*: an object with properties:
- `leaf` *(string)*
- `type` *(string)*
- `payload` *(boolean)*: the value of `toNull`

#### Example
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
##### bool
```js
store.dispatch(reducer.bool.clear(true))
console.log(store.getState().bool) // null

store.dispatch(reducer.bool.clear())
console.log(store.getState().bool) // false
```
##### num
```js
store.dispatch(reducer.num.clear(true))
console.log(store.getState().num) // null

store.dispatch(reducer.num.clear())
console.log(store.getState().num) // 0
```
##### str
```js
store.dispatch(reducer.str.clear(true))
console.log(store.getState().str) // null

store.dispatch(reducer.str.clear())
console.log(store.getState().str) // ''
```
##### arr
```js
store.dispatch(reducer.arr.clear(true))
console.log(store.getState().arr) // null

store.dispatch(reducer.arr.clear())
console.log(store.getState().arr) // []
```
##### obj
```js
store.dispatch(reducer.obj.clear(true))
console.log(store.getState().obj) // null

store.dispatch(reducer.obj.clear())
console.log(store.getState().obj) // {}
```

### `leaf.concat(...values)`

Returns an object that, *when dispatched to a store created with the original state tree*, updates the leaf's state by concatening it with `values`.

(This uses lodash's [`_.concat(array, [values])`](https://lodash.com/docs/4.17.11#concat), where `array` is `leafState`.)

#### Parameters
- `values` *(...\*)*: the values to concatenate

#### Returns
`action` *(object)*: an object with properties:
- `leaf` *(string)*
- `type` *(string)*
- `payload` *(function)*: the callback provided

#### Example
```js
import { createStore } from 'redux'
import reduxLeaves from 'reduxLeaves'

const initialState = {
  foo: ['a', 'b', 'c']
  bar: ['a', 'b', 'c']
}

const reducer = reduxLeaves(initialState)
const store = createStore(reducer)
```
##### Passing multiple values
```js
store.dispatch(reducer.foo.concat(1, 2, 3))
console.log(store.getState().foo) // ['a', 'b', 'c', 1, 2, 3]
```
##### Passing a single array
```js
store.dispatch(reducer.bar.concat([1, 2, 3]))
console.log(store.getState().bar) // ['a', 'b', 'c', 1, 2, 3]
```

### `leaf.drop([n = 1])`

Returns an object that, *when dispatched to a store created with the original state tree*, drops the first `n` elements from the leaf's state.

#### Parameters
- `n` *(number, optional)*: the number of elements to drop

#### Returns
`action` *(object)*: an object with properties:
- `leaf` *(string)*
- `type` *(string)*
- `payload` *(number)*: the number of elements to drop

#### Example
```js
import { createStore } from 'redux'
import reduxLeaves from 'reduxLeaves'

const initialState = {
  foo: ['a', 'b', 'c']
  bar: ['a', 'b', 'c']
}

const reducer = reduxLeaves(initialState)
const store = createStore(reducer)
```
##### No argument provided
```js
store.dispatch(reducer.foo.drop())
console.log(store.getState().foo) // ['b', 'c']
```
##### Providing an argument
```js
store.dispatch(reducer.bar.drop(2))
console.log(store.getState().bar) // ['c']
```

### `leaf.increment([n = 1])`

Returns an object that, *when dispatched to a store created with the original state tree*, increments leaf's state by `n`.

#### Parameters
- `n` *(number)*: the number to increment the leaf's state by

#### Returns
`action` *(object)*: an object with properties:
- `leaf` *(string)*
- `type` *(string)*
- `payload` *(number)*: the number to increment the leaf's state by

#### Example
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
##### No argument provided
```js
store.dispatch(reducer.foo.increment())
console.log(store.getState().foo) 6
```
##### Providing an argument
```js
store.dispatch(reducer.bar.increment(-6))
console.log(store.getState().bar) // -1
```

### `leaf.off()`

Returns an object that, *when dispatched to a store created with the original state tree*, updates the leaf's state to `false`.

#### Returns
`action` *(object)*: an object with properties:
- `leaf` *(string)*
- `type` *(string)*

#### Example
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
store.dispatch(reducer.foo.off())
console.log(store.getState().foo) // false
```
```js
store.dispatch(reducer.bar.off())
console.log(store.getState().bar) // false
```

### `leaf.on()`

Returns an object that, *when dispatched to a store created with the original state tree*, updates the leaf's state to `true`.

#### Returns
`action` *(object)*: an object with properties:
- `leaf` *(string)*
- `type` *(string)*

#### Example
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
store.dispatch(reducer.foo.on())
console.log(store.getState().foo) // true
```
```js
store.dispatch(reducer.bar.on())
console.log(store.getState().bar) // true
```

### `leaf.push(element, [index = -1], [replace = false])`

Returns an object that, *when dispatched to a store created with the original state tree*, non-mutatively pushes `element` to the leaf's state at index `index`. If `replace === true`, then `element` replaces the existing element with that index.

#### Parameters
- `element` *(any)*: the element to insert to the leaf's state
- `index` *(integer, optional)*: the index of the array where `element` should be inserted
- `replace` *(boolean, optional)*: whether or not `element` should replace the current `index`<sup>th</sup> element

#### Returns
`action` *(object)*: an object with properties:
- `leaf` *(string)*
- `type` *(string)*
- `payload` *(object)*: `{ element, index, replace }`

#### Example
```js
import { createStore } from 'redux'
import reduxLeaves from 'reduxLeaves'

const initialState = {
  foo: [1, 2, 3]
  bar: [1, 2, 3]
  foobar: [1, 2, 3]
}

const reducer = reduxLeaves(initialState)
const store = createStore(reducer)
```
##### Providing element
```js
store.dispatch(reducer.foo.push(4))
console.log(store.getState().foo) // [1, 2, 3, 4]
```
##### Providing element and index
```js
store.dispatch(reducer.bar.push(4, 0))
console.log(store.getState().bar) // [4, 1, 2, 3]
```
##### Providing element, index and replace
```js
store.dispatch(reducer.foobar.push(4, 0, true))
console.log(store.getState().foobar) // [4, 2, 3]
```

### `leaf.reset()`

Returns an object that, *when dispatched to a store created with the original state tree*, resets the leaf's state to its initial state stored in the reducer.

#### Returns
`action` *(object)*: an object with properties:
- `leaf` *(string)*
- `type` *(string)*

#### Example
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
##### bool
```js
store.dispatch(reducer.bool.reset())
console.log(store.getState().bool) // true
```
##### num
```js
store.dispatch(reducer.num.reset())
console.log(store.getState().num) // 2
```
##### str
```js
store.dispatch(reducer.str.reset())
console.log(store.getState().str) // 'foo'
```
##### arr
```js
store.dispatch(reducer.arr.reset())
console.log(store.getState().arr) // [1, 2, 3]
```
##### obj
```js
store.dispatch(reducer.obj.reset())
console.log(store.getState().obj) // {}
```

### `leaf.set(path, value)`

Returns an object that, *when dispatched to a store created with the original state tree*, updates the leaf's state at `path` with `value`.

(This uses lodash's [`_.set(object, path, value)`](https://lodash.com/docs/4.17.11#set), where `object` is `leafState`.)

#### Parameters
- `path` *(array | string)*: the path of the property to set

#### Returns
`action` *(object)*: an object with properties:
- `leaf` *(string)*
- `type` *(string)*
- `payload` *(object)*: `{ path, value }`

#### Example
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
store.dispatch(reducer.foo.bar.set('accessed', true))
console.log(store.getState().foo.bar) // { accessed: true }
```
```js
store.dispatch(reducer.foobar.set('failed', false))
console.log(store.getState().foobar) // { failed: false }
```

### `leaf.toggle()`

Returns an object that, *when dispatched to a store created with the original state tree*, updates the leaf's state to `!leafState`.

#### Returns
`action` *(object)*: an object with properties:
- `leaf` *(string)*
- `type` *(string)*

#### Example
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
store.dispatch(reducer.foo.toggle())
console.log(store.getState().foo) // false
```
```js
store.dispatch(reducer.bar.toggle())
console.log(store.getState().bar) // true
```

### `leaf.update(value)`

Returns an object that, *when dispatched to a store created with the original state tree*, updates the leaf's state to `value`.

#### Parameters
- `value` *(any)*: the new value for the leaf's state

#### Returns
`action` *(object)*: an object with properties:
- `leaf` *(string)*
- `type` *(string)*
- `payload` *(function)*: `value`

#### Example
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
store.dispatch(reducer.bool.update("I can put anything here"))
console.log(store.getState().bool) // 'I can put anything here'
```