# Riduce 👻

**Get *rid* of your reducer boilerplate!**

*Zero hassle state management that's typed, flexible and scalable.*

## Advanced usage
You've seen how Riduce provides [zero hassle setup, scalable state management and typesafe action creators](../README.md).

There's *even more* that you can do with Riduce:
1. [Bundle multiple actions](#bundle-multiple-actions) into a single dispatch;
2. [Execute arbitrary reducer logic](#execute-arbitrary-reducer-logic) for extendability;
3. [Add custom reducers](#scalable-state-management) for reusability; and
4. [Control action type](#typed-action-creators) for debugging (e.g. Redux DevTools).

### Bundle multiple actions
```ts
import { createStore } from 'redux'
import riduce from 'riduce'

const museumState = {
  isOpen: false,
  visitor: {
    counter: 0,
    guestbook: ['richard woz here']
  }
}

const [reducer, actions] = riduce(museumState)
const { getState, dispatch } = createStore(reducer)
```
Riduce's `actions` gives us access to lots of atomic action creators at any node on our state tree, e.g.
- `actions.isOpen.create.toggle()`
- `actions.visitor.counter.create.increment(5)`
- `actions.visitor.guestbook.create.push("LOL from js fan")`

We can build a single complex action out of these atomic actions using `bundle`:

```ts
import { bundle } from 'redux-leaves'

const actionsBundle = bundle([
  actions.isOpen.create.toggle(),
  actions.visitor.counter.create.increment(5),
  actions.visitor.guestbook.create.push("LOL from js fan")
])

dispatch(actionsBundle)

getState()
/*
{
  isOpen: true,
  visitor: {
    counter: 5,
    guestbook: [
      'richard woz here',
      'LOL from js fan'
    ]
  }
}
*/
```


## Get started
You may wish to check out the following:
- [Riduce with `useReducer`: CodeSandbox demo](https://codesandbox.io/s/riduce-example-madlibs-for-developers-njo9t)
- [Riduce with Redux: Repl.it demo](https://repl.it/@richardcrng/Riduce-with-Redux)

Have fun adding it to your project!

```bash
npm install riduce
```