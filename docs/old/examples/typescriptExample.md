---
id: typescript-example
title: TypeScript example
hide_title: true
sidebar_label: TypeScript example
---

# TypeScript example

Redux-Leaves is written in TypeScript and gives most typings by default.

You can help it out by being explicit in your custom reducer typings (if you have any):

```typescript
import { createStore } from 'redux'
import riduce, { bundle, LeafReducer } from 'redux-leaves'

// Declare an interface or type for your state shape
interface State {
  list: string[],
  nested: {
    counter: number,
    state: {
      deep: string
    }
  }
}

const initialState: State = {
  list: ['a', 'b'],
  nested: {
    counter: 0,
    state: {
      deep: 'somewhat'
    }
  }
}

// Declare your custom ReducerSchemas
interface ReducerSchemas {
  /*
    addAll:
    1. reducer acts on number leaf state
    2. action creator arguments is an array of numbers
    3. action payload is an array of numbers
  */
  addAll: LeafReducer.Schema<number, number[], number[]>,

  /*
    insertEarliest:
    1. reducer acts on an array of strings
    2. action creator takes a single argument, a number
    3. action payload is a single number
  */
  duplicateIndex: LeafReducer.Schema<string[], [number], number>

  /*
    exponentiate:
    1. reducer acts on
  */
  exponentiate: LeafReducer.Schema<number, [number], number>,
}

const reducerDict: ReducerSchemas = {
  addAll: {
    reducer: (leafState, action) => {
      // TS picks up that:
      //  1. leafState is a number
      //  2. action.payload is an array of numbers
      action.payload.reducer((acc, val) => acc + val, leafState)
    },
    // TS picks up that the return value of argsToPayload
    //  should be an array of numbers
    argsToPayload: (...args) => args
  },
  duplicatePayload: {
    // TS picks up that:
    //  1. leafState is an array of strings
    //  2. action.payload is a number
    reducer: (leafState, action) => [...leafState, leafState[action.payload]],
    // TS picks up that argsToPayload should
    //  take one argument, a number, and
    //  return a number
    argsToPayload: (index) => index
  },
  exponentiate: {
    // TS picks up that:
    //  1. leafState is a number
    //  2. action.payload is a number
    reducer: (leafState, action) => Math.pow(leafState, action.payload),
    // TS picks up that the return value of argsToPayload
    //  should be a number
    argsToPayload: (power) => power
  }
}


const [reducer, actions] = riduce(initialState, riducerDict)
```
