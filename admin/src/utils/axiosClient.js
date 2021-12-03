import axios from 'axios';

const axiosClient = axios.create();

const getToken = () => {
    const token = JSON.parse(localStorage.getItem('persist:admin'));
    const accessToken = token.accessToken.split('"').join('');
    if(accessToken)
        return accessToken;
    else 
        return null;
}


axiosClient.interceptors.request.use(async (config) => {
  
    const token = await getToken();
    if(token) {
        config.headers.Authorization = `Bearee ${token}`;
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

export default axiosClient;
