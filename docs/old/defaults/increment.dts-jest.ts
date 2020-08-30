import riduce from '../../../src';

const initialState = {
  bool: false,
  num: 2,
  str: 'foo',
  arr: [1, 2, 3],
  obj: { num: 5, names: [['a', 'e'], ['b, c']]}
}

const [_, actions] = riduce(initialState)

// @dts-jest:group Incrememnt default creator
{
  // @dts-jest:fail does not exist on boolean state
  actions.bool.create.increment

  // @dts-jest:pass exists on number state
  actions.num.create.increment

  // @dts-jest:pass does not need an argument
  actions.num.create.increment()

  // @dts-jest:pass can take one numerical argument
  actions.num.create.increment(5)

  // @dts-jest:fail does not take non-numerical argument
  actions.num.create.increment('5')
}