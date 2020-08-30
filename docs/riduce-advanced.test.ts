import { createStore } from 'redux'
import riduce, { bundle } from '../src'

describe('Advanced usage', () => {
  const museumState = {
    isOpen: false,
    visitor: {
      counter: 0,
      guestbook: ['richard woz here']
    }
  }

  const [reducer, actions] = riduce(museumState)
  const { getState, dispatch } = createStore(reducer)

  test('Bundle multiple actions', () => {
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
})