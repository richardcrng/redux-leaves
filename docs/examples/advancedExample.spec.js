import { createStore } from 'redux';
import reduxLeaves from '../../src';


describe('Advanced example', () => {
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
      duplicate: (leafState, { payload }) => leafState.concat(leafState)
    }

    const [reducer, actions] = reduxLeaves(initialState, reducersDict)

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
})