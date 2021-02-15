import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  actionGetTodos,
  actionUpdateTodo,
  actionDeleteTodo,
} from './todosSlice';

export default function Todos() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.data);
  const status = useSelector((state) => state.todos.status);
  const error = useSelector((state) => state.todos.error);

  const handleOnDoneChange = (todo, target) => {
    dispatch(actionUpdateTodo({ ...todo, done: target.checked }));
  };
  const handleOnDelectClick = (id) => {
    dispatch(actionDeleteTodo(id));
  };

  useEffect(() => {
    if (status === 'idle') {
      dispatch(actionGetTodos());
    }
  }, [status, dispatch]);

  let content;

  if (status === 'loading') {
    content = <p>loading...</p>;
  } else if (status === 'failed') {
    content = <p>{error.message}</p>;
  } else if (status === 'succeeded') {
    content = todos.map((todo) => (
      <section key={todo.id}>
        <input
          type="checkbox"
          name="done"
          checked={todo.done}
          onChange={(event) => handleOnDoneChange(todo, event.target)}
        />
        {todo.description}
        <Button type="button" onClick={(event) => handleOnDelectClick(todo.id)}>
          delete
        </Button>
      </section>
    ));
  } else {
    content = <p>!nothing</p>;
  }

  return <article>{content}</article>;
}
