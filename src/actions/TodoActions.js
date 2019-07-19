import { dispatcher } from '../dispatcher';

export const createTodo = text => {
  dispatcher.dispatch({
    type: 'CREATE_TODO',
    payload: text
  });
};

export const deleteTodo = id => {
  dispatcher.dispatch({
    type: 'DELETE_TODO',
    payload: id
  });
};

export const fetchTodos = () => {
  dispatcher.dispatch({
    type: 'FETCH_TODOS'
  });
};
