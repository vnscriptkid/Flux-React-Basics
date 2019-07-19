import { EventEmitter } from 'events';
import { dispatcher } from '../dispatcher';
import axios from 'axios';

class TodoStore extends EventEmitter {
  constructor() {
    super();
    this.todos = [];
  }

  getAllTodos() {
    return this.todos;
  }

  fetchTodos() {
    axios.get('https://jsonplaceholder.typicode.com/todos').then(res => {
      this.todos = res.data.map(todo => ({
        id: todo.id,
        text: todo.title,
        complete: todo.completed
      }));
      this.emit('change');
    });
  }

  createTodo(text) {
    this.todos = [...this.todos, { id: Date.now(), text, complete: false }];
    this.emit('change');
  }

  deleteTodo(id) {
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.emit('change');
  }

  handleActions(action) {
    console.log('TodoStore received an action', action);
    switch (action.type) {
      case 'CREATE_TODO': {
        this.createTodo(action.payload);
        break;
      }
      case 'DELETE_TODO': {
        this.deleteTodo(action.payload);
        break;
      }
      case 'FETCH_TODOS': {
        this.fetchTodos();
        break;
      }
      default:
        return;
    }
  }
}

const todoStore = new TodoStore();
// make sure `this` inside `handleActions` always point to todoStore
dispatcher.register(todoStore.handleActions.bind(todoStore));
window.todoStore = todoStore; // for testing
export { todoStore };
