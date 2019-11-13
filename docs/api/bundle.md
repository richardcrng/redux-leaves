---
id: bundle
title: bundle
hide_title: true
sidebar_label: bundle
---

# `bundle(actions, type?)`

Returns an (action) object that the [reduxLeaves](../README.md) reducer uses to process the individual actions in the `actions` array sequentially (but, through the store, one dispatch).

**See the [30 second demo](intro/demo.md)** for usage.

## Parameters
- `actions` *(object[])*: an array where each element should be an action created through the Redux-Leaves [`create`](create.md) API
- `type` *(string, optional)*: a string that will be the type of the returned action

## Returns
`action` *(object)*: a single object to dispatch to the `store`

## Examples

### Actions array, no type provided
```js
import { createStore } from 'redux'
import reduxLeaves, { bundle } from 'reduxLeaves'

const initialState = {
  counter: 0,
  list: ['a']
}

const [reducer, actions] = reduxLeaves(initialState)
const store = createStore(reducer)

const incrementAndPush = bundle([
  actions.counter.create.increment(),
  actions.list.create.push('b')
])

// Action has a default type based on bundled action types:
console.log(incrementAndPush.type) // 'counter/INCREMENT; list/PUSH'

store.dispatch(incrementAndPush)
console.log(store.getState()) // { counter: 1, list: ['a', 'b'] }
```

### Actions array, type provided
```js
import { createStore } from 'redux'
import reduxLeaves, { bundle } from 'reduxLeaves'

const initialState = {
  counter: 0,
  list: ['a']
}

const [reducer, actions] = reduxLeaves(initialState)
const store = createStore(reducer)

const incrementAndPush = bundle([
  actions.counter.create.increment(),
  actions.list.create.push('b'),
  'INCREMENT_AND_PUSH'
])

console.log(incrementAndPush.type) // 'INCREMENT_AND_PUSH'

store.dispatch(incrementAndPush)
console.log(store.getState()) // { counter: 1, list: ['a', 'b'] }
```

### Order matters
```js
import { createStore } from 'redux'
import reduxLeaves, { bundle } from 'reduxLeaves'

const initialState = {
  counter: 0,
  list: ['a']
}

const [reducer, actions] = reduxLeaves(initialState)
const store = createStore(reducer)

const incrementThenPush = bundle([
  actions.counter.create.increment(),
  actions.list.create.apply((leafState, treeState) => [...leafState, treeState.counter])
])

const pushThenIncrement = bundle([
  actions.list.create.apply((leafState, treeState) => [...leafState, treeState.counter]),    actions.counter.create.increment()
])

store.dispatch(incrementThenPush)
console.log(store.getState()) // { counter: 1, list: ['a', 1] }

store.dispatch(pushThenIncrement)
console.log(store.getState()) // { counter: 2, list: ['a', 1, 1] }
```

### Compound bundleing
```js
import { createStore } from 'redux'
import reduxLeaves, { bundle } from 'reduxLeaves'

const initialState = {
  counter: 0,
  list: ['a']
}

const [reducer, actions] = reduxLeaves(initialState)
const store = createStore(reducer)

const incrementAndPush = bundle([
  actions.counter.create.increment(),
  actions.list.create.push('b')
])

const incrementAndPushAndIncrement = bundle([
  incrementAndPush,
  actions.counter.create.increment()
])

store.dispatch(incrementAndPushAndIncrement)
console.log(store.getState()) // { counter: 2, list: ['a', 'b'] }
```