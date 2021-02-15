import {
  creatorGetTodos,
  creatorCreateTodo,
  creatorUpdateTodo,
  creatorDeleteTodo,
} from '../features/todos/todosSlice';

export default function* rootSagas() {
  yield creatorCreateTodo;
  yield creatorGetTodos;
  yield creatorUpdateTodo;
  yield creatorDeleteTodo;
}
