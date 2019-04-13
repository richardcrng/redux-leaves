# redux-leaves

Manage every leaf of your state tree with *pleasure*, *precision* and *predictability*.

## 30 second demo

### 1. Pleasingly little boilerplate

```bash
npm install --save richardcrng/redux-leaves#master
```

```js
import { createStore } from 'redux'
import reduxLeaves from 'redux-leaves'

const initialState = {
  counter: 0,
  foo: "foo",
  nested: {
    state: {
      deep: false,
      manageable: "maybe...?",
    }
  }
}

const reducer = reduxLeaves(initialState) // sets up a reducer for your initial state shape
const store = createStore(reducer)
```

### 2. Precise updates

```js
// All these action creators, and more, come with our reducer for free:

store.dispatch(reducer.counter.increment())
store.dispatch(reducer.foo.update("bar"))
store.dispatch(reducer.nested.state.deep.toggle())
store.dispatch(reducer.nested.state.manageable.apply(state => state.concat(" DEFINITELY!")))
```

### 3. Predictable changes
```js
// store.getState()
{
  counter: 1,
  foo: "bar",
  nested: {
    state: {
      deep: true,
      manageable: "maybe...? DEFINITELY!" // word.
    }
  }
}
// All with no mutation!
```

## Motivation

### Problem

I have found that [Redux](https://redux.js.org/) and [Redux DevTools](https://github.com/zalmoxisus/redux-devtools-extension) both work great for following what is happening in your app.<sup>1</sup>

However, there are three pain points that I encountered:

1. **Ugly boilerplate maintenance**: one more slice of state =  another load of action types, creators and reducers to write.
2. **Unhelpfully named constants**: what was `NONTRIVIAL_THING_HAPPENED` meant to do, again...?
3. **Repetitive reducer logic**: an action that updates some slice of state to true? *How novel!*

<sup>1</sup> *cf. what you* intended *to happen in your app...*

### Solution

`redux-leaves` is a library that is written to provide:

1. **Pleasingly little boilerplate**: set up reducer, action types and creators in one line
```js
const reducer = reduxLeaves(initialState)
```

2. **Precise updates**: easily increment that counter, no matter how deeply you nested it
```js
dispatch(reducer.distressingly.and.foolishly.deeply.nested.counter.increment(2))
```
3. **Predictable changes**: understand exactly what's happening with clear and consistently named action types:
```js
// the action dispatched above:
{ type: "distressingly/and/foolishly/deeply/nested/counter/INCREMENT", payload: 2 }
``` 

# API

## `reduxLeaves(initialState, [prefix])`

Creates a reducer function bundled with action creators at every [branch](#branch) and [leaf](#leaf).

### Parameters
- `initialState` *(any)*: the initial state shape for the reducer to use.
- `prefix` *(string, optional)*: a prefix that you want to supply to the reducer's attached action creator types, e.g. `'app/'`.

### Returns
`function(state, action)`: A reducer function intended for redux's `createStore()`.


## branch

## leaf
```js
function leaf(state, action) {
  // It knows its own logic!
}
```
A reducer function that is responsible for a granular piece of state. This is typically a `string`, `boolean` or `array`, but could be an `object`.

Every reducer leaf has the following action creators attached:

### `leaf.apply(callback)`

#### Parameters
- `callback` *(function)*: invoked by the leaf's reducer with the leaf's current state

#### Returns
`action` *(object)*: an object with properties:
- `leaf` *(string)*
- `type` *(string)*
- `payload` *(function)*: the callback provided

#### Usage
```js
store.dispatch(action)
// updates the leaf's state to the return value of callback(state).
```

### `leaf.clear()`

### `leaf.concat(array)`

### `leaf.drop(n)`

### `leaf.increment(n)`

### `leaf.off()`

### `leaf.on()`

### `leaf.push(element)`

### `leaf.reset()`

### `leaf.set(path, value)`

### `leaf.toggle()`

### `leaf.update(value)`