# redux-leaves

Write once. Reduce anywhere.

![Travis (.org)](https://img.shields.io/travis/richardcrng/redux-leaves.svg)
[![Coverage Status](https://coveralls.io/repos/github/richardcrng/redux-leaves/badge.svg?branch=buttons)](https://coveralls.io/github/richardcrng/redux-leaves?branch=buttons)
![David](https://img.shields.io/david/richardcrng/redux-leaves.svg)
[![install size](https://packagephobia.now.sh/badge?p=redux-leaves)](https://packagephobia.now.sh/result?p=redux-leaves)
[![npm version](https://badge.fury.io/js/redux-leaves.svg)](https://badge.fury.io/js/redux-leaves)
[![Maintainability](https://api.codeclimate.com/v1/badges/371605931cb9f824e25c/maintainability)](https://codeclimate.com/github/richardcrng/redux-leaves/maintainability)

#### Getting started
- [30 second demo](#30-second-demo)
- [Motivation](docs/motivation.md)

#### API reference
- [Core: `reduxLeaves(initialState, reducers)`](docs/README.md)

## 30 second demo

### 1. Write once.

```bash
npm install --save redux-leaves
```

```js
import { createStore } from 'redux'
import reduxLeaves from 'redux-leaves'

const initialState = {
  counter: 1,
  foo: ['foo'],
  nest: { deep: {} }
}

const reducers = {
  increment: leafState => leafState + 1,
  push: (leafState, { payload }) => [...leafState, payload],
  recurse: (leafState, { payload }, wholeState) => ({ ...leafState, [payload]: wholeState[payload] })
}

const [reducer, actions] = reduxLeaves(initialState, reducers)
const store = createStore(reducer)
```

### 2. Reduce anywhere.

```js
store.dispatch(actions.counter.create.increment())
console.log(store.getState()) // { counter: 2, foo: ['foo'], nest: { deep: {} } }

store.dispatch(actions.foo.create.push('bar'))
console.log(store.getState()) // { counter: 2, foo: ['foo', 'bar'], nest: { deep: {} } }

store.dispatch(actions.nest.deep.create.recurse('counter'))
console.log(store.getState())
/*
  {
    counter: 2,
    foo: ['foo', 'bar'],
    nest: {
      deep: { counter: 2 }
    }
  }
*/
```
