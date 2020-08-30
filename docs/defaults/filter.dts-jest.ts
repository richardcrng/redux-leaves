import riduce from '../../src';

const initialState = {
  bool: false,
  num: 2,
  str: 'foo',
  arr: [1, 2, 3],
  obj: { num: 5, names: [['a', 'e'], ['b, c']] }
}

const [_, actions] = riduce(initialState)

// @dts-jest:group Filter default creator
{
  // @dts-jest:fail does not exist on boolean state
  actions.bool.create.filter

  // @dts-jest:pass exists on array state
  actions.arr.create.filter

  // @dts-jest:pass exists on nested array state
  actions.obj.names[0].create.filter

  // @dts-jest:fail requires an argument
  actions.arr.create.filter()

  // @dts-jest:pass infers a callback argument of a numnber
  actions.arr.create.filter(n => (n % 2) === 0)

  // @dts-jest:fail refuses callback that doesn't treat as number
  actions.arr.create.filter(n => n.toLowerCase())
}