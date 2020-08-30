# Riduce

**Get rid of your reducer boilerplate!**

*Typesafe reducers. Arbitrary actions. Zero hassle.*

![Travis (.org)](https://img.shields.io/travis/richardcrng/riduce.svg)
[![Coverage Status](https://coveralls.io/repos/github/richardcrng/riduce/badge.svg?branch=buttons)](https://coveralls.io/github/richardcrng/riduce?branch=buttons)
[![bundle size](https://badgen.net/bundlephobia/min/riduce)](https://badgen.net/bundlephobia/min/riduce)
[![npm version](https://badge.fury.io/js/riduce.svg)](https://badge.fury.io/js/riduce)

Whether you're using `useReducer` or `redux`, reducer boilerplate is boring, time-consuming and messy.

What if type-safe state management was quicker, easier and more scalable?

`riduce` is a library written for developers who want:
- **Typesafe reducers**, so your state stays predictable
- **Arbitrary actions**, without all the boilerplate
- **Zero hassle**, with *just two lines of setup...*

*... and one of those lines is an import.*

```ts
import riduce from 'riduce'

const [reducer, actions] = riduce(initialState)
```

and that's it! Now you've got a type-safe `reducer` and arbitrary `actions`, with zero hassle.

Let's see it in use!

## Example
We'll use Redux here, but `riduce` works just as well with 

```js
import riduce from 'riduce'
import { createStore } from 'redux'

const initialState = {
  rating: 10,
  adjectives: ['quick', 'easy'],
  
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

## Documentation
```bash
npm install --save riduce
```

[Main documentation website](https://riduce.js.org)

### Getting started
- [Overview](https://riduce.js.org/docs/intro/overview)
- [30 second demo](https://runkit.com/richardcrng/riduce-playground/)

### API reference
- [Core: `riduce(initialState, reducers)`](https://riduce.js.org/docs/riduce)

### Testing

To run all tests locally:

```bash
git clone git@github.com:richardcrng/riduce.git
cd riduce && npm run test a
```

Most tests are located alongside their relevant API documentation in the [docs](/docs) folder.
