---
id: features
title: Features
hide_title: true
---

# Features

## Quick setup
1. Define initial state and reducer logic;
2. Pass to `reduxLeaves`;
3. Done!

Let's demonstrate this by using Redux-Leaves to increment arbitrarily nested counters.

```js
import { createStore } from 'redux'
import reduxLeaves from 'redux-leaves'

const initialState = {
  topLevel: 0,
  nested: {
    once: 1,
    deeper: {
      twice: 2,
    }
  }
}

const increment = leafState => leafState + 1

const [reducer, actions] = reduxLeaves(initialState, { increment })
const store = createStore(reducer)
```

The *'write once, reduce anywhere'* philosophy in action means that **we can use `actions` to trigger our `increment` logic at any slice of state**.

## Intuitive API

To create an action that increments at a given leaf:
1. Navigate through the `actions` object to the state leaf;
2. Access the `create` property at that leaf; and
3. Execute the present `increment` function.

```js
const actionToIncrementTopLevel = actions.topLevel.create.increment()
const actionToIncrementNestedOnce = actions.nested.once.create.increment()
const actionToIncrementNestedDeeperTwice = actions.nested.deeper.twice.create.increment()
```

The reducer produced by `reduxLeaves` uses the supplied increment reducer logic to update the store's state at each of these leaves:

```js
store.dispatch(actionToIncrementTopLevel)
console.log(store.getState().topLevel)  // 1

store.dispatch(actionToIncrementNestedOnce)
console.log(store.getState().nested.once) // 2

store.dispatch(actionToIncrementNestedDeeperTwice)
console.log(store.getState().nested.deeper.twice) // 3

console.log(store.getState())
/*
*  {
*    topLevel: 1,
*    nested: {
*      once: 2,
*      deeper: { twice: 3 }
*    }
*  }
*/
```

## Advanced customisation

The reducer logic supplied to `reduxLeaves` can:
- Take an argument supplied to an action creator (received as the action's `payload`);
- Update a given `leafState` using the store's `wholeState`; and
- Be customised further with additional properties.

For example:

```js
import { createStore } from 'redux'
import reduxLeaves from 'redux-leaves'

const initialState = {
  foo: ['foo'],
  nest: {}
}

// Update a leaf state (array) by pushing a supplied element
const push = (leafState, { payload }) => [...leafState, payload]

// Update a leaf state (object) with a property of the whole state
const recurse = (leafState, { payload }, wholeState) => ({
  ...leafState, [payload]: wholeState[payload]
})

const [reducer, actions] = reduxLeaves(initialState, { push, recurse })
const store = createStore(reducer)
```

```js
store.dispatch(actions.foo.create.push('bar'))
console.log(store.getState().foo) // ['foo', 'bar']

store.dispatch(actions.nest.create.recurse('foo'))
console.log(store.getState().nest)  // { foo: ['foo', 'bar'] }

console.log(store.getState())
/*
* {
*   foo: ['foo', 'bar'],
*   nest: {
*     foo: ['foo', 'bar']
*   }
* }
*/
```