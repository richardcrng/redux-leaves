import prepareForActionsProxy from "."

describe('prepareForActionsProxy', () => {
  describe('at one level', () => {
    const state = {
      counter: 3,
      list: ['a'],
      bool: true,
      obj: {}
    }

    const forProxy = prepareForActionsProxy(state)

    test('all values are objects', () => {
      Object.values(forProxy).forEach(val => {
        expect(typeof val).toBe('object')
      })
    })

    test('list is still an array', () => {
      expect(Array.isArray(forProxy.list)).toBeTruthy()
    })
  })
})