import axiosClient from '../../utils/axiosClient';
import { toast } from 'react-toastify';

export const getProducts = () => {
    return async (dispatch, getState) => {
        try {
            const res = await axiosClient.get('http://localhost:5000/api/products/findAll');
            if(res && res.data && res.data.success === true){
                dispatch({
                    type: 'FETCH_PRODUCT_SUCCESS',
                    payload: res.data.products
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export const deleteProduct = (id) => {
    return async (dispatch, getState) => {
        try {
            const res = await axiosClient.delete(`http://localhost:5000/api/products/delete/${id}`);
            if(res && res.data && res.data.success === true){
                toast.success("Delete product successfully")
                dispatch({
                    type: 'DELETE_PRODUCT_SUCCESS',
                    payload: id
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
}