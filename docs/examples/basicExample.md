---
id: basic-example
title: Basic example
hide_title: true
sidebar_label: Basic example
---

# Basic example: 30 second demo

[Play around with this code on Runkit](https://runkit.com/richardcrng/redux-leaves-basic-example)

**Situation**: I want to be able to increment two different counters in Redux state, `counterOne` and `counterTwo`.

**Complication**: I want to do this as quickly, painlessly and intuitively as possible.

**Question**: Do I really have to define reducers, action types and creators to do this?

Answer: no! Just provide Redux-Leaves with your state shape, i.e. the two counters, and it'll do the rest for you!

## Demonstration

### Set up the store's state
```js
// Imports for Redux and Redux-Leaves
import { createStore } from 'redux'
import riduce from 'redux-leaves'

// Your job: provide some initial state
const initialState = {
  counterOne: 0,
  counterTwo: 0
}

// Redux-Leaves's job: to write your reducer and actions for you
const [reducer, actions] = riduce(initialState)

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

Redux-Leaves has done all the hard work in providing you with a `reducer` and appropriate `actions` to `.create`!

`increment` is one of many [default action creators](../defaults/README.md) that Redux-Leaves writes for you, which cover most basic needs.

If you want to add some custom action creators, look at the [intermediate example](intermediateExample.md).