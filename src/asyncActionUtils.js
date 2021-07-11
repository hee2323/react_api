// 파라미터로 액션의 타입 (예: GET_USER) 과 Promise를 만들어주는 함수 받아옴
export function createAsyncDispatcher(type, promiseFn) {
    // 성공, 실패에 대한 액션 타입 문자열을 준비
    const SUCCESS = `${type}_SUCCESS`;
    const ERROR = `${type}_ERROR`;

    // actionHandler(dispatch, 1,2,3)이라고 쓰면 rest 안에 1,2,3이 담김
    async function actionHandler(dispatch, ...rest) {
        dispatch({ type }); // 요청 시작됨
        try {
            // 파라미터로 받아온 promiseFn 호출 (...rest로 받아온거 풀어줄 것)
            const data = await promiseFn(...rest); // rest 배열을 spread로 넣어줌
            dispatch({ // 성공
              type: SUCCESS,
              data
            });
        } catch (e) {
            dispatch({ // 실패
              type: ERROR,
              error: e
            });
        }
    }
    return actionHandler; // 만든 함수를 반환
}

export const initialAsyncState = {
    loading: false,
    data: null,
    error: null
};

// 로딩 중일 때 users와 user 상태 대체할 객체
const loadingState = {
    loading: true,
    data: null,
    error: null
};

// data를 파라미터로 가져와서 특정 개체를 생성 / 성공했을 때의 상태 만들어주는 함수
const success = (data) => ({
    loading: false,
    data,
    error:null
});

// error를 파라미터로 가져옴 / 실패했을 때의 상태를 만들어주는 함수
const error = (e) => ({
    loading: false,
    data: null,
    error: e
});

// type => action type / key => users, user
export function createAsyncHandler(type, key) {
    // 성공, 실패에 대한 액션 타입 문자열 준비
    const SUCCESS = `${type}_SUCCESS`;
    const ERROR = `${type}_ERROR`;

    // 함수를 새로 만들어서
    function handler(state, action) {
        switch (action.type) {
            case type:
                return {
                    ...state, // users를 유지 (불변성 유지)
                    [key]: loadingState
                };
            case SUCCESS:
                return {
                    ...state,
                    [key]: success(action.data)
                };
            case ERROR:
                return {
                    ...state,
                    [key]: error(action.error)
                };
            default:
                return state;
        }
    }
    return handler; // 반환
}

