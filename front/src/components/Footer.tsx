import React from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';

const Footer: React.FC = () => {
    return (
        <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
            <Container maxWidth="lg">
                <Grid container spacing={4} justifyContent="space-between">
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" color="text.primary" gutterBottom>
                            Home Assist
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            © 2024 Home. All rights reserved.
                        </Typography>
                    </Grid>
                    {/*<Grid item xs={12} sm={4}>*/}
                    {/*    <Typography variant="h6" color="text.primary" gutterBottom>*/}
                    {/*        Follow Us*/}
                    {/*    </Typography>*/}
                    {/*    /!*<IconButton aria-label="Facebook" href="https://facebook.com">*!/*/}
                    {/*    /!*    <Facebook />*!/*/}
                    {/*    /!*</IconButton>*!/*/}
                    {/*    /!*<IconButton aria-label="Twitter" href="https://twitter.com">*!/*/}
                    {/*    /!*    <Twitter />*!/*/}
                    {/*    /!*</IconButton>*!/*/}
                    {/*    /!*<IconButton aria-label="Instagram" href="https://instagram.com">*!/*/}
                    {/*    /!*    <Instagram />*!/*/}
                    {/*    /!*</IconButton>*!/*/}
                    {/*</Grid>*/}
                </Grid>
            </Container>
        </Box>
    );
};

export default Footer;
