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
        margherita: 1,
        pepperoni: 100
      },
      isOpen: {
        forEatIn: false,
        forTakeOut: true
      }
    }

    const [reducer, actions] = riduce(pizzaShopState)
    const { getState, dispatch } = createStore(reducer)

    const swapStock = actions.stock.create.do(leafState => ({
      margherita: leafState.pepperoni,
      pepperoni: leafState.margherita
    }))

    dispatch(swapStock)
    expect(getState().stock).toStrictEqual({
      margherita: 100,
      pepperoni: 1
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
})