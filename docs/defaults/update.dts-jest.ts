import riduce from '../../src';


// @dts-jest:group Explicit state typing
{
  interface State {
    bool: boolean,
    num: number,
    str: string,
    arr: { number: number }[],
    random?: any
  }

  const initialState: State = {
    bool: false,
    num: 2,
    str: 'foo',
    arr: [{ number: 4 }, { number: 2 }, { number: 7 }]
  }

  const [_, actions] = riduce(initialState)

  // @dts-jest:pass Root state can take state shape and doesn't need optional properties
  actions.create.update({
    bool: true,
    num: 5,
    str: 'whatever',
    arr: [{ number: 9 }]
  })

  // @dts-jest:pass Root state can take state shape allows optional properties
  actions.create.update({
    bool: true,
    num: 5,
    str: 'whatever',
    arr: [],
    random: { something: 'deep' }
  })

  // @dts-jest:fail Root state refuses non-conforming shape
  actions.create.update({ bool: true })
}

// @dts-jest:group Inferred state typing
{
  const initialState = {
    bool: false,
    num: 2,
    str: 'foo',
    arr: [{ number: 4 }, { number: 2 }, { number: 7 }]
  }

  const [_, actions] = riduce(initialState)

  // @dts-jest:pass Root state can take state shape
  actions.create.update({
    bool: true,
    num: 5,
    str: 'whatever',
    arr: [{ number: 9 }]
  })

  // @dts-jest:fail Root state refuses extra properties
  actions.create.update({ random: 'hello?' })

  // @dts-jest:fail Root state refuses non-conforming shape
  actions.create.update({ bool: true })
}
