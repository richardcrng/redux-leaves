---
id: create
title: create
hide_title: true
sidebar_label: create
---

# `create`

When you access the `create` property from any arbitrary path from the `actions` object, you access the Redux-Leaves action creators API.

Consider the `actions` object returned below.
```js
import { createStore } from 'redux'
import reduxLeaves from 'redux-leaves'

const initialState = {
  counter: 0,
  arbitrary: {
    nested: {
      path: ['hi!']
    }
  }
}

const reducersDict = {
  convertToFoobar: () => 'foobar'
}

const [reducer, actions] = reduxLeaves(initialState, reducersDict)
```

* `actions.counter.create` corresponds to creating actions at `state.counter`;
* `actions.arbitrary.nested.path.create` corresponds to creating actions at `state.arbitrary.nested.path`;
* `actions.create` corresponds to creating actions at the `state`'s root.

## `create[creatorKey]`
### Action creators
You can access action creators (functions) from the `create` API at any leaf by using their `creatorKey` as a property, both for the default ones and any custom ones you've defined.

```js
// Example defaults: update, set, push
console.log(typeof actions.counter.create.update) // 'function'
console.log(typeof actions.arbitrary.nested.create.set) // 'function'
console.log(typeof actions.arbitrary.nested.path.create.push) // 'function'

// Custom creatorKey of 'convertToFoobar'
console.log(typeof actions.create.convertToFoobar) // 'function'
console.log(typeof actions.arbitrary.nested.path.create.convertToFoobar) // 'function'
```

### Actions
Executing these functions then create the actions that you should dispatch to your Redux store.

```js
const store = createStore(reducer) // using reducer from reduxLeaves
console.log(store.getState().counter) // 0

const updateCounter = actions.counter.create.update

store.dispatch(updateCounter(5))
console.log(store.getState().counter) // 5

store.dispatch(updateCounter(3))
console.log(store.getState().counter) // 3
```

### Optional `actionType` argument
Rather than directly accessing action creators from `create`, you can optionally provide an `actionType` string as an argument to `create` before accessing the action creator functions:

```js
// Defaults, e.g. update creatorKey
console.log(typeof actions.counter.create.update) // 'function'
console.log(typeof actions.counter.create('UPDATE_COUNTER').update) // 'function'

// Custom creatorKey of 'convertToFoobar'
console.log(typeof actions.create.convertToFoobar) // 'function'
console.log(typeof actions.create('CONVERT_TO_FOOBAR').convertToFoobar) // 'function'
```

Providing an `actionType` string in this way does not change the way that the reducer will respond to actions; it merely overrides the created action's `type` property to be the string passed in (which might be desirable for a debugging perspective for Redux DevTools, for example):

```js
const createDefaultIncrement = actions.counter.create.increment
const createNamedIncrement = actions.counter.create('NAMED_INCREMENT').increment

console.log(store.getState().counter) // 3

const defaultIncrement = createDefaultIncrement()
console.log(defaultIncrement.type) // 'counter/INCREMENT'
dispatch(defaultIncrement)
console.log(store.getState().counter) // 4

const namedIncrement = createNamedIncrement()
console.log(namedIncrement.type) // 'NAMED_INCREMENT'
dispatch(namedIncrement)
console.log(store.getState().counter) // 5
```

(It is safe to override name in this way because the Redux-Leaves `reducer` does not switch over the action's `type`.)