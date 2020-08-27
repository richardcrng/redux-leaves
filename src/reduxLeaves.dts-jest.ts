import reduxLeaves from "./"


// @dts-jest:group Actions shape mirrors state
{
  const initialState = {
    shallow: true,
    nested: {
      counter: 0,
      state: {
        deep: 'somewhat'
      }
    },
    list: [1, 2, 3]
  }

  const [reducer, actions] = reduxLeaves(initialState)

  // @dts-jest:pass Root actions has a create
  actions.create

  // @dts-jest:pass
  actions.create.update

  // @dts-jest:pass Root actions create.update takes state shape
  actions.create.update({
    shallow: false,
    nested: {
      counter: 5,
      state: {
        deep: 'foobar'
      }
    },
    list: [4, 10, 2]
  })

  // @dts-jest:fail Root actions create.update requires argument
  actions.create.update()

  // @dts-jest:fail Root actions create.update requires conforming argument
  actions.create.update({ shallow: 'false' })

  // @dts-jest:pass
  actions.shallow

  // @dts-jest:fail
  actions.foobar

  // @dts-jest:pass
  actions.nested.counter

  // @dts-jest:fail
  actions.nested.string
}

// @dts-jest:group Creator update is sensitive to the leaf type
{
  const initialState = {
    boolState: true,
    nested: {
      num: 0,
      state: {
        str: 'somewhat'
      }
    },
    numList: [1, 2, 3]
  }

  const [reducer, actions] = reduxLeaves(initialState)

  // @dts-jest:pass
  actions.boolState.create.update(true)

  // @dts-jest:pass
  actions.boolState.create.update(false)

  // @dts-jest:fail 
  actions.boolState.create.update('true')

  // @dts-jest:pass
  actions.nested.num.create.update(5)

  // @dts-jest:fail
  actions.nested.num.create.update('5')

  // @dts-jest:pass
  actions.nested.state.create.update({
    str: 'foobar'
  })

  // @dts-jest:fail
  actions.nested.state.create.update({
    randomKey: 'foobar'
  })

  // @dts-jest:pass
  actions.numList.create.update([2, 4, 8])

  // @dts-jest:fail
  actions.numList.create.update(['2', '4', '8'])
}