const initialState = {
    products: [],
}

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_PRODUCT_SUCCESS':
            state.products = action.payload
            return {
                ...state,
            }
        case 'DELETE_PRODUCT_SUCCESS':
            return {
                ...state,
                products: state.products.filter((item) => item._id !== action.payload)
            }
        case 'CREATE_PRODUCT_SUCCESS':
            return {
                ...state,
                products: [...state.products, action.payload]
            }
        case 'UPDATE_PRODUCT_SUCCESS':
            return {
                ...state,
                products: state.products.map(item => item._id === action.payload._id ? action.payload : item)
            }
        default:
            return state;
    }
}

export default productReducer;