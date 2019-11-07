import { createStore } from 'redux';
import reduxLeaves from '../../src';


describe('Advanced example', () => {
  describe('Custom types', () => {
    const initialState = {
      list: ['a', 'b'],
      nested: {
        state: {
          deep: 'somewhat'
        }
      }
    }

    const reducersDict = {
      duplicate: (leafState, { payload }) => leafState.concat(leafState)
    }

    const [reducer, actions] = reduxLeaves(initialState, reducersDict)

    test('It creates informative action types by default', () => {
      const actionToPushToList = actions.list.create.push('c')
      expect(actionToPushToList.type).toBe('list/PUSH')

      const actionToDuplicateList = actions.list.create.duplicate()
      expect(actionToDuplicateList.type).toBe('list/DUPLICATE')

      const actionToUpdateDeepState = actions.nested.state.deep.create.update('could go deeper')
      expect(actionToUpdateDeepState.type).toBe('nested/state/deep/UPDATE')
    })
  })
})