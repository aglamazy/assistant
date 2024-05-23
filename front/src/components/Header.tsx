import {AppBar, Button, Toolbar, Typography} from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import {General} from "../config/General";

const Header: React.FC = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    {General.AppName}
                </Typography>
                <Button color="inherit" component={Link} to="/">Home</Button>
                <Button color="inherit" component={Link} to="/register">Register</Button>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
