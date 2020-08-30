import reduxLeaves from '../../src';

const initialState = {
  bool: false,
  num: 2,
  str: 'foo',
  arr: [1, 2, 3],
  obj: { num: 5, names: [['a', 'e'], ['b, c']]}
}

const [_, actions] = reduxLeaves(initialState)

// @dts-jest:group Drop default creator
{
  // @dts-jest:fail does not exist on boolean state
  actions.bool.create.drop

  // @dts-jest:pass exists on array state
  actions.arr.create.drop

  // @dts-jest:pass exists on nested array state
  actions.obj.names[0].create.drop

  // @dts-jest:pass does not require an argument
  actions.arr.create.drop()

  // @dts-jest:pass can take a number as an argument
  actions.arr.create.drop(2)

  // @dts-jest:fail refuses non-number arguments
  actions.arr.create.drop('2')
}