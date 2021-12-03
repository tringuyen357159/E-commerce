const initialState = {
    products: [],
    quantity: 0,
    total: 0,
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_PRODUCT_SUCCESS':
            return {
                ...state,
                quantity: state.quantity + 1,
                products: [...state.products, action.payload],
                total: state.total + (action.payload.price * action.payload.quantity)
            }
        case 'ORDER_SUCCESS':
            return {
                ...state,
                products: [],
                quantity: 0,
                total: 0,
            }
        default:
            return state;
    }
}

export default cartReducer;