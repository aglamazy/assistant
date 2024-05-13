import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from "./components/PrivateRoute";
import LoginPage from "./components/LoginPage";
import Dashboard from "./components/Dashboard";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const userDetails = localStorage.getItem('userDetails');
        setIsAuthenticated(!!userDetails); // Convert to boolean: true if userDetails exist
    }, []);

    return (
        <Router>
            <Routes>  // This Routes component wraps all Route components
                <Route path="/login" element={<LoginPage />} />
                <Route
                    path="/"  // Set Dashboard as the root path
                    element={
                        <PrivateRoute
                            element={<Dashboard />}
                            isAuthenticated={isAuthenticated}
                        />
                    }
                />
                {/* Additional routes can be added here */}
            </Routes>
        </Router>
    );
}

export default App;
