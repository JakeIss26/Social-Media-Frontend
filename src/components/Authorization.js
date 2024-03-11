import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/registration.css';

function Authorization() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const apiEndpointLogin = "http://127.0.0.1:8000/api/user/login";

        let formData =
        {
            "login": login,
            "password": password
        };

        try {
            const response = await axios.post(apiEndpointLogin, formData);

            const dataObject = response.data;
            console.log(dataObject.access_token);
            localStorage.setItem('Token', dataObject.access_token);

            navigate("/main"); // Перенаправление на другую страницу

        } catch (error) {
            console.error("Error:", error);
        }
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
                    <button type="submit">Sign In</button>
                </form>
            </div>
        </div>
    );
}

export default Authorization;