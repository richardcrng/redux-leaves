import React from 'react';

function Todo(props) {
  return (
    <>
      <input type="checkbox" checked={props.checked} readOnly /> {props.text}
    </>
  )
}

export default Todo;