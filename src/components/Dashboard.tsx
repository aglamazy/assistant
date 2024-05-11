import React from 'react';

// Define the props type if needed, here it's empty as the component does not use any props
interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = () => {
    // The content of the Dashboard can be defined here
    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome to your Dashboard!</p>
        </div>
    );
}

export default Dashboard;
