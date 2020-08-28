import reduxLeaves from '../../src';

// @dts-jest:group Explicitly typed state
{
  interface State {
    num: number,
    foo: { [key: string]: string },
    bar: { [key: string]: { id: string, text: string } }
  }

  const initialState: State = {
    num: 100,
    foo: {},
    bar: {}
  }

  const [_, actions] = reduxLeaves(initialState)

  // @dts-jest:fail does not exist on number state
  actions.num.create.pushedSet

  // @dts-jest:pass exists on object state
  actions.foo.create.pushedSet

  // @dts-jest:fail refuses inappropriate value
  actions.foo.create.pushedSet(4)

  // @dts-jest:pass accepts appropriate value
  actions.foo.create.pushedSet('4')

  // @dts-jest:pass accepts a callback
  actions.foo.create.pushedSet(id => id.toUpperCase())

  // @dts-jest:pass accepts a callback returning correct shape
  actions.bar.create.pushedSet(id => ({ id, text: 'hello world!' }))

  // @dts-jest:fail refuses callback returning incorrect shape
  actions.bar.create.pushedSet(id => ({ id, text: 1010 }))
}