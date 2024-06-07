import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Backend } from "../services/backend";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Grid, TextField, Button, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Registration = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [severity, setSeverity] = useState<'success' | 'error'>('success');
    const [showThankYou, setShowThankYou] = useState(false);
    const navigate = useNavigate();

    const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(event.target.value);
    };

    const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLastName(event.target.value);
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const registrationData = {
            firstName,
            lastName,
            email,
            password
        };

        Backend.post('auth/register', registrationData)
            .then(response => {
                setMessage('Registration successful. Thank you for joining us!');
                setSeverity('success');
                setShowThankYou(true);
            })
            .catch(error => {
                const errorMessage = error.response.data.message;
                setMessage(errorMessage);
                setSeverity('error');
                setOpenSnackbar(true);
            });
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <div>
            {showThankYou ? (
                <div>
                    <h1>Thank You for Registering!</h1>
                    <p>Registration mail was send to your inbox.</p>
                    <Button variant="contained" color="primary" onClick={() => navigate('/')}>
                        Go to Home
                    </Button>
                </div>
            ) : (
                <>
                    <h1>Register</h1>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="First Name"
                                    variant="outlined"
                                    value={firstName}
                                    onChange={handleFirstNameChange}
                                    required
                                    autoComplete="given-name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Last Name"
                                    variant="outlined"
                                    value={lastName}
                                    onChange={handleLastNameChange}
                                    required
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Email"
                                    type="email"
                                    variant="outlined"
                                    value={email}
                                    onChange={handleEmailChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Password"
                                    type={showPassword ? "text" : "password"}
                                    variant="outlined"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    required
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" color="primary" fullWidth>
                                    Register
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                    <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                        <Alert onClose={handleCloseSnackbar} severity={severity}>
                            {message}
                        </Alert>
                    </Snackbar>
                </>
            )}
        </div>
    );
};

export default Registration;
