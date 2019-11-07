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

  const reducersDict = {
    convertToFoobar: () => 'foobar'
  }

  const [reducer, actions] = reduxLeaves(initialState, reducersDict)

  test('All creates have default creatorKeys like update, set and push', () => {
    expect(typeof actions.counter.create.update).toBe('function')
    expect(typeof actions.arbitrary.nested.create.set).toBe('function')
    expect(typeof actions.arbitrary.nested.path.create.push).toBe('function')
  })

  test('All creates also have supplied custom creatorKeys', () => {
    expect(typeof actions.create.convertToFoobar).toBe('function')
    expect(typeof actions.arbitrary.nested.path.create.convertToFoobar).toBe('function')
  })

})