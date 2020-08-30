import riduce from '../../src';

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
  // @dts-jest:pass exists on boolean state
  actions.bool.create.toggle

  // @dts-jest:fail does not exist on number state
  actions.num.create.toggle

  // @dts-jest:pass does not need an argument
  actions.bool.create.toggle()

  // @dts-jest:fail rejects arguments
  actions.num.create.toggle(true)
}