import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { actionCreateTodo } from './todosSlice';

const ENTER_KEY = 13;

const Form = styled.form``;
const Title = styled.h2``;
const Paragraph = styled.p``;
const Input = styled.input``;

export default function Todo() {
  const dispatch = useDispatch();

  const [todo, setTodo] = useState('');

  const handleOnTodoChange = (event) => setTodo(event.target.value);
  const handleOnTodoKeyDown = (event) => {
    if (event.keyCode !== ENTER_KEY) return;
    event.preventDefault();

    dispatch(actionCreateTodo(todo));
    setTodo('');
  };

  return (
    <Form>
      <Title>Todos</Title>
      <Paragraph>
        <Input
          name="todo"
          onChange={handleOnTodoChange}
          onKeyDown={handleOnTodoKeyDown}
          placeholder="What need to be done?"
          value={todo}
        />
      </Paragraph>
    </Form>
  );
}
