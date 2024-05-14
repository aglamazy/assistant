import React from 'react';
import { useLocation } from 'react-router-dom';
import Login from './Login'; // Adjust path as necessary
import Registration from './Registration'; // Adjust path as necessary
import 'bootstrap/dist/css/bootstrap.min.css';
import './LoginPage.css';

function LoginPage() {
    const location = useLocation();  // Gets the location object
    const { pathname } = location;

    // Determine which component to render based on the pathname
    const renderComponent = () => {
        if (pathname.endsWith('register')) {
            return <Registration />;
        }
        // Default to rendering the Login component
        return <Login />;
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="p-5 shadow rounded bg-white">
                {renderComponent()}
            </div>
        </div>
    );
}

export default LoginPage;
