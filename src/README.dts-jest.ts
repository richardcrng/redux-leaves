import { createStore } from "redux"
import riduce from "."

const museumState = {
  isOpen: false,
  visitor: {
    counter: 0,
    guestbook: ['richard woz here']
  }
}

const [reducer, actions] = riduce(museumState)
const { getState, dispatch } = createStore(reducer)

// @dts-jest:group Typed actions
{
  // @dts-jest:fail
  actions.isOpen.create.push()

  // @dts-jest:fail
  actions.visitor.guestbook.create.push()

  // @dts-jest:fail
  actions.visitor.guestbook.create.push(10)

  // @dts-jest:pass
  actions.visitor.guestbook.create.push('10')

  // @dts-jest:pass
  dispatch(actions.visitor.guestbook.create.push('10'))
}