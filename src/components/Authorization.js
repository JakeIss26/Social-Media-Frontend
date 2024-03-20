// Authorization.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLoginData, clearLoginData, authorize } from '../redux/AuthorizationSlice';
import '../css/registration.css';

function Authorization() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loading = useSelector(state => state.auth.loading);
    const error = useSelector(state => state.auth.error);

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = {
            login: login,
            password: password
        };

        dispatch(setLoginData(formData));
        dispatch(authorize(formData))
            .then((response) => {
                navigate("/main");
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    return (
        <div className="main">
            <div className="registration-form">
                <h2>Authorization Form</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        placeholder="Login"
                        required
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                    />
                    <button type="submit" disabled={loading}>Sign In</button>
                    {error && <div className="error-message">{error}</div>}
                </form>
            </div>
        </div>
    );
}

export default Authorization;
