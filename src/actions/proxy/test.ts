import util from 'util'
import ActionsProxy from "./";
import { createActionsProxy } from "./actionsProxy";

describe('GIVEN a newly instantiated ActionsProxy, actions = new ActionsProxy()', () => {
  const actions = new ActionsProxy()

  it('THEN actions is a typeof Proxy', () => {
    expect(util.types.isProxy(actions)).toBeTruthy()
  })

  // describe('WHEN result = actions.test', () => {
  //   const result = actions.test
  // })
})

describe('createActionsProxy', () => {
  describe('GIVEN actions = createActionsProxy()', () => {
    const actions = createActionsProxy()

    it('THEN actions is a Proxy instance', () => {
      expect(util.types.isProxy(actions)).toBeTruthy()
    })

    describe('WHEN result = actions.test', () => {
      const result = actions.test

      it('THEN result is a Proxy instance', () => {
        expect(util.types.isProxy(result)).toBeTruthy()
      })
    })

    describe('WHEN result = actions.test.arbitrarily.deep', () => {
      const result = actions.test.arbitrarily.deep

      it('THEN result is a Proxy instance', () => {
        expect(util.types.isProxy(result)).toBeTruthy()
      })
    })
  })
})