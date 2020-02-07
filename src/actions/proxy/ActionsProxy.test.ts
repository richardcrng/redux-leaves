import util from 'util'
import ActionsProxy from '.';

describe('ActionsProxy class with empty state and empty leaf reducers dictionary', () => {
  describe('GIVEN actions = new ActionsProxy({})', () => {
    const actions = new ActionsProxy({}, {})

    it('THEN actions is a Proxy instance', () => {
      expect(util.types.isProxy(actions)).toBeTruthy()
    })
  })
})