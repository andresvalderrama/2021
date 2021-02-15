async function client(endpoint, { body, ...customConfig } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  const config = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await window.fetch(endpoint, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.errors);
  }

  return data;
}

client.get = function (endpoint, customConfig = {}) {
  return client(endpoint, { ...customConfig, method: 'GET' });
};

client.post = function (endpoint, body, customConfig = {}) {
  return client(endpoint, { ...customConfig, body });
};

client.put = function (endpoint, body, customConfig = {}) {
  return client(endpoint, { ...customConfig, method: 'PUT', body });
};

client.delete = function (endpoint, body, customConfig = {}) {
  return client(endpoint, { ...customConfig, method: 'DELETE', body });
};

export function apiGetTodos() {
  return client.get('/api/todos');
}

export function apiCreateTodo(newTodo) {
  return client.post('/api/todos', newTodo);
}

export function apiUpdateTodo(todo) {
  return client.put('/api/todos/', todo);
}

export function apiDeleteTodo(id) {
  return client.delete('/api/todos', id);
}
