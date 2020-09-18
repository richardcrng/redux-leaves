---
id: bundle
title: bundle
hide_title: true
sidebar_label: bundle
---

# `bundle(actions[, type])`

Returns an (action) object that the [reduxLeaves](../README.md) reducer uses to process the individual actions in the `actions` array sequentially (but, through the store, one dispatch).

**See the [30 second demo](../examples/basicExample.md)** for usage.

## Parameters
- `actions` *(object[])*: an array where each element should be an action created through the Redux-Leaves API (either [`create`](create.md) or `bundle` itself)
- `type` *(string, optional)*: a string that will be the type of the returned action

## Returns
`action` *(object)*: a single object to dispatch to the `store`

## Examples

### Actions array, no type provided
When provided a single argument, an array of actions created through the [`create`](create.md) API, `bundle` will return a single action which is equivalent to all of those actions run sequentially.

```js
import { createStore } from 'redux'
import reduxLeaves, { bundle } from 'redux-leaves'

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
When provided a second argument of a string, `bundle` returns an action with that exact `type` property.

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
], 'INCREMENT_AND_PUSH')

// Action has the provided type
console.log(incrementAndPush.type) // 'INCREMENT_AND_PUSH'

// But you can still see the action types bundled if you wish
console.log(incrementAndPush.leaf.bundled) // ['counter/INCREMENT', 'list/PUSH']

store.dispatch(incrementAndPush)
console.log(store.getState()) // { counter: 1, list: ['a', 'b'] }
```

### Order matters
Since `bundle` effectively runs through actions in the ordered provided, the order of elements in the array can make a difference to the overall effect.

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
  actions.list.create.do((leafState, treeState) => [...leafState, treeState.counter])
])

const pushThenIncrement = bundle([
  actions.list.create.do((leafState, treeState) => [...leafState, treeState.counter]),    actions.counter.create.increment()
])

store.dispatch(incrementThenPush)
console.log(store.getState()) // { counter: 1, list: ['a', 1] }

store.dispatch(pushThenIncrement)
console.log(store.getState()) // { counter: 2, list: ['a', 1, 1] }
```

### Compound bundling
You can `bundle` together actions that have already been bundled (a 'compound bundling'):

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
