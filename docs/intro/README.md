---
id: overview
title: Overview
hide_title: true
---

# Overview

The guiding philosophy of Redux-Leaves is *"write once, reduce anywhere"*.

**Just want to see some code? Check out the [30 second demo](demo.md).**

This page explains more about the motivation of Redux-Leaves and how its design philosophy is put into practice.

## Motivation

### Why?

Redux is great, but some developers complain about the boilerplate being [tedious, cumbersome and convoluted](https://medium.com/@Charles_Stover/no-boilerplate-global-state-management-in-react-41e905944eb7).

Redux-Leaves aims to **make Redux easier to learn *and* quicker to scale**.

### How?

One of the three core principles of Redux is: "[Changes \[to global state\] are made with pure \[reducer\] functions"](https://redux.js.org/introduction/three-principles#changes-are-made-with-pure-functions).

This can be easier said than done.

Achieving this can feel like it requires a lot of boilerplate in:
- action types;
- action creators; and
- switch/case logic...

... for *every single slice of state*.

**What if we could just write some reducer logic and have it instantly available *throughout our global state tree?***

This encapsulates Redux-Leave's *"write once, reduce anywhere"* philosophy.

## Introducing Redux-Leaves

### What?

Redux-Leaves lets you *write once, reduce anywhere* with:
- Quick setup;
- Intuitive API; and
- Advanced customisation.

### Quick setup
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

`actions` contains action creators that allows me to trigger the `increment` reducer logic for any slice of state in `store`, through an [intuitive API](#intuitive-api). This is the *'write once, reduce anywhere'* philosophy in action.

### Intuitive API

To create an action that increments at a given leaf:
1. Navigate through the `actions` object to the state leaf;
2. Access the `create` property at that leaf; and
3. Execute the present `increment` function.

```js
const actionToIncrementTopLevel = actions.topLevel.create.increment()

const actionToIncrementNestedOnce = actions.nested.once.create.increment()

const actionToIncrementNestedDeeperTwice = actions.nested.deeper.twice.create.increment()
```

The `reducer` produced by `reduxLeaves` and passed to `createStore` uses the common `increment` logic to update the store's state at each of these leaves:

```js
store.dispatch(actionToIncrementTopLevel)
console.log(store.getState())
/*
*  {
*    topLevel: 1,
*    nested: {
*      once: 1,
*      deeper: { twice: 2 }
*    }
*  }
*/

store.dispatch(actionToIncrementNestedOnce)
console.log(store.getState())
/*
*  {
*    topLevel: 1,
*    nested: {
*      once: 2,
*      deeper: { twice: 2 }
*    }
*  }
*/

store.dispatch(actionToIncrementNestedDeeperTwice)
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

### Advanced customisation
