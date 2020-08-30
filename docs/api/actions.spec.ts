import riduce from '../../src';

describe('actions can take an arbitrary path of properties after it', () => {
  const initialState = {
    counter: 0,
    arbitrary: {
      nested: {
        path: ['hi!']
      }
    }
  }

  const [reducer, actions] = riduce(initialState)

  test('Any arbitrary path returns an object', () => {
    expect(typeof actions.counter).toBe('object')
    expect(typeof actions.arbitrary.nested).toBe('object')
    expect(typeof actions.arbitrary.nested.path).toBe('object')
    // @ts-ignore
    expect(typeof actions.not.in.my.initial.state).toBe('object')
  })

  test('Any arbitrary path has the create function property', () => {
    expect(typeof actions.create).toBe('function')
    expect(typeof actions.counter.create).toBe('function')
    expect(typeof actions.arbitrary.nested.create).toBe('function')
    expect(typeof actions.arbitrary.nested.path.create).toBe('function')
    // @ts-ignore
    expect(typeof actions.not.in.my.initial.state.create).toBe('function')
  })

  test("You can't access arbitrary paths from create", () => {
    // @ts-ignore
    expect(typeof actions.create.arbitrary).toBe('undefined')
  })
})