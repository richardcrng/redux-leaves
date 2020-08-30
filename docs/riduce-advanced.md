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

### Execute arbitrary reducer logic
Sometimes the simple atomic action creators - `update`, `set`, `clear`... - won't feel sufficient.

The general purpose `do` can help with flexibility: it takes a callback of `(leafState, treeState) => newLeafState`.

```ts
const pizzaShopState = {
  stock: {
    margherita: 10,
    pepperoni: 20
  },
  isOpen: {
    forEatIn: false,
    forTakeOut: true
  }
}

const [reducer, actions] = riduce(pizzaShopState)
const { getState, dispatch } = createStore(reducer)

const squareMargheritaStock = actions.stock.margherita.create.do(leafState => leafState ** 2)

dispatch(squareMargheritaStock)
getState().stock // => { margherita: 100, pepperoni: 20 }

const openIfSurplusStock = actions.isOpen.create.do(
  (leafState, treeState) => {
    const hasEnoughStock = treeState.stock.margherita > 10
    return {
      forEatIn: leafState.forEatIn || hasEnoughStock,
      forTakeOut: leafState.forTakeOut || hasEnoughStock
    }
  }
)

getState().isOpen // => { forEatIn: true, forTakeOut: true }
```

### Add custom reducers
For reusability, sometimes you might want to abstract out some custom reducer logic which can then be executed at arbitrary leaf state.

```ts
interface Table {
  persons: number,
  hasOrdered: boolean,
  hasPaid: boolean
}

const restaurantState = {
  table: {
    front: { persons: 4, haveOrdered: false, hasPaid: false },
    back: { persons: 3, haveOrdered: true, hasPaid: false }
  },
  stock: {
    ramen: {
      beef: 5,
      veg: 2
    },
    sushi: {
      nigiri: 10,
      sashimi: 4
    }
  }
}

const finishTable = (tableState: Table) => ({
  ...tableState,
  hasOrdered: true,
  hasPaid: true
})

const setAllValuesTo = (leafState: { [key: string]: number }, action) => {
  const keys = Object.keys(leafState)
  return keys.reduce((acc, key) => ({
    ...acc,
    [key]: action.payload
  }), {})
}

const [reducer, actions] = riduce(restaurantState, {
  finishTable,
  setAllValuesTo
})

const { getState, dispatch } = createStore(reducer)

dispatch(actions.table[0].create.finishTable())
getState().table[0] // => { persons: 4, haveOrdered: true, havePaid: true }

dispatch(actions.table[1].create.finishTable())
getState().table[1] // => { persons: 3, haveOrdered: true, havePaid: true }

dispatch(actions.stock.ramen.create.setAllValuesTo(1))
getState().stock.ramen // => { beef: 1, veg: 1 }

dispatch(actions.stock.sushi.create.setAllValuesTo(0))
getState().stock.sushi // => { nigiri: 0, sashimi: 0 }
```




## Get started
You may wish to check out the following:
- [Riduce with `useReducer`: CodeSandbox demo](https://codesandbox.io/s/riduce-example-madlibs-for-developers-njo9t)
- [Riduce with Redux: Repl.it demo](https://repl.it/@richardcrng/Riduce-with-Redux)

Have fun adding it to your project!

```bash
npm install riduce
```