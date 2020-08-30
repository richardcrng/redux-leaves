import { createStore } from 'redux';
import riduce, { Action, ActionWithPayload } from '../../../src';

describe('Intermediate example', () => {
  const initialState = {
    counter: 2,
    list: ['first', 'second'],
    nested: { arbitrarily: { deep: 0 } }
  }

  const riducerDict = {
    double: (leafState: number) => leafState * 2,
    appendToEach: (leafState: string[], action: ActionWithPayload<string>) => leafState.map(str => str.concat(action.payload)),
    countTreeKeys: (_: any, __: Action, treeState: typeof initialState) => Object.keys(treeState).length
  }

  const [reducer, actions] = riduce(initialState, riducerDict)
  const store = createStore(reducer)

  test("We can double the counter's state", () => {
    expect(store.getState().counter).toBe(2)
    store.dispatch(actions.counter.create.double())
    expect(store.getState().counter).toBe(4)
  })

  test("We can append to the list", () => {
    expect(store.getState().list).toEqual(['first', 'second'])
    store.dispatch(actions.list.create.appendToEach(' item'))
    expect(store.getState().list).toEqual(['first item', 'second item'])
  })

  test("We can count the number of keys in the state tree", () => {
    expect(store.getState().nested.arbitrarily.deep).toBe(0)
    store.dispatch(actions.nested.arbitrarily.deep.create.countTreeKeys())
    expect(store.getState().nested.arbitrarily.deep).toBe(3)
  })

  test("We can double arbitrarily deep state", () => {
    expect(store.getState().nested.arbitrarily.deep).toBe(3)
    store.dispatch(actions.nested.arbitrarily.deep.create.double())
    expect(store.getState().nested.arbitrarily.deep).toBe(6)
  })

  test("By default, when providing arguments, the first becomes the payload", () => {
    // @ts-ignore
    const actionToAppend = actions.list.create.appendToEach('foo', 'bar')
    expect(actionToAppend.payload).toBe('foo')
  })
})