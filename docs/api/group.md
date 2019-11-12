---
id: group
title: group
hide_title: true
sidebar_label: group
---

# `group(actions, type = 'GROUPED_UPDATE')`

Returns an (action) object that the [reduxLeaves](../README.md) reducer uses to process the individual actions in the `actions` array sequentially (but, through the store, one dispatch).

**See the [30 second demo](intro/demo.md)** for usage.

## Parameters
- `actions` *(object[])*: an array where each element should be an action created through the Redux-Leaves [`create`](create.md) API
- `actionType`

## Returns
`type` *(optional, string)*: the type of the returned action

## Examples

### Actions array, no type
```js
import { createStore } from 'redux'
import reduxLeaves, { group } from 'reduxLeaves'

const initialState = {
  counter: 0,
  list: ['a']
}

const [reducer, actions] = reduxLeaves(initialState)
const store = createStore(reducer)

const incrementAndPush = group([
  actions.counter.create.increment(),
  actions.list.create.push('b')
])

store.dispatch(incrementAndPush)
console.log(store.getState()) // { counter: 1, list: ['a', 'b'] }
```

### Actions array, type provided
```js
import { createStore } from 'redux'
import reduxLeaves, { group } from 'reduxLeaves'

const initialState = {
  counter: 0,
  list: ['a']
}

const [reducer, actions] = reduxLeaves(initialState)
const store = createStore(reducer)

const incrementAndPush = group([
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
import reduxLeaves, { group } from 'reduxLeaves'

const initialState = {
  counter: 0,
  list: ['a']
}

const [reducer, actions] = reduxLeaves(initialState)
const store = createStore(reducer)

const pushIncrementedValue = group([
  actions.counter.create.increment(),
  actions.list.create.apply((leafState, treeState) => [...leafState, treeState.counter])
])

store.dispatch(pushIncrementedValue)
console.log(store.getState()) // { counter: 1, list: ['a', 1] }
```

### Compound grouping
```js
import { createStore } from 'redux'
import reduxLeaves, { group } from 'reduxLeaves'

const initialState = {
  counter: 0,
  list: ['a']
}

const [reducer, actions] = reduxLeaves(initialState)
const store = createStore(reducer)

const incrementAndPush = group([
  actions.counter.create.increment(),
  actions.list.create.push('b')
])

const incrementAndPushAndIncrement = group([
  incrementAndPush,
  actions.counter.create.increment()
])

store.dispatch(incrementAndPushAndIncrement)
console.log(store.getState()) // { counter: 2, list: ['a', 'b'] }
```