import React, { useState } from 'react';
import './Login.scss'
import { useDispatch, useSelector } from 'react-redux';
import { handleLoginAction } from '../../redux/action/adminAction';

const Login = () => {
    const admin = useSelector((state) => state.admin);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(handleLoginAction({ email, password }))
    };


    return (
        <div className="login">
            <div className="login-container">
                <h1>
                    SIGN IN
                </h1>
                <form>
                    <input 
                        placeholder="email"
                        onChange={(e) => setEmail(e.target.value)} 
                        type="text"
                        value={email}
                    />
                    <input 
                        placeholder="password"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)} 
                        value={password}
                    />
                    <button onClick={handleLogin}>LOGIN</button>
                    {admin.error && <span className="error">{admin.error}</span>}
                </form>
            </div>
        </div>
    )
}

export default Login
