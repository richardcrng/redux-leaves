import { createStore } from "redux";
import reduxLeaves from '../../../src';

describe("leaf.create.push(element, [index = -1], [replace = false]): returns an action that, when dispatched, updates the leaf's state by non-mutatively pushing element into leaf's state at index. If replace === true, then element replaces the existing element with that index.", () => {

  describe("GIVEN initialState is an object", () => {
    const initialState = {
      foo: [1, 2, 3],
      bar: [1, 2, 3],
      foobar: [1, 2, 3]
    }

    describe("WHEN [reducer, actions] = reduxLeaves(initialState)", () => {
      const [reducer, actions] = reduxLeaves(initialState)

      test("THEN actions.foo.create.push is a function", () => {
        expect(typeof actions.foo.create.push).toBe("function")
      })

      test("AND actions.bar.create.push is a function", () => {
        expect(typeof actions.bar.create.push).toBe("function")
      })

      test("AND actions.foobar.create.push is a function", () => {
        expect(typeof actions.foobar.create.push).toBe("function")
      })

      describe("AND store = createStore(reducer)", () => {
        let store
        beforeEach(() => {
          store = createStore(reducer)
        })

        test("THEN store is initialised with state = initialState", () => {
          expect(store.getState()).toEqual(initialState)
        })

        describe("AND we dispatch actions.foo.create.push(4)", () => {
          beforeEach(() => {
            store.dispatch(actions.foo.create.push(4))
          })

          test("THEN actions.foo state updates non-mutatively to [1, 2, 3, 4]", () => {
            const state = store.getState()
            expect(state).toEqual({
              ...initialState,
              foo: [1, 2, 3, 4]
            })
            expect(initialState.foo).toEqual([1, 2, 3])
          })
        })

        describe("AND we dispatch actions.foo.create.push([4, 5])", () => {
          beforeEach(() => {
            store.dispatch(actions.foo.create.push([4, 5]))
          })

          test("THEN actions.foo state updates non-mutatively to [1, 2, 3, [4, 5]]", () => {
            const state = store.getState()
            expect(state).toEqual({
              ...initialState,
              foo: [1, 2, 3, [4, 5]]
            })
            expect(initialState.foo).toEqual([1, 2, 3])
          })
        })

        describe("AND we dispatch actions.bar.create.push(4, 0)", () => {
          beforeEach(() => {
            store.dispatch(actions.bar.create.push(4, 0))
          })

          test("THEN actions.bar state updates non-mutatively to [4, 1, 2, 3]", () => {
            const state = store.getState()
            expect(state).toEqual({
              ...initialState,
              bar: [4, 1, 2, 3]
            })
            expect(initialState.bar).toEqual([1, 2, 3])
          })
        })

        describe("AND we dispatch actions.foobar.create.push(4, 0, true)", () => {
          beforeEach(() => {
            store.dispatch(actions.foobar.create.push(4, 0, true))
          })

          test("THEN actions.foobar state updates non-mutatively to [4, 2, 3]", () => {
            const state = store.getState()
            expect(state).toEqual({
              ...initialState,
              foobar: [4, 2, 3]
            })
            expect(initialState.foobar).toEqual([1, 2, 3])
          })
        })
      })
    })
  })
})