import riduce from '../../src';

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
  actions.bool.create.assign

  // @dts-jest:pass exists on object state
  actions.obj.create.assign

  // @dts-jest:pass exists on root if object
  actions.create.assign

  // @dts-jest:fail needs an argument
  actions.obj.create.assign()

  // @dts-jest:pass accepts partial match
  actions.obj.create.assign({ num: 2 })

  // @dts-jest:fail rejects inconsistent match
  actions.obj.create.assign({ num: '2' })

  // @dts-jest:fail rejects inconsistent property
  actions.nested.create.assign({ banana: true })

  // @dts-jest:pass accepts empty object
  actions.obj.create.assign({})

  // @dts-jest:pass accepts full match
  actions.obj.create.assign({ num: 101, names: [['c', 'a', 't']] })
}

// @dts-jest:group Explicitly typed state
{
  interface State {
    bool: boolean,
    num: number,
    str: string,
    arr: number[],
    nested: { deep: boolean, here?: string },
    obj: { num: number, names: string[][] }
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
  actions.bool.create.assign

  // @dts-jest:pass exists on object state
  actions.obj.create.assign

  // @dts-jest:pass exists on root if object
  actions.create.assign

  // @dts-jest:fail needs an argument
  actions.obj.create.assign()

  // @dts-jest:pass accepts partial match
  actions.obj.create.assign({ num: 2 })

  // @dts-jest:fail rejects inconsistent match
  actions.obj.create.assign({ num: '2' })

  // @dts-jest:fail rejects inconsistent property
  actions.nested.create.assign({ banana: true })

  // @dts-jest:pass accepts optional property
  actions.nested.create.assign({ here: 'you bet' })

  // @dts-jest:pass accepts empty object
  actions.obj.create.assign({})

  // @dts-jest:pass accepts full match
  actions.obj.create.assign({ num: 101, names: [['c', 'a', 't']] })
}