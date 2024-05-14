import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Layout from './components/Layout'; // Assuming Layout uses useRoutes

function App() {
    return (
        <Router>
            <Layout />
        </Router>
    );
}

export default App;
