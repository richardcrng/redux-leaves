---
id: usereducer-example
title: Using with useReducer instead of Redux
hide_title: true
sidebar_label: useReducer example
---

# `useReducer` example, no Redux

Because [`reduxLeaves`](../README.md) returns a `reducer` and `actions`, it can be used with the React [`useReducer`](https://reactjs.org/docs/hooks-reference.html#usereducer) hook instead of Redux if desired.

For a demo, check out this [Todo app](https://codesandbox.io/s/todo-app-with-usereducer-react-testing-library-and-redux-leaves-inziu) modelled on the React-Redux tutorial example, refactored to use the `useReducer` hook in combination with `reduxLeaves`.

## Example
[CodeSandbox demo](https://codesandbox.io/s/redux-leaves-with-usereducer-5xpkz)

```jsx
import React, { useReducer } from "react";
import reduxLeaves, { bundle } from 'redux-leaves';

const initialState = {
  name: "user",
  list: []
};

const [reducer, actions] = reduxLeaves(initialState);

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = e => {
    // update state.name to be e.target.value
    dispatch(actions.name.create.update(e.target.value));
  };

  const handleSave = () => {
    // 1. push current val of state.name into state.list
    // 2. clear state.name
    // ... in a single dispatch
    const actionBundle = bundle([
      actions.list.create.push(state.name),
      actions.name.create.clear()
    ])

    dispatch(actionBundle);
  };

  return (
    <div>
      <h1>Hello, {state.name}!</h1>
      <div>
        <b>Name: </b>
        <input onChange={handleChange} value={state.name} />
        <button onClick={handleSave}>Save</button>
      </div>
      <div>
        <b>Greeted: </b>
        {state.list.join(", ")}
      </div>
    </div>
  );
}
```