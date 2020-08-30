import riduce, { ReducerDefinition } from "."
import { createStore } from 'redux'

describe('README', () => {
  const museumState = {
    isOpen: false,
    visitor: {
      counter: 0,
      guestbook: ['richard woz here']
    }
  }

  const [reducer, actions] = riduce(museumState) // <<< 1 line to setup
  const { getState, dispatch } = createStore(reducer)

  test('Scalable state management', () => {
    // at `state.isOpen`, create an action to toggle the boolean
    dispatch(actions.isOpen.create.toggle())

    // at `state.vistor.counter`, create an action to add 5
    dispatch(actions.visitor.counter.create.increment(5))

    // at `state.vistor.guestbook`, create an action to push a string
    dispatch(actions.visitor.guestbook.create.push('LOL from js fan'))

    // at `state.visitor.guestbook[0]`, create an action to concat a string
    dispatch(actions.visitor.guestbook[0].create.concat('!!!'))

    const result = getState()
    expect(result).toStrictEqual({
      isOpen: true,
      visitor: {
        counter: 5,
        guestbook: [
          'richard woz here!!!',
          'LOL from js fan'
        ]
      }
    })
  })
})

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