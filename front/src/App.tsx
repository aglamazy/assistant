import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Layout from './components/Layout';
import {checkConfig} from "./config/config"; // Assuming Layout uses useRoutes

function App() {
    checkConfig();
    return (
        <Router>
            <Layout />
        </Router>
    );
}

export default App;
