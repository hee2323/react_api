import React, { createContext, useReducer, useContext } from 'react';
import axios from 'axios';

const initalState = {
    users: {
        loading: false,
        data: null,
        error: null,
    },
    user: {
        loading: false,
        data: null,
        error: null,       
    }
};

// loading 중일 때 users와 user 대체 예정
const loadingState = {
    loading: true,
    data: null,
    error: null
};

// data를 parameter로 가져와서 특정 개체를 생성
const success = (data) => ({
    loading: false,
    data,
    error:null
});

// error를 가져옴
const error = (e) => ({
    loading: false,
    data: null,
    error: e
});

// 6개의 action 구현 예정
// GET_USERS
// GET_USERS_SUCCESS
// GET_USERS_ERROR
// GET_USER
// GET_USER_SUCCESS
// GET_USER_ERROR

function usersReducer(state, action) {
    switch (action.type) {
        case 'GET_USERS':
            return {
                ...state,
                users: loadingState
            };
        case 'GET_USERS_SUCCESS':
            return {
                ...state,
                users: success(action.data)
            };
        case 'GET_USERS_ERROR':
            return {
                ...state,
                users: error(action.error)
            };
        case 'GET_USER':
            return {
                ...state,
                user: loadingState
            };
        case 'GET_USER_SUCCESS':
            return {
                ...state,
                user: success(action.data)
            };
        case 'GET_USER_ERROR':
            return {
                ...state,
                user: error(action.error)
            };
        default:
            throw new Error('Unhandled action type', action.type);
    }
}

// 컴포넌트 최적화할 때 용이하기위해 Context를 state와 dispatch 따로 만들 것 / state와 dispatch 가져오기도 편함
const UsersStateContext = createContext(null);
const UsersDispatchContext = createContext(null);

export function UsersProvider({ children }) {
    const [state, dispatch] = useReducer(usersReducer, initalState);
    return (
        <UsersStateContext.Provider value={state}>
            <UsersDispatchContext.Provider value={dispatch}>
                { children }
            </UsersDispatchContext.Provider>
        </UsersStateContext.Provider>
    )
}

export function useUsersState() {
    const state = useContext(UsersStateContext);
    if (!state) {
        throw new Error('Cannot find UserProvider');
    }
    return state;
}

export function useUsersDispatch() {
    const dispatch = useContext(UsersDispatchContext);
    if (!dispatch) {
        throw new Error('Cannot find UserProvider');
    }
    return dispatch;
}

// api 요청 / api 요청 전 특정 action을 dispatch / api를 성공하거나 실패했을 때도 특정 action을 dispatch
export async function getUsers(dispatch) {
    dispatch({ type: 'GET_USERS'});
    try {
        const response = await axios.get(
            'https://jsonplaceholder.typicode.com/users'
        );
        dispatch({
            type: 'GET_USERS_SUCCESS',
            data: response.data
        });
    } catch (e) {
        dispatch({
            type: 'GET_USERS_ERROR',
            error: e
        });
    }
}

export async function getUser(dispatch, id) {
    dispatch({ type: 'GET_USER'});
    try {
        const response = await axios.get(
            `https://jsonplaceholder.typicode.com/users/${id}`
        );
        dispatch({
            type: 'GET_USER_SUCCESS',
            data: response.data
        });
    } catch (e) {
        dispatch({
            type: 'GET_USER_ERROR',
            error: e
        });
    }
}

