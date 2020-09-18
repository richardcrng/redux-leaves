# Redux Leaves

Write once. Reduce anywhere.

![Travis (.org)](https://img.shields.io/travis/richardcrng/redux-leaves.svg)
[![Coverage Status](https://coveralls.io/repos/github/richardcrng/redux-leaves/badge.svg?branch=buttons)](https://coveralls.io/github/richardcrng/redux-leaves?branch=buttons)
[![bundle size](https://badgen.net/bundlephobia/min/redux-leaves)](https://badgen.net/bundlephobia/min/redux-leaves)
[![npm version](https://badge.fury.io/js/redux-leaves.svg)](https://badge.fury.io/js/redux-leaves)

## Example

```js
import { createStore } from 'redux'
import reduxLeaves, { bundle } from 'redux-leaves'

// set up with initial state
const initialState = {
  counter: 0,
  list: [],
  props: {}
}

const [reducer, actions] = reduxLeaves(initialState)
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

## Documentation
```bash
npm install --save redux-leaves
```

[Main documentation website](https://redux-leaves.js.org)

### Getting started
- [Overview](https://redux-leaves.js.org/docs/intro/overview)
- [30 second demo](https://runkit.com/richardcrng/redux-leaves-playground/)

### API reference
- [Core: `reduxLeaves(initialState, reducers)`](https://redux-leaves.js.org/docs/redux-leaves)

### Testing

To run all tests locally:

```bash
git clone git@github.com:richardcrng/redux-leaves.git
cd redux-leaves && npm run test a
```

Most tests are located alongside their relevant API documentation in the [docs](/docs) folder.
