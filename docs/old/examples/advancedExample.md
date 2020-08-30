---
id: advanced-example
title: Advanced example
hide_title: true
sidebar_label: Advanced example
---

# Advanced example: bundling actions, custom types and controlling payloads

## Bundling actions
Perhaps you're worried that the atomic actions you're creating at each leaf will cause too much rerendering or clog up your Redux DevTools inspector.

You can bundle together actions with [`bundle`](../api/bundle.md), to produce a new bundle action that will update your store's state in a single `dispatch`.

[Bundling example on Runkit](https://runkit.com/richardcrng/redux-leaves-bundling-actions)

```js
import { createStore } from 'redux'
import riduce, { bundle } from 'redux-leaves'

const initialState = {
  list: ['a', 'b'],
  nested: {
    counter: 0,
    state: {
      deep: 'somewhat'
    }
  }
}

const [reducer, actions] = riduce(initialState)
const store = createStore(reducer)

const actionBundle = bundle([
  actions.list.create.push('c'),
  actions.nested.counter.create.increment(5),
  actions.nested.state.create.set('arbitrary', true)
])

store.dispatch(actionBundle)
console.log(store.getState())
/*
  {
    list: ['a', 'b', 'c'],
    nested: {
      counter: 5,
      state: {
        arbitrary: true,
        deep: 'somewhat'
      }
    }
  }
*/
```

## Custom action types

### Default action types
When you create an action through Redux-Leaves - whether using a default creator or some custom reducer logic you've supplied - it gives the action an informative `type` property:

```js
import { createStore } from 'redux'
import riduce from 'redux-leaves'

const initialState = {
  list: ['a', 'b'],
  nested: {
    counter: 0,
    state: {
      deep: 'somewhat'
    }
  }
}

const riducerDict = {
  duplicate: leafState => leafState.concat(leafState)
}

const [reducer, actions] = riduce(initialState, riducerDict)

const actionToPushToList = actions.list.create.push('c')
console.log(actionToPushToList.type) // 'list/PUSH'

const actionToDuplicateList = actions.list.create.duplicate()
console.log(actionToDuplicateList.type) // 'list/DUPLICATE'

const actionToUpdateDeepState = actions.nested.state.deep.create.update('could go deeper')
console.log(actionToUpdateDeepState.payload)
// 'nested/state/deep/UPDATE'
```

### Overriding the default action type
You may find benefits, e.g. with Redux DevTools, to overriding the default action type.

You can do this by providing a string argument to `create`:

```js
const appendLetter = actions.list.create('APPEND_LETTER').push
console.log(appendLetter('c').type) // 'APPEND_LETTER'

const duplicateList = actions.list.create('DUPLICATE_LIST').duplicate
console.log(duplicateList().type) // 'DUPLICATE LIST'
```

Overriding the default action type won't change how the Redux-Leaves `reducer` responds to the action:
```js
const store = createStore(reducer)
console.log(store.getState().list) // ['a', 'b']

store.dispatch(appendLetter('c'))
console.log(store.getState().list) // ['a', 'b', 'c']

store.dispatch(duplicateList())
console.log(store.getState().list)
// ['a', 'b', 'c', 'a', 'b', 'c']
```

### Usage pattern
An expected pattern that this facilitates is the defining of action creators in one file, e.g. `actions.js`:
```js
// import the actions object created by Redux-Leaves
import { actions } from './some/location'

export const incrementCounter = actions.counter.create('INCREMENT_COUNTER').increment
export const updateDeepState = actions.nested.state.deep.create('UPDATE_DEEP_STATE').update
```
and then import these action creators into whichever file needs access to them.

## Controlling payloads
Suppose I want to create a custom creator, `addMultiple`, such that I can pass multiple numbers as arguments and have them all added to a given leaf's state.

The default behaviour of a custom action creator is that only the first argument is passed as an action's payload, but we can configure that:

```js
import { createStore } from 'redux'
import riduce from 'redux-leaves'

const initialState = {
  counter: 0
}

const riducerDict = {
  // object configuration longhand
  addMultiple: {
    // Capture all arguments and pass them to the reducer:
    argsToPayload: (...args) => args,
    reducer: (leafState, { payload }) => payload.reduce((acc, val) => acc + val, leafState)
  },

  // function shorthand
  // uses default payload behaviour
  addFirstThing: (leafState, { payload }) => leafState + payload
}

const [reducer, actions] = riduce(initialState, riducerDict)
const store = createStore(reducer)

console.log(store.getState().counter) // 0

store.dispatch(actions.counter.create.addMultiple(4, 2, 10))
console.log(store.getState().counter) // 16

store.dispatch(actions.counter.create.addFirstThing(1, 100))
console.log(store.getState().counter) // 17
```