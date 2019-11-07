import reduxLeaves from '../../src';

describe('actions can take an arbitrary path of properties after it', () => {
  const initialState = {
    counter: 0,
    arbitrary: {
      nested: {
        path: ['hi!']
      }
    }
  }

  const [reducer, actions] = reduxLeaves(initialState)

  test('Any arbitrary path returns an object', () => {
    expect(typeof actions.counter).toBe('object')
    expect(typeof actions.arbitrary.nested).toBe('object')
    expect(typeof actions.arbitrary.nested.path).toBe('object')
    expect(typeof actions.not.in.my.initial.state).toBe('object')
  })
})