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

```js
import React, { useReducer } from "react";
import reduxLeaves, { bundle } from 'redux-leaves';

const initialState = {
  name: "user",
  list: []
};

const [reducer, actions] = reduxLeaves(initialState);

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <h1>Hello, {state.name}!</h1>
      <div>
        <b>Name: </b>
        <input
          onChange={e => {
            dispatch(actions.name.create.update(e.target.value));
          }}
          value={state.name}
        />
        <button
          onClick={() => {
            dispatch(
              // use bundle to combine multiple atomic actions
              //   into a single action for dispatch
              bundle([
                actions.list.create.push(state.name),
                actions.name.create.clear()
              ])
            );
          }}
        >
          Save
        </button>
      </div>
      <div>
        <b>Greeted: </b>
        {state.list.join(", ")}
      </div>
    </>
  );
}
```