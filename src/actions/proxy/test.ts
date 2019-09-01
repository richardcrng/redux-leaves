import ActionsProxy from "./";
import util from 'util'

describe('GIVEN a newly instantiated ActionsProxy, actions = new ActionsProxy()', () => {
  const actions = new ActionsProxy()

  it('THEN actions is a typeof Proxy', () => {
    expect(util.types.isProxy(actions)).toBeTruthy()
  })

  // describe('WHEN result = actions.test', () => {
  //   const result = actions.test
  // })
})