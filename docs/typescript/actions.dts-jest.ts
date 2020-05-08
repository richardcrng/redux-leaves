import reduxLeaves from "../../src"


// @dts-jest:group actions
{
  const initialState = {
    shallow: true,
    nested: {
      counter: 0,
      state: {
        deep: 'somewhat'
      }
    }
  }

  const [reducer, actions] = reduxLeaves(initialState)

  // @dts-jest:pass
  actions.shallow

  // @dts-jest:fail
  actions.foobar

  // @dts-jest:pass
  actions.nested.counter

  // @dts-jest:fail
  actions.nested.string
}