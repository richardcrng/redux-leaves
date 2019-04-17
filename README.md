# redux-leaves

Manage every leaf of your state tree with *pleasure*, *precision* and *predictability*.

[![Coverage Status](https://coveralls.io/repos/github/richardcrng/redux-leaves/badge.svg?branch=buttons)](https://coveralls.io/github/richardcrng/redux-leaves?branch=buttons)
![David](https://img.shields.io/david/richardcrng/redux-leaves.svg)
[![install size](https://packagephobia.now.sh/badge?p=redux-leaves)](https://packagephobia.now.sh/result?p=redux-leaves)
[![npm version](https://badge.fury.io/js/redux-leaves.svg)](https://badge.fury.io/js/redux-leaves)
[![Maintainability](https://api.codeclimate.com/v1/badges/371605931cb9f824e25c/maintainability)](https://codeclimate.com/github/richardcrng/redux-leaves/maintainability)

#### Getting started
- [30 second demo](#30-second-demo)
- [Motivation](#motivation)

#### API reference
- [Core: `reduxLeaves(initialState)`](https://github.com/richardcrng/redux-leaves/tree/master/docs)
- [Action creators: `create`](https://github.com/richardcrng/redux-leaves/tree/master/docs/create)
- [Custom action creators via `customLogic`](https://github.com/richardcrng/redux-leaves/tree/master/docs/customLogic.md)

#### [FAQs](#faqs)
- [What actions can I dispatch to the store?]
- [Will dispatched actions mutate the store state?]

## 30 second demo

### 1. Pleasingly little boilerplate

```bash
npm install --save redux-leaves
```

```js
import { createStore } from 'redux'
import reduxLeaves from 'redux-leaves'

const initialState = {
  counter: 1,
  foo: ['foo'],
  nested: {
    deep: {},
    state: {
      manageable: 'you bet'
    }
  }
}

const [reducer, actions] = reduxLeaves(initialState) // ES6 array destructuring
const store = createStore(reducer)
```

### 2. Precise updates

```js
// actions API allows us to access action creators targeted at any leaf of our state shape

store.dispatch(actions.counter.create.increment())
store.dispatch(actions.foo.create.push('bar'))
store.dispatch(actions.nested.state.deep.create.set('arbitrarily', true))
store.dispatch(actions.nested.state.manageable.create.apply(state => state.toUpperCase()))
```

### 3. Predictable changes
```js
// store.getState()
{
  counter: 2,
  foo: ['foo', 'bar'],
  nested: {
    deep: {
      arbitrarily: true
    },
    state: {
      manageable: 'YOU BET'
    }
  }
}
```

## Motivation

### Problem

[Redux](https://redux.js.org/) and [Redux DevTools](https://github.com/zalmoxisus/redux-devtools-extension) both work great for following what is happening in your app.<sup>1</sup>

However, there are three pain points that at least one developer has encountered:

1. **Ugly boilerplate maintenance**: one more slice of state =  another load of action types, creators and reducers to write.
2. **Unhelpfully named constants**: what was `NONTRIVIAL_THING_HAPPENED` meant to do, again...?
3. **Repetitive reducer logic**: an action that updates some slice of state to `true`? *How novel!*

<sup>1</sup> *cf. what you* intended *to happen in your app...*

### Solution

`redux-leaves` is a library that is written to provide:

1. **Pleasingly little boilerplate**: set up your reducer and actions in one line
```js
const [reducer, actions] = reduxLeaves(initialState)
```

2. **Precise updates**: easily increment that counter, no matter how deeply you nested it
```js
dispatch(actions.distressingly.and.foolishly.deeply.nested.counter.create.increment(2))
```
3. **Predictable changes**: understand exactly what's happening with clear and consistently named action types:
```js
// action type dispatched above:
'distressingly/and/foolishly/deeply/nested/counter/asNumber.INCREMENT'
``` 

## FAQs

### What actions can I dispatch to the store?

The `reducer` produced by `reduxLeaves` only knows how to update state in response to the `actions` produced by `reduxLeaves` - but there's a full [`create` API](https://github.com/richardcrng/redux-leaves/tree/master/docs/create) which shows what actions you can dispatch (including [`create.apply`](https://github.com/richardcrng/redux-leaves/tree/master/docs/create#createapplycallback), which takes a callback function to update state).

If you desire further customisation, you can add custom action creators to the `actions` returned by `reduxLeaves`, via an optional [`customLogic`](https://github.com/richardcrng/redux-leaves/tree/master/docs/customLogic.md) argument.


### Will dispatched actions mutate the store's state?

Even if you dispatch an action that looks like it will mutate state (e.g. `create.apply(n => n++)`), `reduxLeaves`'s reducer enforces immutability (using [Immer](https://github.com/immerjs/immer)).


#### API reference
- [Core: `reduxLeaves(initialState, [customLogic = {}])`](https://github.com/richardcrng/redux-leaves/tree/master/docs)
- [Action creators: `create`](https://github.com/richardcrng/redux-leaves/tree/master/docs/create)
- [Custom action creators via `customLogic`](https://github.com/richardcrng/redux-leaves/tree/master/docs/customLogic.md)