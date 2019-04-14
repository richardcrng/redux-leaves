# redux-leaves

Manage every leaf of your state tree with *pleasure*, *precision* and *predictability*.

## 30 second demo

### 1. Pleasingly little boilerplate

```bash
npm install --save richardcrng/redux-leaves#master
```

```js
import { createStore } from 'redux'
import reduxLeaves from 'redux-leaves'

const initialState = {
  counter: 1,
  foo: ["foo"],
  nested: {
    deep: {},
    state: {
      manageable: "I hope so"
    }
  }
}

const reducer = reduxLeaves(initialState) // sets up a reducer for your initial state shape
const store = createStore(reducer)
```

### 2. Precise updates

```js
// All these action creators, and more, come with our reducer for free:

store.dispatch(reducer.counter.increment())
store.dispatch(reducer.foo.push("bar"))
store.dispatch(reducer.nested.state.deep.set('arbitrarily', true))
store.dispatch(reducer.nested.state.manageable.apply(state => state.replace("hope", "*KNOW*")))
```

### 3. Predictable changes
```js
// store.getState()
{
  counter: 2,
  foo: ["foo", "bar"],
  nested: {
    deep: {
      arbitrarily: true
    },
    state: {
      manageable: "I *KNOW* so"
    }
  }
}
```

## Motivation

### Problem

I have found that [Redux](https://redux.js.org/) and [Redux DevTools](https://github.com/zalmoxisus/redux-devtools-extension) both work great for following what is happening in your app.<sup>1</sup>

However, there are three pain points that I encountered:

1. **Ugly boilerplate maintenance**: one more slice of state =  another load of action types, creators and reducers to write.
2. **Unhelpfully named constants**: what was `NONTRIVIAL_THING_HAPPENED` meant to do, again...?
3. **Repetitive reducer logic**: an action that updates some slice of state to true? *How novel!*

<sup>1</sup> *cf. what you* intended *to happen in your app...*

### Solution

`redux-leaves` is a library that is written to provide:

1. **Pleasingly little boilerplate**: set up reducer, action types and creators in one line
```js
const reducer = reduxLeaves(initialState)
```

2. **Precise updates**: easily increment that counter, no matter how deeply you nested it
```js
dispatch(reducer.distressingly.and.foolishly.deeply.nested.counter.increment(2))
```
3. **Predictable changes**: understand exactly what's happening with clear and consistently named action types:
```js
// action type dispatched above:
"distressingly/and/foolishly/deeply/nested/counter/INCREMENT"
``` 

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
  foo: ["bar"]                  // leaf
  nested: {                     // branch
    deep: {}                    // leaf: empty object
    state: {                    // branch
      manageable: "maybe...?"   // leaf
    }
  }
}

const reducer = reduxLeaves(initialState)
const store = createStore(reducer)
```

## branch

## leaf

Returns a reducer function that is responsible for a granular piece of state (boolean, string, array or object).

Every reducer leaf has the following action creators attached:

### `leaf.apply(callback)`

Returns an object that, *when dispatched to a store created with the original state tree*, updates the leaf's state to the return value of `callback(leafState)`.

#### Parameters
- `callback` *(function)*: invoked by the leaf's reducer with the leaf's current state

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
  bool: false,
  num: 2,
  str: "foo",
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
console.log(store.getState().str) // "FOO"
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
  str: "foo",
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

### `leaf.drop(n)`

### `leaf.increment(n)`

### `leaf.off()`

### `leaf.on()`

### `leaf.push(element)`

### `leaf.reset()`

### `leaf.set(path, value)`

### `leaf.toggle()`

### `leaf.update(value)`