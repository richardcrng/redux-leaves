import riduce from '../../../src';

const initialState = {
  num: 2,
  arr: [1, 2, 3],
  bool: true
}

const [_, actions] = riduce(initialState)

// @dts-jest:pass Allows reset on an array branch
actions.arr.create.reset()

// @dts-jest:pass Allows reset on an array element
actions.arr[1].create.reset()

// @dts-jest:fail Type error on an argument provided
actions.arr.create.reset([])