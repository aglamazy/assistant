import React, { useState } from 'react';
import { TextField, Button, Grid, Container, Typography, Snackbar, Alert } from '@mui/material';
import {Backend} from "../services/backend";
import axios from "axios";
import {IRegistrationForm} from "../../../types";

function Registration() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form: IRegistrationForm = { firstName, lastName, email };

        try {
            // Simulate an API call to your backend
            const response = await Backend.post('auth/register', form);

            // Assuming the API call was successful, and the backend responds accordingly
            if (response.data.success) {
                setSnackbarMessage("Please check your email to confirm your registration.");
                setSnackbarSeverity('success');
            } else {
                // Handle any situation where the API operation was not successful
                setSnackbarMessage(response.data.message || "Registration failed. Please try again.");
                setSnackbarSeverity('error');
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                // Handling errors specifically from Axios
                setSnackbarMessage(error.response?.data.message || "An error occurred during registration.");
            } else {
                // Generic error handling
                setSnackbarMessage("An unexpected error occurred. Please try again later.");
            }
            setSnackbarSeverity('error');
        }

        setOpenSnackbar(true);  // This will trigger the Snackbar to open
    };


    const handleGoogleSignUp = () => {
        console.log('Initiate Google Sign Up');
        // Here you would initiate the Google sign-up process
    };
    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };
    return (
        <Container maxWidth="sm">
            <Typography variant="h4" component="h1" gutterBottom>
                Register
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="First Name"
                            variant="outlined"
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Last Name"
                            variant="outlined"
                            value={lastName}
                            onChange={e => setLastName(e.target.value)}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Email"
                            type="email"
                            variant="outlined"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" fullWidth variant="contained" color="primary">
                            Submit
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button fullWidth variant="outlined" color="secondary" onClick={handleGoogleSignUp}>
                            Sign Up with Google
                        </Button>
                    </Grid>
                </Grid>
            </form>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
}

export default Registration;
