import React, { createContext, useReducer, useContext } from 'react';
import {
  createAsyncDispatcher,
  createAsyncHandler,
  initialAsyncState
} from './asyncActionUtils';
import * as api from './api'; // api에서 내보낸 모든 함수들을 불러옴

// UsersContext에서 사용할 기본 상태
const initialState = {
    users: initialAsyncState,
    user: initialAsyncState
  };

const usersHandler = createAsyncHandler('GET_USERS', 'users');
const userHandler = createAsyncHandler('GET_USER', 'user');

// 6개의 action 구현
// GET_USERS
// GET_USERS_SUCCESS
// GET_USERS_ERROR
// GET_USER
// GET_USER_SUCCESS
// GET_USER_ERROR

function usersReducer(state, action) {
    switch (action.type) {
      case 'GET_USERS':
      case 'GET_USERS_SUCCESS':
      case 'GET_USERS_ERROR':
        return usersHandler(state, action);
      case 'GET_USER':
      case 'GET_USER_SUCCESS':
      case 'GET_USER_ERROR':
        return userHandler(state, action);
      default:
        throw new Error(`Unhanded action type: ${action.type}`);
    }
  }

// 컴포넌트 최적화할 때 용이하기위해 Context를 state와 dispatch 따로 만들 것 / state와 dispatch 가져오기도 편함
const UsersStateContext = createContext(null);
const UsersDispatchContext = createContext(null);

// 위에서 선언한 두가지 Context들의 Provider로 감싸주는 컴포넌트
export function UsersProvider({ children }) {
  const [state, dispatch] = useReducer(usersReducer, initialState);
  return (
    <UsersStateContext.Provider value={state}>
      <UsersDispatchContext.Provider value={dispatch}>
        {children}
      </UsersDispatchContext.Provider>
    </UsersStateContext.Provider>
  );
}

// State를 쉽게 조회할 수 있게 해주는 커스텀 Hook
export function useUsersState() {
  const state = useContext(UsersStateContext);
  if (!state) {
    throw new Error('Cannot find UsersProvider');
  }
  return state;
}

// Dispatch를 쉽게 사용할 수 있게 해주는 커스텀 Hook
export function useUsersDispatch() {
  const dispatch = useContext(UsersDispatchContext);
  if (!dispatch) {
    throw new Error('Cannot find UsersProvider');
  }
  return dispatch;
}
export const getUsers = createAsyncDispatcher('GET_USERS', api.getUsers);
export const getUser = createAsyncDispatcher('GET_USER', api.getUser);
