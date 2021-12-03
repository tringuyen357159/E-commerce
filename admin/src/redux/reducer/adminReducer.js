const initialState = {
    username: '',
    error: '',
    isLoading: true,
    accessToken: '',
    isLogin: false,
    isAdmin: false
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                ...state,
               error: '',
               isLoading: false,
               isLogin: true,
               accessToken: action.payload.accessToken,
               username: action.payload.username,
               isAdmin: true
            }
        case 'LOGIN_FAIL':
            return {
                ...state,
                error: action.payload.message,
            }
        default:
            return state;
    }
}

export default adminReducer;