import React, { Component } from 'react';
import { todoStore } from '../stores/TodoStore';
import { createTodo, deleteTodo, fetchTodos } from '../actions/TodoActions';

class Todos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      todoInput: ''
    };
  }

  componentDidMount() {
    todoStore.on('change', this.getAllTodos);
  }

  getAllTodos = () => {
    this.setState({ todos: todoStore.getAllTodos() });
  };

  componentWillUnmount() {
    todoStore.removeListener('change', this.getAllTodos);
  }

  handleSubmit = e => {
    e.preventDefault();
    createTodo(this.state.todoInput);
    this.setState({ todoInput: '' });
  };

  handleInputChange = e => {
    this.setState({ todoInput: e.target.value });
  };

  handleTodoDelete = id => {
    deleteTodo(id);
  };

  render() {
    return (
      <div>
        <h1>Todos</h1>
        <button onClick={() => fetchTodos()}>Fetch Todos</button>
        <form onSubmit={this.handleSubmit}>
          <input
            name='todo'
            value={this.state.todoInput}
            onChange={this.handleInputChange}
          />
          <button>Add</button>
        </form>
        <ul>
          {this.state.todos.map(todo => (
            <li key={todo.id}>
              {todo.text}
              <button onClick={() => this.handleTodoDelete(todo.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Todos;
