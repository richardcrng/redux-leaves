import riduce from '../../src';

const initialState = {
  bool: false,
  num: 2,
  str: 'foo',
  arr: [1, 2, 3],
  obj: { num: 5, names: [['a', 'e'], ['b, c']]}
}

const [_, actions] = riduce(initialState)

// @dts-jest:group Concat default creator
{
  // @dts-jest:fail does not exist on boolean state
  actions.bool.create.concat

  // @dts-jest:pass exists on array state
  actions.arr.create.concat

  // @dts-jest:pass exists on nested array state
  actions.obj.names[0].create.concat

  // @dts-jest:pass exists on string state
  actions.str.create.concat

  // @dts-jest:pass exists on nested string state
  actions.obj.names[0][0].create.concat

  // @dts-jest:pass takes suitable array on an array
  actions.arr.create.concat([4, 5, 6])

  // @dts-jest:fail type error on non-conforming array argument on array
  actions.arr.create.concat(['4'])

  // @dts-jest:fail type error on array argument on string
  actions.str.create.concat(['4'])

  // @dts-jest:pass takes string argument on a string
  actions.str.create.concat('4')
}