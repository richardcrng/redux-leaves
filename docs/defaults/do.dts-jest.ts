import riduce from '../../src';

const initialState = {
  bool: false,
  num: 2,
  str: 'foo',
  arr: [1, 2, 3],
  obj: { num: 5, str: 'bar' }
}

const [_, actions] = riduce(initialState)

// @dts-jest:pass Allows string callback for string state
actions.str.create.do(state => state.toUpperCase())

// @dts-jest:fail Doesn't allow array callback for string state
actions.str.create.do(state => state.push(4))

// @dts-jest:pass Allows returning appropriate branch
actions.obj.create.do(state => ({ num: 7, str: 'foo' }))

// @dts-jest:fail Disallows returning non-conforming branch
actions.obj.create.do(state => ({ num: '7', str: 'foo' }))

// @dts-jest:pass Allows using a callback with a second argument of treeState
actions.arr.create.do((state, treeState) => [...state, treeState.num])

// @dts-jest:fail Disallows using a callback with a non-conforming argument of treeState
actions.arr.create.do((state, treeState) => [...state, treeState.str])