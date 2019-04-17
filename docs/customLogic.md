# Custom action creators via `customLogic`

The [`create` API](https://github.com/richardcrng/redux-leaves/tree/master/docs/create) comes with several action creators, which our initialised `reducer` already knows how to respond to.

However, perhaps we want to initialise with a custom action creator and reducer logic.

This is what the `customLogic` object is for, passed in as a second (optional) argument to [`reduxLeaves`](https://github.com/richardcrng/redux-leaves/tree/master/docs).

- [Shape of `customLogic`](#shape-of-customlogic)
  - [Function shorthand](#function-shorthand)
  - [Object longhand](#object-longhand)
- [Example 1: custom action creator with no arguments](#example-1-custom-action-creator-with-no-arguments)
- [Example 2: custom action creator using `payload` and `wholeState`](#example-2-custom-action-creator-using-payload-and-wholestate)
- [Example 3: more detailed customisation with `argsToPayload`](#example-3-more-detailed-customisation-with-argstopayload)


## Shape of `customLogic`

### Function shorthand

`customLogic` is an object which, at its simplest, is `key`-`value` pairings where:
- `key`: the name of the custom action creator,
- `value` *(function)*: updates the leaf state to its return value, invoked with `leafState`, `{ payload }` and `wholeState`.

For example:
```js
const customLogic = {
  incrementByTwo: leafState => leafState + 2,
  decrementBy: (leafState, { payload }) => leafState - payload
}
```

This enables us to create actions for a given leaf in the following way:
```js
const { create } = actions.path.to.leaf

const incByTwoAction = create.custom.incrementByTwo()
const decrementByThreeAction = create.custom.decrementBy(3) // 3 becomes the action payload
```

### Object longhand

The notation above is shorthand for the following:

```js
const customLogic = {
  incrementByTwo: {
    reducer: leafState => leafState + 2
  },
  decrementBy: {
    reducer: (leafState, { payload }) => leafState - payload
  }
}

// create.custom.decrementBy(4, 5) will have a payload of 9
```

Using longhand lets us customise further, e.g.:

```js
const customLogic = {
  decrementBySumOf: {
    argsToPayload: (first, second) => first + second,
    reducer: (leafState, { payload }) => leafState - payload
  }
}
```
Every logic object can have the following properties:
- `reducer` *(function)*: updates the leaf state to its return value, invoked with `leafState`, `{ payload }` and `wholeState`
- `argsToPayload` *(function, optional)*: takes the arguments passed to the action creator such that its return value becomes the action payload
- `type` *(string, optional)*: overrides the default `reduxLeaves`-generated action type (but does not affect reducer behaviour - the effect is only for Redux DevTools debugging)

We can mix and match shorthand and longhand:

```js
const customLogic = {
  incrementByTwo: leafState => leafState + 2,
  decrementBySumOf: {
    argsToPayload: (first, second) => first + second,
    reducer: (leafState, { payload }) => leafState - payload
  }
}
```

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

When we define custom reducer logic to pass to `reduxLeaves`, by default the custom action creators accept one argument, which becomes the action payload.

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

## Example 3: more detailed customisation with `argsToPayload` and `type`

We can achieve greater customisation of our actions using the [object longhand](#object-longhand) for our `customLogic`.

Suppose we want to implement a custom `remove` action creator such that it takes an arbitrary number of arguments and, when dispatched, removes all of them from the leaf state.

Let's assume that we also want this to be flagged up in a very obvious way, in Redux DevTools, by giving it some (unsightly) action type, such as `!!! HEY THERE, I DID A THING !!!`.

```js
import { createStore } from 'redux'
import reduxLeaves from 'reduxLeaves'

const initialState = {
  foo: [2, 4, 6, 8, 10]
}
const customLogic = {
  remove: {
    argsToPayload: (...values) => values,
    reducer: (leafState, { payload }) => leafState.filter(e => !payload.includes(e))
    type: '!!! HEY THERE, I DID A THING !!!'
  }
}

const [reducer, actions] = reduxLeaves(initialState, customLogic)
const store = createStore(reducer)
```

Here, instead of passing in `remove` as a function, we have passed it in as an object with the following properties:

- `argsToPayload`: this function receives all the arguments passed to the action creator, and its return value becomes the action `payload`;
- `reducer`: the reducer logic, invoked with arguments `leafState`, `{ payload }` and `wholeState` as before.
- `type`: the string constant for Redux DevTools to display. *This doesn't affect the reducer behaviour at all.*

```js
const removeWithOneArg = actions.foo.create.custom.remove(4)
const removeWithTwoArgs = actions.foo.create.custom.remove(4, 8)

console.log(removeWithOneArg.payload)   // [4]
console.log(removeWithTwoArgs.payload)  // [4, 8]

console.log(removeWithTwoArgs.type)     // !!! HEY THERE, I DID A THING !!!

store.dispatch(removeWithTwoArgs)
console.log(store.getState().foo)   // [2, 6, 10]
```