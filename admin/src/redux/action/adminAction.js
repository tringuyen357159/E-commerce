import axios from 'axios';
import { toast } from 'react-toastify';

export const handleLoginAction = (data) => {
    return async (dispatch, getState) => {
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', data);
            if(res && res.data && res.data.success === true){
                toast.success("Login successfully")
                dispatch({
                    type: 'LOGIN_SUCCESS',
                    payload: res.data
                })
            }
        } catch (error) {
            if(error.response.data){
                dispatch({
                    type: "LOGIN_FAIL",
                    payload: error.response.data
                })
            }
        }
    }
}
