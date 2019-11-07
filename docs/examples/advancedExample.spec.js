import { createStore } from 'redux';
import reduxLeaves from '../../src';


describe('Advanced example', () => {
  describe('Custom types', () => {
    const [reducer, actions] = reduxLeaves({
      list: ['a', 'b'],
      nested: {
        state: {
          deep: 'somewhat'
        }
      }
    })

    test('It creates informative action types by default', () => {
      const actionToPushToList = actions.list.create.push('c')
      expect(actionToPushToList.type).toBe('list/PUSH')

      const actionToUpdateDeepState = actions.nested.state.deep.create.update('could go deeper')
      expect(actionToUpdateDeepState.type).toBe('nested/state/deep/UPDATE')
    })
  })
})