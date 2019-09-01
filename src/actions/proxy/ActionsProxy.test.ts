import util from 'util'
import ActionsProxy from '.';

describe('ActionsProxy class with empty state and empty leaf reducers dictionary', () => {
  describe('GIVEN actions = new ActionsProxy({})', () => {
    const actions = new ActionsProxy({}, {})

    it('THEN actions is a Proxy instance', () => {
      expect(util.types.isProxy(actions)).toBeTruthy()
    })

    describe('WHEN result = actions.test', () => {
      const result = actions.test

      it('THEN result is a Proxy instance', () => {
        expect(util.types.isProxy(result)).toBeTruthy()
      })

      it('AND result._path is equal to ["test"]', () => {
        expect(result._path).toEqual(['test'])
      })
    })

    describe('WHEN result = actions.test.arbitrarily.deep', () => {
      const result = actions.test.arbitrarily.deep

      it('THEN result is a Proxy instance', () => {
        expect(util.types.isProxy(result)).toBeTruthy()
      })

      it('AND result._path is equal to ["test", "arbitrarily", "deep"]', () => {
        expect(result._path).toEqual(["test", "arbitrarily", "deep"])
      })
    })
  })
})

describe('ActionsProxy class with empty state and non-empty leaf reducers dictionary', () => {
  describe('GIVEN actions = new ActionsProxy({})', () => {
    const actions = new ActionsProxy({}, {
      didAThing: {
        reducer: () => 'did a thing' 
      }
    })

    it('THEN actions is a Proxy instance', () => {
      expect(util.types.isProxy(actions)).toBeTruthy()
    })

    describe('WHEN result = actions.test', () => {
      const result = actions.test

      it('THEN result is a Proxy instance', () => {
        expect(util.types.isProxy(result)).toBeTruthy()
      })

      it('AND result._path is equal to ["test"]', () => {
        expect(result._path).toEqual(['test'])
      })

      it('AND result.create.didAThing is a function', () => {
        expect(typeof result.create.didAThing).toBe('function')
      })
      
      describe('AND action = result.create.didAThing()', () => {
        const action = result.create.didAThing()

        test('THEN action.leaf.path is equal to ["test"]', () => {
          expect(action.leaf.path).toEqual(["test"])
        })
      })
    })

    describe('WHEN result = actions.test.arbitrarily.deep', () => {
      const result = actions.test.arbitrarily.deep

      it('THEN result is a Proxy instance', () => {
        expect(util.types.isProxy(result)).toBeTruthy()
      })

      it('AND result._path is equal to ["test", "arbitrarily", "deep"]', () => {
        expect(result._path).toEqual(["test", "arbitrarily", "deep"])
      })

      it('AND result.create.didAThing is a function', () => {
        expect(typeof result.create.didAThing).toBe('function')
      })

      describe('AND action = result.create.didAThing()', () => {
        const action = result.create.didAThing()

        test('THEN action.leaf.path is equal to ["test", "arbitrarily", "deep"]', () => {
          expect(action.leaf.path).toEqual(["test", "arbitrarily", "deep"])
        })
      })
    })
  })
})