---
id: leaf-reducers
title: Leaf Reducers
hide_title: true
sidebar_label: Leaf reducers
---

# Leaf reducers

A leaf reducer is a function or configuration object that updates the state of an arbitrary leaf in your state tree.


## As a function
```js
const leafReducer = (leafState, action, treeState) => {
  // some logic here
  // return the new leafState
}
```

## As a configuration object
The above leafReducer function is shorthand for the following configuration object:
```js
const leafReducer = {
  reducer: (leafState, action, treeState) => {
    // some logic here
    // return the new leafState
  }
}
```

The list of configuration options that can be provided are below:

| Key | Value |  |
| --- | --- | -- |
| [`reducer`](#reducer) | function | |
| [`argsToPayload`](#argstopayload) | function | *(optional)* |

### `reducer`
A *function* that takes in the leaf's current state and returns its new state.

#### Arguments
- `leafState` *(any)*: the current state of the given leaf
- `action` *(object)*: the action created
- `treeState` *(object)*: the current state of the entire Redux store

#### Returns
The new state value for the leaf.

### `argsToPayload`

#### Arguments
- `...args` *(...any)*: the arguments supplied to an action creator that triggers [`reducer`](#reducer)

#### Returns
A `payload` used by the action creator.

#### Default
If a first argument is provided, it is supplied as the action's payload. All other arguments are discarded.
```js
const argsToPayload = (first, ...rest) => first
```

## Example
```js
const leafReducer = {
  argsToPayload: (...args) => {
    // some logic here
    // return an action payload
  },
  reducer: (leafState, action, treeState) => {
    // some logic here
    // return the new leafState
  }
}
```