import React, { useEffect, useState } from 'react';
import {useSearchParams, useNavigate, Link} from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import {Backend} from "../services/backend";
import {ResponseCodes} from "../common";

const VerifyEmail = () => {
    const [message, setMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [severity, setSeverity] = useState<'success' | 'error'>('success');
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const token = searchParams.get('token');
        if (token) {
            Backend.post('auth/verify-email', { token })
                .then(response => {
                    setMessage('Email verified successfully. Redirecting to login...');
                    setSeverity('success');
                    setOpenSnackbar(true);
                    setTimeout(() => {
                        navigate('/login'); // Redirect to login page after verification
                    }, 3000);
                })
                .catch(error => {
                    const conflictData = error.response.data;
                    setMessage(conflictData.message);
                    if (conflictData.code === ResponseCodes.UserActiveTryToLogin) {
                        setTimeout(() => {
                            navigate('/login'); // Redirect to login page after verification
                        }, 3000);
                        return;
                    }
                    if (conflictData.code === ResponseCodes.InvalidOrExpiredToken) {
                        setTimeout(() => {
                            navigate('/register'); // Redirect to login page after verification
                        }, 3000);
                        return;
                    }
                    setSeverity('error');
                    setOpenSnackbar(true);
                });
        } else {
            setMessage('No token provided.');
            setSeverity('error');
            setOpenSnackbar(true);
        }
    }, [searchParams, navigate]);

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <div>
            <h1>Verifying your email</h1>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={severity}>
                    {message}
                    {message === 'Token has expired' && (
                        <span>
              {' '}
                            Please <Link to="/register">register again</Link>.
            </span>
                    )}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default VerifyEmail;
