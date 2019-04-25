---
id: concept
title: Leaves in Redux-Leaves
hide_title: true
sidebar_label: Leaves in Redux-Leaves
---

# 'Leaves' in Redux-Leaves

*Leaves* are a simple but important concept in Redux-Leaves.

In short:
- **Every node** in your [initial state shape](../README.md#initialstate) is a leaf;
- **Nothing else** is a leaf.

## Example

Suppose we pass the following `initialState` into [`reduxLeaves`](../README.md).

```js
const initialState = {
  todos: {
    byId: {},
    allIds: []
  },
  visibilityFilter: "SHOW_ALL"
}
```

The [initial state](../README.md#initialstate) passed into [`reduxLeaves`](../README.md) determines what is, and what is not, considered a leaf in the [`reducer`](../README.md#reducer) and [`actions`](../README.md#actions) objects that are returned.



