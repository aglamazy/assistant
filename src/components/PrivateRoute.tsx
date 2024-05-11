import React from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
    element: React.ReactElement;  // This will be the component you want to protect
    isAuthenticated: boolean;    // This will be passed down to check if the user is authenticated
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, isAuthenticated }) => {
    // If the user is authenticated, render the element passed to PrivateRoute
    // If not, redirect the user to the login page
    return isAuthenticated ? element : <Navigate to="/login" replace />;
};

export default PrivateRoute;
