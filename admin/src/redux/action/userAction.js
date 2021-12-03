import axiosClient from "../../utils/axiosClient";
import { toast } from 'react-toastify';

export const handleFetchUsersAction = () => {
    return async (dispatch, getState) => {
        try {
            const res = await axiosClient.get('http://localhost:5000/api/user/getAll');
            if(res && res.data && res.data.success === true){
                dispatch({
                    type: 'FETCH_ALL_USER_SUCCESS',
                    payload: res.data.users
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
}


export const deleteUser = (id) => {
    return async (dispatch, getState) => {
        try {
            const res = await axiosClient.delete(`http://localhost:5000/api/user/delete/${id}`);
            if(res && res.data && res.data.success === true){
                toast.success("Delete user successfully")
                dispatch({
                    type: 'DELETE_USER_SUCCESS',
                    payload: id
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
}