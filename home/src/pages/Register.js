import React, { useState } from 'react';
import './Register.scss';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const history = useHistory()

    const handleRegister = async (e) => {
        e.preventDefault();
        if(password !== confirm) {
            alert('Confirm password no match');
            return;
        }
        try {
            const res = await axios.post('http://localhost:5000/api/auth/register',{username, email, password, confirm});
            if(res && res.data && res.data.success === true){
                toast.success("Register successfully")
                setUsername('')
                setEmail('')
                setPassword('')
                setConfirm('')
                history.push('/login');
            }
        } catch (error) {
            if(error.response.data){
                toast.error(`${error.response.data.message}`)
            }
        }
    }

    return (
        <div className="register">
            <div className="register-container">
                <h1>CREATE AN ACCOUNT</h1>
                <form>
                    <input 
                        placeholder="username" 
                        type="text"
                        onChange={(e) => setUsername(e.target.value)} 
                        value={username}
                    />
                    <input 
                        placeholder="email" 
                        type="text"
                        onChange={(e) => setEmail(e.target.value)} 
                        value={email}
                    />
                    <input 
                        placeholder="password"
                        type="password" 
                        onChange={(e) => setPassword(e.target.value)} 
                        value={password}
                    />
                    <input 
                        placeholder="confirm password" 
                        type="password"
                        onChange={(e) => setConfirm(e.target.value)} 
                        value={confirm}
                    />
                    <span>
                        By creating an account, I consent to the processing of my personal
                        data in accordance with the <b>PRIVACY POLICY</b>
                    </span>
                    <button onClick={handleRegister}>CREATE</button>
                </form>
            </div>
        </div>
    )
}

export default Register
