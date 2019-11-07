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

## create[creatorKey]
You can access action creator functions from the `create` API at any leaf by using their `creatorKey` as a property, both for the default ones and any custom ones you've defined.

```js
// Example defaults: update, set, push
console.log(typeof actions.counter.create.update) // 'function'
console.log(typeof actions.arbitrary.nested.create.set) // 'function'
console.log(typeof actions.arbitrary.nested.path.create.push) // 'function'

// Custom creatorKey of 'convertToFoobar'
console.log(typeof actions.create.convertToFoobar) // 'function'
console.log(typeof actions.arbitrary.nested.path.create.convertToFoobar) // 'function'
```

