---
id: overview
title: Overview
hide_title: true
---

# Overview

The guiding philosophy of Redux-Leaves is *"write once, reduce anywhere"*.

This page explains more about the motivation of Redux-Leaves and how its design philosophy is put into practice.

> **Just want to see some code? Check out the basic [30 second demo](examples/basicExample.md).**

## Motivation

### Why?

Redux is useful, powerful and great!

But some developers complain about the boilerplate being [tedious, cumbersome and convoluted](https://medium.com/@Charles_Stover/no-boilerplate-global-state-management-in-react-41e905944eb7).

Can we make it easier for developers to get the use, power and great developer experience from Redux?

> **Redux-Leaves aims to make Redux easier to learn *and* quicker to scale**.

### How?

Let's consider some of the developer complaints against Redux.

* "Redux requires a ton of tedious code to do the most basic things"
* "It often feels tedious to do trivial state changes"
* "Redux has too much boilerplate, and I have to maintain all of it"
* "New developers have a problem with flux architecture and functional concepts"
* "Redux requires a ton of files to establish a new reducer"

Maybe that developer experience would be better if we could:

> 1. **Quickly set up** Redux for basic state changes;
> 2. **Intuitively create actions** for arbitrary needs; and
> 3. **Cut down boilerplate** of reducers drastically?

### What?

Redux-Leaves lets you *write once, reduce anywhere* with:
- [Quick setup](features.md#quick-setup);
- [Intuitive API](features.md#intuitive-api); and
- [Minimal boilerplate](features.md#minimal-boilerplate).

#### Example
```js
import { createStore } from 'redux'
import riduce, { bundle } = from 'redux-leaves'

// set up with initial state
const initialState = {
  counter: 0,
  list: [],
  props: {}
}

const [reducer, actions] = riduce(initialState)
const store = createStore(reducer)

// setup complete! Now dispatch actions to your heart's content

console.log(store.getState())
// => { counter: 0, list: [], props: {} } 

store.dispatch(actions.counter.create.increment(10))
console.log(store.getState())
// => { counter: 10, list: [], props: {} }

store.dispatch(actions.list.create.push('foo'))
console.log(store.getState())
// => { counter: 10, list: ['foo'], props: {} }

const compoundAction = bundle([
  actions.counter.create.reset(),
  actions.list[0].create.concat('bar'),
  actions.props.at.arbitrary.path.create.update('here I am!')
])

store.dispatch(compoundAction)
console.log(store.getState())
/*
  => {
    counter: 0,
    list: ['foobar'],
    props: { at: { arbitrary: { path: 'here I am!' } } }
  }
*/
```

### Bonus: `useReducer` usage

Although Redux-Leaves was written to make it easier to work with Redux, [it also works great with `useReducer`](../examples/useReducerExample.md)!