import { createStore } from "redux";
import riduce from '../../../src';

describe("leaf.create.push(element, [index = -1], [replace = false]): returns an action that, when dispatched, updates the leaf's state by non-mutatively pushing element into leaf's state at index. If replace === true, then element replaces the existing element with that index.", () => {
  const initialState = {
    foo: [1, 2, 3],
    bar: [1, 2, 3],
    foobar: [1, 2, 3]
  }

  const [reducer, actions] = riduce(initialState)
  const store = createStore(reducer)
  
  test("Providing element", () => {
    const pushToFoo = actions.foo.create.push
    store.dispatch(pushToFoo(4))
    expect(store.getState().foo).toEqual([1, 2, 3, 4])
  })

  test("Providing element and index", () => {
    const pushToBar = actions.bar.create.push
    store.dispatch(pushToBar(4, 0))
    expect(store.getState().bar).toEqual([4, 1, 2, 3])
  })

  test("Providing element, index and replace", () => {
    const pushToFoobar = actions.foobar.create.push
    store.dispatch(pushToFoobar(4, 0, true))
    expect(store.getState().foobar).toEqual([4, 2, 3])
  })
})