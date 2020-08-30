import riduce, { ReducerDefinition } from "."

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

  const [reducer, actions] = riduce(initialState)

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

describe('Custom reducers', () => {
  const initialState = {
    shallow: true,
    nested: {
      counter: 4,
      state: {
        deep: 'somewhat'
      }
    },
    list: [1, 2, 3]
  }

  const multiplyBy: ReducerDefinition<{
    args: [number], payload: number, leafState: number
  }> = {
    argsToPayload: (num) => num,
    reducer: (leafState, action) => leafState * action.payload
  }

  const appendDoubleWithCounter: ReducerDefinition<{
    args: [number], payload: number, leafState: number[], treeState: typeof initialState
  }> = {
    argsToPayload: (num) => num * 2,
    reducer: (leafState, action, treeState) => [
      ...leafState,
      action.payload,
      treeState.nested.counter
    ]
  }

  const shout = (leafState: string) => leafState.toUpperCase()

  const [reducer, actions] = riduce(initialState, {
    multiplyBy,
    appendDoubleWithCounter,
    shout
  })

  test('Reducer with one argument', () => {
    const result = reducer(
      initialState,
      actions.nested.state.deep.create.shout()
    )

    expect(result).toStrictEqual({
      ...initialState,
      nested: {
        ...initialState.nested,
        state: {
          ...initialState.nested.state,
          deep: initialState.nested.state.deep.toUpperCase()
        }
      }
    })
  })

  test('Reducer with two argument', () => {
    const result = reducer(
      initialState,
      actions.nested.counter.create.multiplyBy(4)
    )

    expect(result).toStrictEqual({
      ...initialState,
      nested: {
        ...initialState.nested,
        counter: initialState.nested.counter * 4
      }
    })
  })

  test('Reducer with three arguments', () => {
    const result = reducer(
      initialState,
      actions.list.create.appendDoubleWithCounter(10)
    )

    expect(result).toStrictEqual({
      ...initialState,
      list: [...initialState.list, 20, initialState.nested.counter]
    })
  })
})