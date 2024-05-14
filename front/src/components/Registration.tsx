import React from 'react';
import axios from 'axios';

const Registration = () => {
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

    if (! clientId) {
        return (<p>Not configured</p>);
    }

    const onSuccess = async (response: any) => {
        console.log('Login Success: currentUser:', response.profileObj);
        // Send token to server to verify and save user
        const { tokenId } = response;
        try {
            const result = await axios.post('http://localhost:5000/api/auth/google', { token: tokenId });
            console.log(result);
            // Handle result according to your application needs (e.g., redirect, store in context)
        } catch (error) {
            console.error('Error sending token to server:', error);
        }
    };

    const onFailure = (response: any) => {
        console.error('Login Failed:', response);
    };

    return (
        <div>
            <h1>Register</h1>
            {/*<GoogleLogin*/}
            {/*    clientId={clientId}*/}
            {/*    buttonText="Register with Google"*/}
            {/*    onSuccess={onSuccess}*/}
            {/*    onFailure={onFailure}*/}
            {/*    cookiePolicy={'single_host_origin'}*/}
            {/*    responseType='code,token'*/}
            {/*/>*/}
        </div>
    );
};

export default Registration;
