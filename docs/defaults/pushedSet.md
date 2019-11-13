---
id: pushed-set
title: pushed-set
hide_title: true
sidebar_label: pushed-set
---

# `pushedSet(value)`
**`create.pushedSet`**
**`create(actionType).pushedSet`**
*Appropriate leaf type: object*

Returns an (action) object that the [reduxLeaves](../README.md) reducer uses to non-mutatively update the leaf's state at an auto-generated key (that orders chronologically after previous keys) with `value`.

(This is inspired by the [Firebase Real-Time Database .push](https://firebase.google.com/docs/database/web/lists-of-data#append_to_a_list_of_data) and uses [their method for auto-generating keys](https://firebase.googleblog.com/2015/02/the-2120-ways-to-ensure-unique_68.html).)

## Parameters
- `value` *(any)*: the value to set

## Returns
`action` *(object)*: an object to dispatch to the store

## Example
```js
import { createStore } from 'redux'
import reduxLeaves from 'reduxLeaves'

const initialState = {
  foo: {},
}

const [reducer, actions] = reduxLeaves(initialState)
const store = createStore(reducer)
```

### Setting some new properties
```js
const pushedSetInFoo = actions.foo.create.pushedSet
store.dispatch(pushedSetInFoo('my first item'))
store.dispatch(pushedSetInFoo('my second item'))
console.log(store.getState().foo)
/*
  will look something like:
  {
    foo: {
      5bzqUkZnXzQIpIbg5dq8pzIrFVT2: 'my first item',
      B4y3IRRyR6hbFlu7s1HheCPPv5x1: 'my second item'
    }
  }
*/

// Auto-generated keys guarantee expected order iteration
const orderedValues = Object.values(store.getState().foo)
console.log(orderedValues) // ['my first item', 'my second item']
```