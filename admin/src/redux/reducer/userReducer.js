const initialState = {
    users: [],
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_ALL_USER_SUCCESS':
            state.users = action.payload
            return {
                ...state,
            }
        case 'DELETE_USER_SUCCESS':
            return {
                ...state,
                users: state.users.filter((item) => item._id !== action.payload)
            }
        default:
            return state;
    }
}

export default userReducer;