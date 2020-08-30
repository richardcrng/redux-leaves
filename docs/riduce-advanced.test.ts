import { createStore } from 'redux'
import riduce, { bundle } from '../src'

describe('Advanced usage', () => {
  test('Bundle multiple actions', () => {
    const museumState = {
      isOpen: false,
      visitor: {
        counter: 0,
        guestbook: ['richard woz here']
      }
    }

    const [reducer, actions] = riduce(museumState)
    const { getState, dispatch } = createStore(reducer)

    const actionsBundle = bundle([
      actions.isOpen.create.toggle(),
      actions.visitor.counter.create.increment(5),
      actions.visitor.guestbook.create.push("LOL from js fan")
    ])

    dispatch(actionsBundle)

    expect(getState()).toStrictEqual({
      isOpen: true,
      visitor: {
        counter: 5,
        guestbook: [
          'richard woz here',
          'LOL from js fan'
        ]
      }
    })
  })

  test('Execute arbitrary reducer logic', () => {
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
    expect(getState().stock).toStrictEqual({
      margherita: 100,
      pepperoni: 20
    })

    const openIfSurplusStock = actions.isOpen.create.do(
      (leafState, treeState) => {
        const hasEnoughStock = treeState.stock.margherita > 10
        return {
          forEatIn: leafState.forEatIn || hasEnoughStock,
          forTakeOut: leafState.forTakeOut || hasEnoughStock
        }
      }
    )

    dispatch(openIfSurplusStock)
    expect(getState().isOpen).toStrictEqual({
      forEatIn: true,
      forTakeOut: true
    })
  })

  test('Add custom reducers', () => {
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
    expect(getState().tables[0]).toStrictEqual(
      { persons: 4, hasOrdered: true, hasPaid: true }
    )
     // => 

    dispatch(actions.tables[1].create.finishTable())
    expect(getState().tables[1]).toStrictEqual(
      { persons: 3, hasOrdered: true, hasPaid: true }
    )

    dispatch(actions.stock.ramen.create.decreaseValuesBy(1))
    expect(getState().stock.ramen).toStrictEqual({
      beef: 4, veg: 1
    })

    dispatch(actions.stock.sushi.create.decreaseValuesBy(4))
    expect(getState().stock.sushi).toStrictEqual({
      nigiri: 6, sashimi: 0
    })
  })
})