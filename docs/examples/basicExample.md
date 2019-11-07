---
id: basic-example
title: Basic example
hide_title: true
sidebar_label: Basic example
---

# Basic Example: 30 second demo

**Situation**: I want to be able to increment two different counters in Redux state, `counterOne` and `counterTwo`.
**Complication**: I want to do this as quickly, painlessly and intuitively as possible.
**Question**: Do I really have to define reducers, action types and creators to do this?

Answer: no! Just provide Redux-Leaves with your state shape, i.e. the two counters, and it'll do the rest for you!

## Demonstration

### Set up the store's state
```js
// Imports for Redux and Redux-Leaves
import { createStore } from 'redux'
import reduxLeaves from 'redux-leaves'

// Your job: provide some initial state
const initialState = {
  counterOne: 0,
  counterTwo: 0
}

// Redux-Leaves's job: to write your reducer and actions for you
const [reducer, actions] = reduxLeaves(initialState)

// Create your Redux store using the given reducer
const store = createStore(reducer)
```

### Update the store's state
```js
console.log(store.getState()) // { counterOne: 0, counterTwo: 0 }

// Let's create an action to increment counterOne by 3
const actionToIncrementCounterOneByThree = actions.counterOne.create.increment(3)

// Dispatch our created action to the store
store.dispatch(actionToIncrementCounterOneByThree)

// The store's state will be updated!
console.log(store.getState()) // { counterOne: 3, counterTwo: 0 }

// Now let's increment counterTwo by 10
store.dispatch(actions.counterTwo.create.increment(10))
console.log(store.getState()) // { counterOne: 3, counterTwo: 10 }
```

## Default action creators
`increment` is one of many default action creators that Redux-Leaves writes for you.

Here are some other common ones that you might like to use:

```js
import { createStore } from 'redux'
import reduxLeaves from 'redux-leaves'

const initialState = {
  arr: [3, 'things', 'here'],
  bool: false,
  obj: {
    nested: true
  }
  title: 'Redux-Leaves',
}

const [reducer, actions] = reduxLeaves(initialState)
const store = createStore(reducer)
```

### Arrays
```js
// push: push an element to an array
store.dispatch(actions.arr.create.push('new element'))
console.log(store.getState().arr) // [3, 'things', 'here', 'new element']

// drop: drop n elements from an array
store.dispatch(actions.arr.create.drop(2))
console.log(store.getState().arr) // [3, 'things']
```

### Booleans
```js
// toggle: toggles a boolean
store.dispatch(actions.bool.create.toggle())
console.log(store.getState().bool) // true

// off: make a boolean false (or 'on' for true)
store.dispatch(actions.bool.create.off())
console.log(store.getState().bool) // false
```

### Plain objects
```js
// assign: spreads properties
store.dispatch(actions.obj.create.assign({ deep: false }))
console.log(store.getState().obj) // { nested: true, deep: false }

// path: sets a value at a given path in the object
store.dispatch(actions.obj.create.path(['arbitrary', 'property'], 3))
console.log(store.getState().obj.arbitrary) // { property: 3 } 
```

### Type agnostic
```js
// apply: updates state by applying a callback
store.dispatch(actions.title.create.apply(str => str.toUpperCase())
console.log(store.getState().title) // 'REDUX-LEAVES'

// update: changes state to the value provided
store.dispatch(actions.title.create.update('Redux-Leaves is GREAT'))
console.log(store.getState().title) // 'Redux-Leaves is GREAT'
```

