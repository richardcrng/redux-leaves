---
id: advanced-example
title: Advanced example
hide_title: true
sidebar_label: Advanced example
---

# Advanced example: custom types and payloads

## Custom types

When you create an action through Redux-Leaves, it gives the action a `type` property based on the path to the state leaf you are acting on:

```js
import { createStore } from 'redux'
import reduxLeaves from 'redux-leaves'

const [reducer, actions] = reduxLeaves({
  list: ['a', 'b'],
  nested: {
    state: {
      deep: 'somewhat'
    }
  }
})

const actionToPushToList = actions.list.create.push('c')
console.log(actionToPushToList.type) // 'list/PUSH'

const actionToUpdateDeepState = actions.nested.state.deep.create.update('could go deeper')
console.log(actionToUpdateDeepState.payload)
// 'nested/state/deep/UPDATE'

```
