import reduxLeaves from '../../src';

const initialState = {
  bool: false,
  num: 2,
  str: 'foo',
  arr: [1, 2, 3],
  obj: { num: 5, names: [['a', 'e'], ['b, c']]}
}

const [_, actions] = reduxLeaves(initialState)

// @dts-jest:group Push default creator
{
  // @dts-jest:fail does not exist on boolean state
  actions.bool.create.push

  // @dts-jest:pass exists on array state
  actions.arr.create.push

  // @dts-jest:pass exists on nested array state
  actions.obj.names[0].create.push

  // @dts-jest:fail requires an argument
  actions.arr.create.push()

  // @dts-jest:pass can take appropriate element type as argument
  actions.arr.create.push(2)

  // @dts-jest:fail refuses non-appropriate element types
  actions.arr.create.push('2')

  // @dts-jest:pass can take an index as a second argument
  actions.obj.names.create.push(['x', 'y', 'z'], 1)

  // @dts-jest:pass can take boolean as a third argument
  actions.obj.names.create.push(['x', 'y', 'z'], 1, true)
}