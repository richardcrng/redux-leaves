---
id: leaf-reducers
title: Leaf Reducers
hide_title: true
sidebar_label: Leaf reducers
---

# Leaf reducers

A leaf reducer is a function or configuration object that updates the state of an arbitrary leaf in your state tree.

They are:
- passed into [`riduce`](../README.md) with a unique [`creatorKey`](creatorKeys.md) as part of [`reducersDict`](README.md#reducersdict); and
- triggered at an arbitrary leaf only by dispatching an action created by the leaf's [`create[creatorKey]`](create.md#createcreatorkey) method.

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
}
```

Using the configuration object longhand allows greater customisation, through additional [configuration keys](#configuration-keys).

## Configuration keys

The list of configuration keys that can be provided are below:

| Key | Value (type) | Description | Optional? | 
| --- | --- | --- | --- |
| [`reducer`](#reducer) | function | Updates the leaf's state | |
| [`argsToPayload`](#argstopayload) | function | Converts action creator arguments to an action payload | Optional |

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
// Test them out by creating actions using riduce
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
  const [reducer, actions] = riduce({}, { returnPayload })
  // log out the payload for an action passed seven arguments
  console.log(actions.create.returnPayload(1, 2, 3, 4, 5, 6, 7).payload)
})

// 1
// [1, 2, 3, 4, 5]
// { first: 1, second: 2, rest: [3, 4, 5, 6, 7] }
```