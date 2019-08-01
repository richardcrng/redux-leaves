import { actionsFor } from "..";

describe('actionsFor', () => {
  describe('GIVEN an initialState of { foo: 1, bar: [] }', () => {
    const initialState = {
      foo: 1,
      bar: []
    }

    describe('WHEN customReducers = {}', () => {
      const customReducers = {}

      describe('AND result = actionsFor(initialState, customReducers)', () => {
        const result = actionsFor(initialState, customReducers)

        test('THEN the result is an object', () => {
          expect(typeof result).toBe('object')
        })

        test('AND result.create is an object', () => {
          expect(typeof result.create).toBe('object')
        })

        test('AND result.foo is an object', () => {
          expect(typeof result.foo).toBe('object')
        })

        test('AND result.foo.create is an object', () => {
          expect(typeof result.foo.create).toBe('object')
        })

        test('AND result.foo.create.increment is a function', () => {
          expect (typeof result.foo.create.increment).toBe('function')
        })

        test('AND result.bar is an object', () => {
          expect(typeof result.bar).toBe('object')
        })

        test('AND result.bar.create is an object', () => {
          expect(typeof result.bar.create).toBe('object')
        })

        test('AND result.bar.create.push is a function', () => {
          expect (typeof result.bar.create.push).toBe('function')
        })
      })
    })

    describe('WHEN doNothing = state => state', () => {
      const doNothing = (state: any) => state

      describe('AND customReducers = { doNothing }', () => {
        const customReducers = { doNothing }

        describe('AND result = actionsFor(initialState, customReducers)', () => {
          const result = actionsFor(initialState, customReducers)

          test('THEN the result is an object', () => {
            expect(typeof result).toBe('object')
          })

          test('AND result.create is an object', () => {
            expect(typeof result.create).toBe('object')
          })

          test('AND result.foo is an object', () => {
            expect(typeof result.foo).toBe('object')
          })

          test('AND result.foo.create is an object', () => {
            expect(typeof result.foo.create).toBe('object')
          })

          test('AND result.foo.create.increment is a function', () => {
            expect(typeof result.foo.create.increment).toBe('function')
          })

          test('AND result.foo.create.doNothing is a function', () => {
            expect(typeof result.foo.create.doNothing).toBe('function')
          })

          test('AND result.bar is an object', () => {
            expect(typeof result.bar).toBe('object')
          })

          test('AND result.bar.create is an object', () => {
            expect(typeof result.bar.create).toBe('object')
          })

          test('AND result.bar.create.push is a function', () => {
            expect(typeof result.bar.create.push).toBe('function')
          })

          test('AND result.bar.create.doNothing is a function', () => {
            expect(typeof result.bar.create.doNothing).toBe('function')
          })
        })
      })
    })
  })
})