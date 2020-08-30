---
id: overview
title: Overview
hide_title: true
---

Redux-Leaves provides typings out of the box.

## `actions`
Actions is typed to keep to your provided state structure.

```ts
import riduce from 'redux-leaves'

const initialState = {
  shallow: true,
  nested: {
    counter: 0,
    state: {
      deep: 'somewhat'
    }
  }
}

const [reducer, actions] = riduce(initialState)

actions.shallow // compiles
actions.foobar // (ts 2339) Property 'foobar' does not exist on type...

actions.nested.counter // compiles
actions.nested.string // (ts 2339) Property 'nested' does not exist on type...
```

