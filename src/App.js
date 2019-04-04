import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { reducer } from './store/index';
import Todos from './components/todos/Todos.container';

class App extends Component {
  componentDidMount() {
    setTimeout(() => {
      console.log("reducer", reducer, reducer.children)
    }, 1000)
  }

  render() {
    return (
      <div className="App">
        <Todos />
      </div>
    );
  }
}

export default App;
