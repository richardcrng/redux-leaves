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
    counter: 0,
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