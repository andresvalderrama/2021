import { ThemeProvider } from 'styled-components';

import Todo from '../features/todos/Todo';
import Todos from '../features/todos/Todos';

import Button from '../design-system/Button';

import theme from '../theme';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Todo />
      <Todos />
      <Button>Alt Button</Button>
    </ThemeProvider>
  );
}
