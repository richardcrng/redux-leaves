---
id: features
title: Features
hide_title: true
---

# Features

## Quick setup
It takes just 30 seconds to set up your reducer, actions and store with Redux-Leaves

1. Pass some initial state to `reduxLeaves`
2. Grab the returned `reducer` and `actions`
3. Create your store and dispatch away!

```js
import { createStore } from 'redux'
import reduxLeaves from 'redux-leaves'

// 1. Pass some initial state to reduxLeaves; and
// 2. Grab the returned reducer and actions
const [reducer, actions] = reduxLeaves({
  counter: 0,
  list: [],
  arbitrary: {  nested: { property: false } }
})

// 3. Create your store and dispatch away!
const store = createStore(reducer)
store.dispatch(actions.counter.create.increment())
store.dispatch(actions.list.create.push('foobar'))
store.dispatch(actions.arbitrary.nested.property.create.toggle())

console.log(store.getState())

/*
{
  counter: 0,
  list: ['foobar'],
  arbitrary: { nested: { property: true } }
}
*/
```

Here's the [full list of action creators](../defaults/README.md) that can be accessed from `actions`.

## Intuitive API

Continuing on from the example above: suppose that I want to set a new property at `arbitrary.nested` state, with the key `deep` and the value `true`.

Here are the steps to update our store's state:

1. Navigate to the appropriate path from `actions`
2. Access action creators through `create`
3. Key into the appropriate action creator
4. Execute to create the action, and dispatch it!

```js
// 1. Navigate to the appropriate path from actions
const arbitaryNestedPathFromActions = actions.arbitrary.nested

// 2. Access action creators through create
const arbitraryNestedActionCreators = arbitraryNestedPathFromActions.create

// 3. Key into the appropriate action creator
const setArbitraryNestedState = arbitraryNestedActionCreators.set

// 4. Execute to create the action, and dispatch it!
store.dispatch(setArbitraryNestedState('deep', true))
console.log(store.getState().arbitrary.nested.deep) // true

// or, in one line:
store.dispatch(actions.arbitrary.nested.create.set('deep', false))
console.log(store.getState().arbitrary.nested.deep) // false
```

## Minimal boilerplate

The reducer logic supplied to `reduxLeaves` can:
- Take an argument supplied to an action creator (received as the action's `payload`);
- Update a given `leafState` using the store's `wholeState`; and
- Be customised further with additional properties.

For example:

```js
import { createStore } from 'redux'
import reduxLeaves from 'redux-leaves'

const initialState = {
  foo: ['foo'],
  nest: {}
}

// Update a leaf state (array) by pushing a supplied element
const push = (leafState, { payload }) => [...leafState, payload]

// Update a leaf state (object) with a property of the whole state
const recurse = (leafState, { payload }, wholeState) => ({
  ...leafState, [payload]: wholeState[payload]
})

const [reducer, actions] = reduxLeaves(initialState, { push, recurse })
const store = createStore(reducer)
```

```js
store.dispatch(actions.foo.create.push('bar'))
console.log(store.getState().foo) // ['foo', 'bar']

store.dispatch(actions.nest.create.recurse('foo'))
console.log(store.getState().nest)  // { foo: ['foo', 'bar'] }

console.log(store.getState())
/*
* {
*   foo: ['foo', 'bar'],
*   nest: {
*     foo: ['foo', 'bar']
*   }
* }
*/
```