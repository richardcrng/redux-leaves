---
id: actions
title: actions (Action Creators)
hide_title: true
sidebar_label: actions
---

# `actions`

## Arbitrary property paths

The `actions` object returned by `reduxLeaves` can take an arbitrary path of properties after it, which typically correspond to a 'leaf' at the corresponding path from your state.

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

const [reducer, actions] = reduxLeaves(initialState)

// state.counter
console.log(typeof actions.counter) // 'object'

// state.arbitrary.nested
console.log(typeof actions.arbitrary.nested) // 'object'

// state.arbitrary.nested.path
console.log(typeof actions.arbitrary.nested.path) // 'object'

// but also works for paths not in your initial state
console.log(typeof actions.not.in.my.initial.state) // 'object'
```

## Accessing `create`

For a given arbitrary property path, you have two options: navigating to a deeper property / leaf, or accessing the `create` property.

```js
// Access create at the state root
console.log(typeof actions.create) // 'function'

// Go deeper
console.log(typeof actions.arbitrary) // 'object'

// Access create at state.arbitrary
console.log(typeof actions.arbitrary.create) // 'function'

// Go deeper
console.log(typeof actions.arbitrary.nested.path)

// Access create at state.arbitary.nested.path
console.log(typeof actions.arbitrary.nested.path.create) // 'function'
```

Once you've accessed `create`, you can't go arbitrarily deeper beyond that.
```js
console.log(typeof actions.create.arbitrary) // 'undefined'
```

This is because the `create` key accesses the Redux-Leaves action creator (`create`) API at the corresponding leaf of state.