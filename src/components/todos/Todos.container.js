import React from 'react';
import { connect } from 'react-redux';
import TodosComponent from './Todos.component';

function Todos(props) {
  return <TodosComponent {...props} />
}

export default Todos;