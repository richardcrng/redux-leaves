# Custom action creators

The [`create` API](https://github.com/richardcrng/redux-leaves/tree/master/src/docs/create) comes with several action creators, which our initialised `reducer` already knows how to respond to.

However, perhaps we want to initialise with a custom action creator and reducer logic.

This is what the `customLogic` object is for.

## Shape of `customLogic`

`customLogic` is an object

## Example 1: custom action creator with no arguments

Let's start with the shape of our app state.

```js
import { createStore } from 'redux'
import reduxLeaves from 'reduxLeaves'

const initialState = {
  foo: 3,
  bar: 4
}
```

Suppose we want to implement a custom action:
- `double`: doubles the value of state at a leaf

To do this, we need to define some custom reducer logic to pass to `reduxLeaves`:

```js
const customLogic = {
  square: leafState => leafState ** 2 // ES6 exponentiation
}
```
We then pass this into `reduxLeaves`:
```js
const [reducer, actions] = reduxLeaves(initialState, customLogic)
const store = createStore(reducer)
```
And now we can access the `square` action creator through the `create.custom` API:
```js
console.log(typeof actions.foo.create.custom.square)  // function
console.log(typeof actions.bar.create.custom.square)  // function
```
Dispatching to the store triggers our custom reducer logic:
```js
store.dispatch(actions.foo.create.custom.square())
console.log(store.getState().foo) // 9

store.dispatch(actions.bar.create.custom.square())
console.log(store.getState().bar) // 16
```

## Example 2: custom action creator using `payload` and `wholeState`

```js
import { createStore } from 'redux'
import reduxLeaves from 'reduxLeaves'

const initialState = {
  foo: 2,
  bar: [2, 4, 6, 8, 10]
}
```

Suppose we want to implement two custom actions:
- `exponentiate`: raises the value of state at a leaf to an exponent received as an argument
- `remove`: removes values from the value of state at a leaf based on a value elsewhere, as indicated by an argument

When we define custom reducer logic to pass to `reduxLeaves`, by default the custom action creators accept one argument, which becomes the action payload.

```js
const customLogic = {
  exponentiate: (leafState, { payload }) => leafState ** payload,
  remove: (leafState, { payload }, wholeState) => leafState.filter(e => e != wholeState[payload])
}

const [reducer, actions] = reduxLeaves(initialState, customLogic)
const store = createStore(reducer)

// Testing that the action creators take only the first argument to be the payload:

const expWithOneArg = actions.foo.create.custom.exponentiate(2)
const expWithTwoArgs = actions.foo.create.custom.exponentiate(3, 4)

console.log(expWithOneArg.payload)    // 2
console.log(expWithTwoArgs.payload)   // 3 (4 has been discarded)

store.dispatch(expWithTwoArgs)
console.log(store.getState().foo)   // 8

store.dispatch(actions.barr.create.custom.remove("foo"))
console.log(store.getState().bar)   // [2, 4, 6, 10] <- state.foo, 8, removed
```