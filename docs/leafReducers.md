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
const leafReducer = (leafState, action, treeState) => {
  // some logic here
  // return the new leafState
}
```

### Configuration object (longhand)
The above leafReducer function is shorthand for the following configuration object:
```js
const leafReducer = {
  reducer: (leafState, action, treeState) => {
    // some logic here
    // return the new leafState
  }
}
```

Using the configuration object longhand allows greater customisation, through additional [configuration keys](#configuration-keys).

## Configuration keys

The list of configuration keys that can be provided are below:

| Key | Value | Description | Optional? | 
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

```js
const argsToPayload = (first, ...rest) => first
```

#### Arguments
- `...args` *(...any)*: the arguments supplied to an action creator that triggers [`reducer`](#reducer)

#### Returns
A `payload` used by the action creator.

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