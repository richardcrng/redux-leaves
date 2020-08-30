---
id: features
title: Features
hide_title: true
---

# Features

## Quick setup
It takes just 30 seconds to set up your reducer, actions and store with Redux-Leaves!

1. Pass some initial state to `riduce`
2. Grab the returned `reducer` and `actions`
3. Create your store and dispatch away!

```js
import { createStore } from 'redux'
import riduce from 'redux-leaves'

// 1. Pass some initial state to riduce; and
// 2. Grab the returned reducer and actions
const [reducer, actions] = riduce({
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

If you want to extend the action creators available, you can define some reducer logic and access it at any arbitrary slice of state by passing it into `riduce` in a [`reducersDict`](../README.md#reducersdict).

```js
import { createStore } from 'redux'
import riduce from 'redux-leaves'

const initialState = {
  title: 'foobar',
  some: { long: { description: 'pretty great' } }
}

// Reducer logic: capitalise some leaf state
const capitalise = (leafState) => leafState.toUpperCase()

// Second optional argument of riduce is a reducersDict
const [reducer, actions] = riduce(initialState, { capitalise })
const store = createStore(reducer)

// Access the action creator by the same key
store.dispatch(actions.title.create.capitalise())
console.log(store.getState().title) // 'FOOBAR'

// Dispatch it to any arbitrary slice of state
store.dispatch(actions.some.long.description.capitalise())
console.log(store.getState().some.long.description) // 'PRETTY GREAT'
```