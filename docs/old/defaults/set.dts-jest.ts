import riduce from '../../../src';

// @dts-jest:group Inferred state
{
  const initialState = {
    bool: false,
    num: 2,
    str: 'foo',
    arr: [1, 2, 3],
    nested: { deep: true },
    obj: { num: 5, names: [['a', 'e'], ['b, c']] }
  }

  const [_, actions] = riduce(initialState)

  // @dts-jest:fail does not exist on boolean state
  actions.bool.create.set

  // @dts-jest:pass exists on object state
  actions.obj.create.set

  // @dts-jest:pass exists on root if object
  actions.create.set

  // @dts-jest:fail needs an argument
  actions.obj.create.set()

  // @dts-jest:fail requires more than one argument
  actions.obj.create.set('num')

  // @dts-jest:fail rejects inconsistent second argument
  actions.obj.create.set('num', '2')

  // @dts-jest:fail rejects inconsistent property
  actions.obj.create.set('notHere', 2)

  // @dts-jest:pass accepts correct match
  actions.obj.create.set('num', 2)
}

// @dts-jest:group Explicitly typed state
{
  interface State {
    bool: boolean,
    num: number,
    str: string,
    arr: number[],
    nested: { deep: boolean },
    obj: { num: number, names: string[][], here?: string }
  }

  const initialState: State = {
    bool: false,
    num: 2,
    str: 'foo',
    arr: [1, 2, 3],
    nested: { deep: true },
    obj: { num: 5, names: [['a', 'e'], ['b, c']] }
  }

  const [_, actions] = riduce(initialState)

  // @dts-jest:fail does not exist on boolean state
  actions.bool.create.set

  // @dts-jest:pass exists on object state
  actions.obj.create.set

  // @dts-jest:pass exists on root if object
  actions.create.set

  // @dts-jest:fail needs an argument
  actions.obj.create.set()

  // @dts-jest:fail requires more than one argument
  actions.obj.create.set('num')

  // @dts-jest:fail rejects inconsistent second argument
  actions.obj.create.set('num', '2')

  // @dts-jest:fail rejects inconsistent property
  actions.obj.create.set('notHere', 2)

  // @dts-jest:pass accepts optional property
  actions.obj.create.set('here', 'you bet')

  // @dts-jest:pass accepts correct match
  actions.obj.create.set('num', 2)
}