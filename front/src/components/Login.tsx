import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { TextField, Button, Container, Box, Typography } from '@mui/material';
import {Backend} from "../services/backend";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState<'success' | 'error'>('success');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const navigate = useNavigate();


    const handleLogin = (event: React.FormEvent) => {
        event.preventDefault();
        const loginData = {
            username,
            password
        };

        Backend.post('auth/login', loginData)
            .then(response => {
                setTimeout(() => {
                    navigate('/dashboard');
                }, 3000);
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
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Please sign in
                </Typography>
                <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Typography>
                        Don't have an account? <Link to="/register">Register</Link>
                    </Typography>
                </Box>
                <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                    <Alert onClose={handleCloseSnackbar} severity={severity}>
                        {message}
                    </Alert>
                </Snackbar>
            </Box>
        </Container>
    );
}

export default Login;
