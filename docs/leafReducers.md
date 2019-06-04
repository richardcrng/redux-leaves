---
id: leaf-reducers
title: Leaf Reducers
hide_title: true
sidebar_label: Leaf reducers
---

# Leaf reducers

A leaf reducer is a function or configuration object that updates the state of an arbitrary [leaf](leaf/README.md) in your state tree.

They are:
- passed into [`reduxLeaves`](README.md) with a unique `creatorKey` as part of [`reducersDict`](README.md#reducersdict); and
- triggered at an arbitrary leaf only by dispatching an action created by the leaf's [`create[creatorKey]`](create/README.md) method.

## Syntax

### Function (shorthand)
```js
const shorthandFunction = (leafState, action, treeState) => {
  // some logic here
  // return the new leafState
}
```

### Configuration object (longhand)
The above leafReducer function is shorthand for a configuration object with presets:
```js
const longhandConfig = {
  reducer: shorthandFunction,

  // below are the configuration keys and their default values

  argsToPayload: firstArgOnly => firstArgOnly,
  // by default, if the action creator is invoked with arguments,
  //  the first argument only becomes the action's payload property.

  mutate: false,
  // if true, wraps the reducer in immer's produce function
  //  use this if your reducer is intended to update state
  //  not with a return value, but by 'mutating' the state
}
```

Using the configuration object longhand allows greater customisation, through additional [configuration keys](#configuration-keys).

## Configuration keys

The list of configuration keys that can be provided are below:

| Key | Value (type) | Description | Optional? | 
| --- | --- | --- | --- |
| [`reducer`](#reducer) | function | Updates the leaf's state | |
| [`argsToPayload`](#argstopayload) | function | Converts action creator arguments to an action payload | Optional |
| [`actionType`](#actiontype) | string / function | A string constant, or a function that returns a string, that becomes the action's `type` property | Optional |
| [`mutate`](#mutate) | boolean | If true, wraps `reducer` in [`immer`'s `produce`](https://github.com/immerjs/immer) | Optional |

### `reducer`
*(function)*: Updates the leaf's state.

#### Arguments
- `leafState` *(any)*: the current state of the given leaf
- `action` *(object)*: the action created
- `treeState` *(object)*: the current state of the entire Redux store

#### Returns
The new state value for the leaf.

### `argsToPayload`
*(function, optional)*: Converts action creator arguments to an action payload.

**Default behaviour:** if a first argument is provided, it is supplied as the action's payload. All other arguments are discarded.

#### Arguments
- `...args`: the arguments supplied to an action creator that triggers [`reducer`](#reducer)

#### Returns
A `payload` used by the action creator.

#### Examples
```js
// Action payload is the first argument only (default behaviour)
const firstArgToPayload = firstArgOnly => firstArgOnly

// Action payload as an array of the first 5 arguments
const firstFiveArgsToPayload = (...args) => args.slice(0, 5)

// Action payload as an object
const spreadArgsToObjectPayload = (first, second, ...rest) => ({ first, second, rest })
```

We can check that these are behaving as expected:
```js
// Test them out by creating actions using reduxLeaves
const returnPayload = (leafState, { payload }) => payload
[
  firstArgToPayload,
  firstFiveArgsToPayload,
  spreadArgsToObjectPayload
].forEach(argsToPayload => {
  // Use each as an argsToPayload
  const returnPayload = {
    reducer: (leafState, { payload }) => payload,
    argsToPayload
  }
  const [reducer, actions] = reduxLeaves({}, { returnPayload })
  // log out the payload for an action passed seven arguments
  console.log(actions.create.returnPayload(1, 2, 3, 4, 5, 6, 7).payload)
})

// 1
// [1, 2, 3, 4, 5]
// { first: 1, second: 2, rest: [3, 4, 5, 6, 7] }
```

### `actionType`
*(string | function, optional)*: A string constant, or a function that returns a string, that becomes the action's `type` property

**Default behaviour:** if a first argument is provided, it is supplied as the action's payload. All other arguments are discarded.

#### Arguments
- `leaf`: the [`leaf` property](leaf/standardActions.md#properties) of the [Leaf Standard Action](leaf/standardActions.md) being created
- `payload`: the `payload` property of the Leaf Standard Action being created

#### Returns
A `type` property for the created action.

#### Examples
```js
let argsToPayload

// Default behaviour: action payload is the first argument only
argsToPayload = firstArgOnly => firstArgOnly

// Payload as an array of the first 5 arguments
argsToPayload = (...args) => args.slice(0, 5)

// Payload as an object
argsToPayload = (first, second, ...rest) => ({ first, second, rest })
```

### `mutate`
*(boolean, optional)*: If true, wraps `reducer` in [`immer`'s `produce`](https://github.com/immerjs/immer)

**Default value:** `false`

#### When to set to `true`
It is necessary to set `mutate` to `true` *only* if:
- `reducer` 'mutates'<sup>1</sup> `leafState`; *and*
- You wish to update `leafState` to its new, 'mutated' value; *and*
- You do not `return` the 'mutated' value of `leafState` in `reducer`.

<sup>1</sup> `reduxLeaves` uses `produce` at a prior point to prevent mutation of global state, so you are never *actually* mutating `leafState`.


#### Examples
```js
const setPropTrue = {
  reducer: (leafState, { payload }) => {
    leafState[payload] = true
  },
  mutate: true
  // Set mutate true as reducer satisfies all three conditions:
  //  1. We are 'mutating' leafState by setting a property
  //  2. We wish to update leafState by updating its property
  //  3. We are not `return`ing within the `reducer` function
}

// Test it out
const [reducer, actions] = reduxLeaves({}, { setPropTrue })
const store = createStore(reducer)

store.getState() // => {}
store.dispatch(actions.create.setPropTrue('foobar'))
store.getState() // => { foobar: true }
```