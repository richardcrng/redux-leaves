---
id: actions
title: actions (Action Creators)
hide_title: true
sidebar_label: actions
---

# `actions`

## Access `create` for an arbitrary leaf

The `actions` object returned by `reduxLeaves` can take an arbitrary path of properties after it.

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

console.log(typeof actions.counter) // object
console.log(typeof actions.arbitrary.nested) // object
console.log(typeof actions.arbitrary.nested.path) // object

// also works for paths not in your initial state
console.log(typeof actions.not.in.my.initial.state) // object
```