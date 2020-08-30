import { createStore } from 'redux';
import riduce, { bundle } from '../../src';


describe('Advanced example', () => {
  describe("Bundling actions", () => {
    const initialState = {
      list: ['a', 'b'],
      nested: {
        counter: 0,
        state: {
          deep: 'somewhat',
          arbitrary: false
        }
      }
    }

    const [reducer, actions] = riduce(initialState)
    const store = createStore(reducer)

    test("Actions get bundled into a single action which updates multiple leaves of state", () => {
      const actionBundle = bundle([
        actions.list.create.push('c'),
        actions.nested.counter.create.increment(5),
        actions.nested.state.create.set('arbitrary', true)
      ])

      store.dispatch(actionBundle)
      expect(store.getState()).toEqual({
        list: ['a', 'b', 'c'],
        nested: {
          counter: 5,
          state: {
            arbitrary: true,
            deep: 'somewhat'
          }
        }
      })
    })
  })

  describe('Custom types', () => {
    const initialState = {
      list: ['a', 'b'],
      nested: {
        counter: 0,
        state: {
          deep: 'somewhat'
        }
      }
    }

    const reducersDict = {
      duplicate: (leafState: any[]) => leafState.concat(leafState)
    }

    const [reducer, actions] = riduce(initialState, reducersDict)

    it('Creates informative action types by default', () => {
      const actionToPushToList = actions.list.create.push('c')
      expect(actionToPushToList.type).toBe('list/PUSH')

      const actionToDuplicateList = actions.list.create.duplicate()
      expect(actionToDuplicateList.type).toBe('list/DUPLICATE')

      const actionToUpdateDeepState = actions.nested.state.deep.create.update('could go deeper')
      expect(actionToUpdateDeepState.type).toBe('nested/state/deep/UPDATE')
    })

    test('You can override the default action type', () => {
      const appendLetter = actions.list.create('APPEND_LETTER').push
      expect(appendLetter('c').type).toBe('APPEND_LETTER')

      const duplicateList = actions.list.create('DUPLICATE_LIST').duplicate
      expect(duplicateList().type).toBe('DUPLICATE_LIST')
    })

    test("Overriding action type doesn't change how the reducer responds", () => {
      const store = createStore(reducer)
      expect(store.getState().list).toEqual(['a', 'b'])

      store.dispatch(actions.list.create('APPEND_LETTER').push('c'))
      expect(store.getState().list).toEqual(['a', 'b', 'c'])

      store.dispatch(actions.list.create('DUPLICATE_LIST').duplicate())
      expect(store.getState().list).toEqual(['a', 'b', 'c', 'a', 'b', 'c'])
    })
  })

  describe('Controlling payloads', () => {
    const initialState = {
      counter: 0
    }

    const reducersDict = {
      addMultiple: {
        argsToPayload: (...args: number[]) => args,
        reducer: (leafState: number, { payload }: { payload: number[] }) => payload.reduce((acc, val) => acc + val, leafState)
      },
      addFirstThing: (leafState: number, { payload } : { payload: number }) => leafState + payload
    }

    const [reducer, actions] = riduce(initialState, reducersDict)
    const store = createStore(reducer)

    test('We can configure to use custom argsToPayload', () => {
      expect(store.getState().counter).toBe(0)

      store.dispatch(actions.counter.create.addMultiple(4, 2, 10))
      expect(store.getState().counter).toBe(16)
    })

    test("If we don't configure, it uses only the first argument as payload", () => {
      expect(store.getState().counter).toBe(16)
      // @ts-ignore
      store.dispatch(actions.counter.create.addFirstThing(1, 100))
      expect(store.getState().counter).toBe(17)
    })
  })
})