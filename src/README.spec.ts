import { createStore } from 'redux'
import riduce from '.'

describe('README', () => {
  const museumState = {
    isOpen: false,
    visitor: {
      counter: 0,
      guestbook: ['richard woz here']
    }
  }

  const [reducer, actions] = riduce(museumState)
  const { getState, dispatch } = createStore(reducer)

  test('Scalable state management', () => {
    // at `state.isOpen`, create an action to toggle the boolean
    dispatch(actions.isOpen.create.toggle())

    // at `state.vistor.counter`, create an action to add 5
    dispatch(actions.visitor.counter.create.increment(5))

    // at `state.vistor.guestbook`, create an action to push a string
    dispatch(actions.visitor.guestbook.create.push('LOL from js fan'))

    // at `state.visitor.guestbook[0]`, create an action to concat a string
    dispatch(actions.visitor.guestbook[0].create.concat('!!!'))

    const result = getState()
    expect(result).toStrictEqual({
      isOpen: true,
      visitor: {
        counter: 5,
        guestbook: [
          'richard woz here!!!',
          'LOL from js fan'
        ]
      }
    })
  })
})