import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LoginPage.css'

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (event: any) => {
        event.preventDefault();
        console.log('Logging in:', username, password);
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="p-5 shadow rounded bg-white">
                <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            className="form-control"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
                <Link to="/register" className="mt-3 d-block">Need an account? Register</Link>
            </div>
        </div>
    );
}

export default LoginPage;
