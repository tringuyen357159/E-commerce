const initialState = {
    username: '',
    error: '',
    isLoading: true,
    accessToken: '',
    isLogin: false,
    id: ''
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                ...state,
               error: '',
               isLoading: false,
               isLogin: true,
               accessToken: action.payload.accessToken,
               username: action.payload.username,
               id: action.payload._id
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

export default userReducer;