---
id: intermediate-example
title: Intermediate example
hide_title: true
sidebar_label: Intermediate example
---

# Intermediate example: custom logic

**Situation**: I want to define a general type of reducer logic that can be reused on any arbitrary slice of state.
**Complication**: I want to do this as quickly, painlessly and intuitively as possible.
**Question**: Do I really have to create sub-reducers with the same underlying logic?

Answer: no! Just provide Redux-Leaves once with your custom reducer logic, and you can automatically use it at any leaf of your state tree.

## Demonstration

### Set up with your custom reducer logic
```js
import { createStore } from 'redux'
import reduxLeaves from 'redux-leaves'

const initialState = {
  counter: 2,
  list: ['first', 'second'],
  nested: { arbitrarily: { deep: 0 } }
}

// Key your reducer logic by a descriptive verb
const reducersDict = {
  double: leafState => leafState * 2,
  appendToEach: (leafState, action) => leafState.map(str => str.concat(action.payload)),
  countTreeKeys: (leafState, action, treeState) => Object.keys(treeState).length
}

// Provide the dictionary of your reducer logic to reduxLeaves
const [reducer, actions] = reduxLeaves(initialState, reducersDict)
const store = createStore(reducer)
```

### Dispatch actions at any leaf with the corresponding keys
```js
store.dispatch(actions.counter.create.double())
console.log(store.getState().counter) // 4

store.dispatch(actions.list.create.appendToEach(' item')) // ' item' will be the action payload
console.log(store.getState().list) // ['first item', 'second item']

store.dispatch(actions.nested.arbitrarily.deep.create.countTreeKeys())
console.log(store.getState().nested.arbitrarily.deep) // 3

// And to demonstrate reusing logic at an arbitrary leaf:
store.dispatch(actions.nested.arbitrarily.deep.create.double())
console.log(store.getState().nested.arbitrarily.deep) // 6
```

## Default handling of arguments
When you supply `reduxLeaves` with custom reducer logic, it provides the corresponding action creators, e.g. `actions.list.create.appendToEach` used above.

The *default behaviour* of these action creators is that, if they receive any arguments, *only the first argument* is passed to the created action as a payload:

```js
const actionToAppend = actions.list.create.appendToEach('foo', 'bar')
console.log(actionToAppend.payload) // 'foo'
```

If you would like to customise this behaviour, look at the [advanced example](advancedExample.md).