# Riduce

**Get *rid* of your reducer boilerplate!**

*Zero hassle state management that's typed, flexible and scalable.*

```bash
npm install riduce
```

![Travis (.org)](https://img.shields.io/travis/richardcrng/riduce.svg)
[![Coverage Status](https://coveralls.io/repos/github/richardcrng/riduce/badge.svg?branch=buttons)](https://coveralls.io/github/richardcrng/riduce?branch=buttons)
[![bundle size](https://badgen.net/bundlephobia/min/riduce)](https://badgen.net/bundlephobia/min/riduce)
[![npm version](https://badge.fury.io/js/riduce.svg)](https://badge.fury.io/js/riduce)

Whether you're using `useReducer` or `redux`, reducer boilerplate is tedious to learn, setup and maintain.

What if type-safe state management was quicker, easier and simpler?

Riduce is a library written for developers to be:
- **Strongly-typed**, so your state stays predictable
- **Trivial to scale** as your state grows more complex
- **Zero hassle**, with *just two lines of code...*

... and one of the 2 lines to setup is an `import`.

```ts
import riduce from 'riduce'

const [reducer, actions] = riduce(initialState)
```

That's it! Now you've got a type-safe `reducer` and arbitrary `actions`, with zero hassle.

Let's see it in use!

## Example
For a `useReducer` example, [see this CodeSandbox](https://codesandbox.io/s/riduce-example-madlibs-for-developers-njo9t).

For a `redux` example, keep reading on:
1. [Zero hassle setup](#zero-hassle-setup) with 2 lines of code;
2. [Scalable state management](#scalable-state-management) with arbitrary actions; and
3. [Typed action creators](#typed-action-creators) to mirror your state's shape.

### Zero hassle setup
💭 Let's imagine we're controlling the state for a museum.
```ts
import { createStore } from 'redux'
import riduce from 'riduce' // <<< 1 line to import

const museumState = {
  isOpen: false,
  visitor: {
    counter: 0,
    guestbook: ['richard woz here']
  }
}

const [reducer, actions] = riduce(museumState) // <<< 1 line to setup
const { getState, dispatch } = createStore(reducer)
```
🏎️ **And that's it.** Those two lines replace *all* of our reducer boilerplate.

### Scalable state management
Continuing on from [above](#zero-hassle-setup), let's:
1. Open our museum;
2. Add to the visitor counter;
3. Sign the guestbook; and
4. Amend a guestbook entry.

🤮 Previously, you might create 4 x reducer branches, action types and action creators.

😍 **Riducer gets rid of all that boilerplate.**

😎 Now, it's as simple as describing the changes we want to see!

```ts
// at `state.isOpen`, create an action to toggle the boolean
dispatch(actions.isOpen.create.toggle())

// at `state.visitor.counter`, create an action to add 5
dispatch(actions.visitor.counter.create.increment(5))

// at `state.visitor.guestbook`, create an action to push a string
dispatch(actions.visitor.guestbook.create.push('LOL from js fan'))

// at `state.visitor.guestbook[0]`, create an action to concat a string
dispatch(actions.visitor.guestbook[0].create.concat('!!!'))

getState()
/*
  {
    isOpen: true,
    visitor: {
      counter: 5,
      guestbook: [
        'richard woz here!!!',
        'LOL from js fan'
      ]
    }
  }
*/
```
All this is possible because Riduce's `actions` gives you **loads of convenient action creators out of the box**, which you can *use liberally throughout your state tree:* `update`, `set`, `filter`, `reset`, and many more...

🧠 It's also possible to add your own in. *(TODO: add documentation for this.)*

### Typed action creators
🤓 Now we've seen that Riduce is [zero-hassle setup](#zero-hassle-setup) for [arbitrary action creators without the reducer boilerplate](#scalable-state-management). 

💪 It's written in TypeScript, so it's helpfully typed right out of the box as well!

```ts
// ❌ can we push to a boolean? no!
// (ts 2339) Property 'push' does not exist on type...
actions.isOpen.create.push()

// ❌ can we push to an array without an argument? no!
// (ts 2554) Expected 1-3 arguments, but got 0.
actions.visitor.guestbook.create.push()

// ❌ can we push a number to an inferred string[]? no!
// (ts 2345) Argument of type '10' is not assignable to parameter of type 'string'.
actions.visitor.guestbook.create.push(10)

// ✅ can we push a string to an inferred string[]? yeah, okay then.
actions.visitor.guestbook.create.push('10')
```
