import reduxLeaves from "./reduxLeaves"

describe('Basic example', () => {

  const initialState = {
    shallow: true,
    nested: {
      counter: 0,
      state: {
        deep: 'somewhat'
      }
    },
    list: [1, 2, 3]
  }

  const [reducer, actions] = reduxLeaves(initialState)

  test('Actions shape mirrors state shape', () => {
    const toTest = [
      actions,
      actions.shallow,
      actions.nested,
      actions.nested.counter,
      actions.nested.state,
      actions.nested.state.deep,
      actions.list
    ]

    for (let testPath of toTest) {
      expect(testPath).toBeDefined()
      expect(testPath.create).toBeDefined()
      expect(testPath.create.update).toBeDefined()
      expect(typeof testPath.create.update).toBe('function')
    }

    // expect(actions.create).toBeDefined()
    // expect(actions.create.update).toBeDefined()
    // expect(typeof actions.create.update).toBe('function')

    
    // expect(actions.shallow).toBeDefined()
    // expect(actions.list).toBeDefined()
    // expect(actions.nested.counter).toBeDefined()
    // expect(actions.nested.state).toBeDefined()
    // expect(actions.nested.state.deep).toBeDefined()
  })
})