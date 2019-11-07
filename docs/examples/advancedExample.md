---
id: advanced-example
title: Advanced example
hide_title: true
sidebar_label: Advanced example
---

# Advanced example: custom types and payloads

## Custom action types

### Default action types
When you create an action through Redux-Leaves, it gives the action a `type` property based on the path to the state leaf you are acting on:

```js
import { createStore } from 'redux'
import reduxLeaves from 'redux-leaves'

const initialState = {
  list: ['a', 'b'],
  nested: {
    state: {
      deep: 'somewhat'
    }
  }
}

const reducersDict = {
  duplicate: (leafState, { payload }) => leafState.concat(leafState)
}

const [reducer, actions] = reduxLeaves(initialState, reducersDict)

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