import React, {useEffect, useState} from 'react';
import Header from './Header';
import Footer from './Footer';
import {Route, Routes} from "react-router-dom";
import LoginPage from "./LoginPage";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "./Dashboard";

const Layout: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const userDetails = localStorage.getItem('userDetails');
        setIsAuthenticated(!!userDetails); // Convert to boolean: true if userDetails exist
    }, []);
    return (
        <div>
            <Header />
            <main>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/verify-email" element={<LoginPage />} />
                    <Route path="/register" element={<LoginPage />} />
                    <Route
                        path="/"  // Set Dashboard as the root path
                        element={
                            <PrivateRoute
                                element={<Dashboard />}
                                isAuthenticated={isAuthenticated}
                            />
                        }
                    />
                </Routes>
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
