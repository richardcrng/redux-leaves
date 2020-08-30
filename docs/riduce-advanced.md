# Riduce 👻

**Get *rid* of your reducer boilerplate!**

*Zero hassle state management that's typed, flexible and scalable.*

## Advanced usage
You've seen how Riduce provides [zero hassle setup, scalable state management and typesafe action creators](../README.md).

There's *even more* that you can do with Riduce:
1. [Bundle multiple actions](#bundle-multiple-actions) into a single dispatch;
2. [Execute arbitrary reducer logic](#execute-arbitrary-reducer-logic) for extendability;
3. [Add custom reducers](#add-custom-reducers) for reusability; and
4. [Control action type](#control-action-type) for debugging (e.g. Redux DevTools).

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

#### Shorthand examples
```ts
const restaurantState = {
  tables: [
    { persons: 4, hasOrdered: false, hasPaid: false },
    { persons: 3, hasOrdered: true, hasPaid: false }
  ],
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

/*
 * Note: I'm typing in a slightly unorthodox way
 *  in the hope that this is more friendly for
 *  non-TypeScript users.
 * 
 * (I suggest explicitly typing state.)
 */
type Table = typeof restaurantState['tables'][0]

const finishTable = (tableState: Table) => ({
  ...tableState,
  hasOrdered: true,
  hasPaid: true
})

const decreaseValuesBy = (leafState: Record<string, number>, action) => {
  const keys = Object.keys(leafState)
  return keys.reduce((acc, key) => ({
    ...acc,
    [key]: leafState[key] - action.payload
  }), {})
}

const [reducer, actions] = riduce(restaurantState, {
  finishTable,
  decreaseValuesBy
})

const { getState, dispatch } = createStore(reducer)

dispatch(actions.tables[0].create.finishTable())
getState().tables[0] // => { persons: 4, haveOrdered: true, havePaid: true }

dispatch(actions.tables[1].create.finishTable())
getState().tables[1] // => { persons: 3, haveOrdered: true, havePaid: true }

// ❌ TypeError: (ts 2339) Property 'finishTable' does not exist on type...
actions.stock.ramen.create.finishTable()

dispatch(actions.stock.ramen.create.decreaseValuesBy(1))
getState().stock.ramen // => { beef: 1, veg: 1 }

dispatch(actions.stock.sushi.create.decreaseValuesBy(0))
getState().stock.sushi // => { nigiri: 0, sashimi: 0 }

// ❌ TypeError: (ts 2339) Property 'decreaseValuesBy' does not exist on type...
actions.tables.create.decreaseValuesBy()
```




## Get started
You may wish to check out the following:
- [Riduce with `useReducer`: CodeSandbox demo](https://codesandbox.io/s/riduce-example-madlibs-for-developers-njo9t)
- [Riduce with Redux: Repl.it demo](https://repl.it/@richardcrng/Riduce-with-Redux)

Have fun adding it to your project!

```bash
npm install riduce
```