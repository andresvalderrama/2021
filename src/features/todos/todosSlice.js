import { createAction, createSlice } from '@reduxjs/toolkit';
import { call, takeEvery, put, takeLatest } from 'redux-saga/effects';

import {
  apiCreateTodo,
  apiGetTodos,
  apiUpdateTodo,
  apiDeleteTodo,
} from '../../api/client';

const initialState = {
  data: [],
  status: 'idle',
  error: null,
};

const { actions, reducer } = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    loading(state, action) {
      state.status = 'loading';
    },

    getFulfilled(state, action) {
      state.data = action.payload.data;
      state.status = 'succeeded';
      state.error = null;
    },
    getRejected(state, action) {
      state = action.payload;
    },

    createdFulfilled(state, action) {
      state.data = [...state.data, action.payload.todo];
      state.status = 'succeeded';
      state.error = null;
    },
    createdRejected(state, action) {
      state.error = action.payload.error;
      state.status = 'failed';
    },

    updateFulfilled(state, action) {
      state.data = state.data.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, done: action.payload.done }
          : todo,
      );
    },
    updateRejected(state, action) {
      debugger;
      state.error = action.payload;
      state.status = 'failed';
    },

    deleteFulfilled(state, action) {
      debugger;
    },
    deleteRejected(state, action) {
      state.error = action.payload;
      state.status = 'failed';
    },
  },
});

export const {
  loading: actionLoading,

  getFulfilled: actionGetFulfilled,
  getRejected: actionGetRejected,

  createdFulfilled: actionCreateFulfilled,
  createdRejected: actionCreateRejected,

  updateFulfilled: actionUpdateFulfilled,
  updateRejected: actionUpdateRejected,

  deleteFulfilled: actionDeleteFulfilled,
  deleteRejected: actionDeleteRejected,
} = actions;
export const actionGetTodos = createAction('todos/get');
export const creatorGetTodos = takeEvery(
  actionGetTodos.type,
  function* effectGetTodos(action) {
    try {
      yield put(actionLoading());
      const data = yield call(apiGetTodos);

      yield put(actionGetFulfilled({ data: data.todos }));
    } catch (error) {
      const payload = { error: error, status: 'failed', data: [] };

      yield put(actionGetRejected(payload));
    }
  },
);

export const actionCreateTodo = createAction('todos/create', (todo) => ({
  payload: todo,
}));
export const creatorCreateTodo = takeEvery(
  actionCreateTodo.type,
  function* effectCreateTodo(action) {
    try {
      const newTodo = {
        id: Date.now(),
        description: action.payload,
        done: false,
        created: new Date(),
      };
      const data = yield call(apiCreateTodo, newTodo);
      yield put(actionCreateFulfilled({ todo: data.todo }));
    } catch (error) {
      yield put(actionCreateRejected({ error: error }));
    }
  },
);

export const actionUpdateTodo = createAction('todos/update');
export const creatorUpdateTodo = takeLatest(
  actionUpdateTodo.type,
  function* effectUpdateTodo(action) {
    try {
      const data = yield call(apiUpdateTodo, action.payload);
      yield put(actionUpdateFulfilled(data.todo));
    } catch (error) {
      yield put(actionUpdateRejected(error));
    }
  },
);

export const actionDeleteTodo = createAction('todos/delete');
export const creatorDeleteTodo = takeLatest(
  actionDeleteTodo.type,
  function* effectDeleteTodo(action) {
    try {
      yield call(apiDeleteTodo, action.payload);
    } catch (error) {
      yield put(actionDeleteRejected(error));
    }
  },
);

export default reducer;
