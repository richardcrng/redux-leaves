import reduxLeaves from '../../src';

const initialState = {
  bool: false,
  num: 2,
  str: 'foo',
  arr: [1, 2, 3],
  nested: { deep: true },
  obj: { num: 5, names: [['a', 'e'], ['b, c']] }
}

const [_, actions] = reduxLeaves(initialState)

// @dts-jest:fail does not exist on boolean state
actions.bool.create.path

// @dts-jest:pass exists on object state
actions.obj.create.path

// @dts-jest:pass exists on root if object
actions.create.path

// @dts-jest:fail needs an argument
actions.obj.create.path()

// @dts-jest:fail needs two arguments
actions.obj.create.path(['go', 'deep'])

// @dts-jest:pass accepts two arguments, string of arrays and a value
actions.obj.create.path(['go', 'deep'], true)

// @dts-jest:fail must be string of arrays followed by value
actions.obj.create.path(true, ['go', 'deep'])