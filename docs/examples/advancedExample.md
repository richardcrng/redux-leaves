---
id: advanced-example
title: Advanced example
hide_title: true
sidebar_label: Advanced example
---

# Advanced example: custom types and payloads

## Custom action types

### Default action types
When you create an action through Redux-Leaves - whether using a default creator or some custom reducer logic you've supplied - it gives the action an informative `type` property:

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

You can do this by providing a string argument to `create`:

```js
const appendLetterC = actions.list.create('APPEND_LETTER_C').push('c')
console.log(appendLetterC) // 'APPEND_LETTER_C'

const duplicateList = actions.list.create('DUPLICATE_LIST').duplicate()
console.log(duplicateList) // 'DUPLICATE LIST'
```