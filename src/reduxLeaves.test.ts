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

  Object.freeze(initialState)

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
  })

  describe('Reducer and actions update state appropriately', () => {
    test('Updating a boolean', () => {
      const result = reducer(
        initialState,
        actions.shallow.create.update(false)
      )

      expect(result).toStrictEqual({
        ...initialState,
        shallow: false
      })
    })

    test('Updating a deeply nested string', () => {
      const result = reducer(
        initialState,
        actions.nested.state.deep.create.update('banana')
      )

      expect(result).toStrictEqual({
        ...initialState,
        nested: {
          ...initialState.nested,
          state: {
            ...initialState.nested.state,
            deep: 'banana'
          }
        }
      })
    })
  })
})