import { reducerLeaf } from './reducerLeaf';
import { createStore } from 'redux';

describe("**Feature**: a reducer leaf can update a created store's state with reducer.apply()", () => {
  describe("GIVEN reducer = reducerLeaf({ prefix: 'app/prefix', route: ['some', 'route'], initialState: 0 })", () => {
    const reducer = reducerLeaf({ prefix: "app/prefix", route: ["some", "route"], initialState: 0 })

    describe("AND a store that is created from the reducer with preloaded state of 5", () => {
      let store
      beforeEach(() => {
        store = createStore(reducer, 5)
      })

      describe("WHEN the store is dispatched reducer.apply(n => n*10)", () => {
        beforeEach(() => {
          store.dispatch(reducer.apply(n => n*10))
        })

        test("THEN the store has state of 50", () => {
          expect(store.getState()).toBe(50)
        })
      })
    })
  })
})

describe("**Feature**: a reducer leaf can clear a created store's state with reducer.clear()", () => {
  describe("GIVEN reducer = reducerLeaf({ prefix: 'app/prefix', route: ['some', 'route'], initialState: 2 })", () => {
    const reducer = reducerLeaf({ prefix: "app/prefix", route: ["some", "route"], initialState: 2 })

    describe("AND a store that is created from the reducer with preloaded state of 5", () => {
      let store
      beforeEach(() => {
        store = createStore(reducer, 5)
      })

      describe("WHEN the store is dispatched reducer.clear()", () => {
        beforeEach(() => {
          store.dispatch(reducer.clear())
        })

        test("THEN the store has state of 0", () => {
          expect(store.getState()).toBe(0)
        })
      })
    })
  })
})

describe("**Feature**: a reducer leaf can increment a created store's state with reducer.increment()", () => {
  describe("GIVEN reducer = reducerLeaf({ prefix: 'app/prefix', route: ['some', 'route'], initialState: 0 })", () => {
    const reducer = reducerLeaf({ prefix: "app/prefix", route: ["some", "route"], initialState: 0 })

    describe("AND a store that is created from the reducer with preloaded state of 5", () => {
      let store
      beforeEach(() => {
        store = createStore(reducer, 5)
      })

      describe("WHEN the store is dispatched reducer.increment()", () => {
        beforeEach(() => {
          store.dispatch(reducer.increment())
        })

        test("THEN the store has state of 6", () => {
          expect(store.getState()).toBe(6)
        })
      })

      describe("WHEN the store is dispatched reducer.increment(-3)", () => {
        beforeEach(() => {
          store.dispatch(reducer.increment(-3))
        })

        test("THEN the store has state of 2", () => {
          expect(store.getState()).toBe(2)
        })
      })
    })
  })
})

describe("**Feature**: a reducer leaf can push into a created store's state with reducer.push()", () => {
  describe("GIVEN reducer = reducerLeaf({ prefix: 'app/prefix', route: ['some', 'route'], initialState: 0 })", () => {
    const reducer = reducerLeaf({ prefix: "app/prefix", route: ["some", "route"], initialState: 0 })

    describe("AND a store that is created from the reducer with preloaded state of [1, 2, 3]", () => {
      let store
      beforeEach(() => {
        store = createStore(reducer, [1, 2, 3])
      })

      describe("WHEN the store is dispatched reducer.push(4)", () => {
        beforeEach(() => {
          store.dispatch(reducer.push(4))
        })

        test("THEN the store has state of [1, 2, 3, 4]", () => {
          expect(store.getState()).toEqual([1, 2, 3, 4])
        })
      })
    })
  })
})

describe("**Feature**: a reducer leaf can reset a created store's state with reducer.reset()", () => {
  describe("GIVEN reducer = reducerLeaf({ prefix: 'app/prefix', route: ['some', 'route'], initialState: 0 })", () => {
    const reducer = reducerLeaf({ prefix: "app/prefix", route: ["some", "route"], initialState: 0 })

    describe("AND a store that is created from the reducer with preloaded state of 5", () => {
      let store
      beforeEach(() => {
        store = createStore(reducer, 5)
      })

      describe("WHEN the store is dispatched reducer.reset()", () => {
        beforeEach(() => {
          store.dispatch(reducer.reset())
        })

        test("THEN the store has state of 0", () => {
          expect(store.getState()).toBe(0)
        })
      })
    })
  })
})

describe("**Feature**: a reducer leaf can set a created store's state with reducer.update()", () => {
  describe("GIVEN reducer = reducerLeaf({ prefix: 'app/prefix', route: ['some', 'route'], initialState: 0 })", () => {
    const reducer = reducerLeaf({ prefix: "app/prefix", route: ["some", "route"], initialState: 0 })

    describe("AND a store that is created from the reducer with preloaded state of 5", () => {
      let store
      beforeEach(() => {
        store = createStore(reducer, 5)
      })

      describe("WHEN the store is dispatched reducer.update('banana')", () => {
        beforeEach(() => {
          store.dispatch(reducer.update('banana'))
        })

        test("THEN the store has state of 'banana'", () => {
          expect(store.getState()).toBe('banana')
        })
      })
    })
  })
})

describe("**Feature**: a reducer leaf can set a created store's state with reducer.update()", () => {
  describe("GIVEN reducer = reducerLeaf({ prefix: 'app/prefix', route: ['some', 'route'], initialState: 0 })", () => {
    const reducer = reducerLeaf({ prefix: "app/prefix", route: ["some", "route"], initialState: 0 })

    describe("AND a store that is created from the reducer with preloaded state of 5", () => {
      let store
      beforeEach(() => {
        store = createStore(reducer, 5)
      })

      describe("WHEN the store is dispatched reducer.update('banana')", () => {
        beforeEach(() => {
          store.dispatch(reducer.update('banana'))
        })

        test("THEN the store has state of 'banana'", () => {
          expect(store.getState()).toBe('banana')
        })
      })
    })
  })
})

describe("**Feature**: a reducer leaf can toggle a created store's state with reducer.toggle()", () => {
  describe("GIVEN reducer = reducerLeaf({ prefix: 'app/prefix', route: ['some', 'route'], initialState: 0 })", () => {
    const reducer = reducerLeaf({ prefix: "app/prefix", route: ["some", "route"], initialState: 0 })

    describe("AND a store that is created from the reducer with preloaded state of true", () => {
      let store
      beforeEach(() => {
        store = createStore(reducer, true)
      })

      describe("WHEN the store is dispatched reducer.toggle()", () => {
        beforeEach(() => {
          store.dispatch(reducer.toggle())
        })

        test("THEN the store has state of false", () => {
          expect(store.getState()).toBe(false)
        })
      })
    })
  })
})
