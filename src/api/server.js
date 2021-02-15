import { Model, Server } from 'miragejs';

new Server({
  models: {
    todo: Model,
  },
  routes() {
    this.namespace = 'api';

    this.get('/todos', (schema) => {
      return schema.todos.all();
    });

    this.post('/todos', (schema, request) => {
      const todo = JSON.parse(request.requestBody);

      return schema.todos.create(todo);
    });

    this.put('/todos', (schema, request) => {
      const { id, done } = JSON.parse(request.requestBody);
      const todo = schema.todos.findBy({ id });

      debugger;

      return todo.update({
        done,
      });
    });

    this.delete('/todo', (schema, request) => {
      const id = JSON.parse(request.requestBody);
      const todo = schema.todos.findBy({ id });

      return todo.update();
    });
  },
});
