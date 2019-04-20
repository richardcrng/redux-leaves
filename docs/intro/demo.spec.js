import reduxLeaves from "../../src";
import { createStore } from "redux";

describe("Redux-Leaves. Write once. Reduce anywhere.", () => {
  describe("GIVEN initialState, reducers, reducer, actions and initialised redux store", () => {
    const initialState = {
      counter: 1,
      foo: ['foo'],
      nest: { deep: {} }
    }

    const reducers = {
      increment: leafState => leafState + 1,
      push: (leafState, { payload }) => [...leafState, payload],
      recurse: (leafState, { payload }, wholeState) => ({ ...leafState, [payload]: wholeState[payload] })
    }

    const [reducer, actions] = reduxLeaves(initialState, reducers)

    let store

    beforeEach(() => store = createStore(reducer))

    test("THEN actions has defined action creators for increment, push and recurse", () => {
      expect(typeof actions.counter.create.increment).toBe("function")
      expect(typeof actions.counter.create.push).toBe("function")
      expect(typeof actions.counter.create.recurse).toBe("function")
      
      expect(typeof actions.foo.create.increment).toBe("function")
      expect(typeof actions.foo.create.push).toBe("function")
      expect(typeof actions.foo.create.recurse).toBe("function")

      expect(typeof actions.nest.create.increment).toBe("function")
      expect(typeof actions.nest.create.push).toBe("function")
      expect(typeof actions.nest.create.recurse).toBe("function")
    })

    describe("WHEN we dispatch actions.counter.create.increment() to the store", () => {
      beforeEach(() => {
        store.dispatch(actions.counter.create.increment())
      })

      test("THEN the store's state.counter increments non-mutatively", () => {
        expect(store.getState()).toEqual({
          counter: 2,
          foo: ['foo'],
          nest: { deep: {} }
        })
        expect(initialState.counter).toBe(1)
      })

      describe("AND we dispatch actions.foo.create.push('bar') to the store", () => {
        beforeEach(() => {
          store.dispatch(actions.foo.create.push('bar'))
        })

        test("THEN the store's state.foo updates non-mutatively", () => {
          expect(store.getState()).toEqual({
            counter: 2,
            foo: ['foo', 'bar'],
            nest: { deep: {} }
          })
        })

        describe("AND we dispatch actions.nest.deep.recurse('counter') to the store", () => {
          beforeEach(() => {
            store.dispatch(actions.nest.deep.create.recurse('counter'))
          })

          test("THEN the store's state.nest.deep updates non-mutatively", () => {
            expect(store.getState()).toEqual({
              counter: 2,
              foo: ['foo', 'bar'],
              nest: {
                deep: { counter: 2 }
              }
            })
            expect(initialState.nest).toEqual({ deep: {} })
          })
        })
      })
    })
  })
})