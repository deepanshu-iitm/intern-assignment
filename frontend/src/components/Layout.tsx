import React from 'react';
import { AppBar, Toolbar, Typography, Container, CssBaseline, Box, Link } from '@mui/material';

const Layout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    return (
        <>
            <CssBaseline />

            {/* Header */}
            <AppBar
                position="sticky"
                elevation={2}
                sx={{
                    background: 'linear-gradient(to right, #1e3a8a, #1976d2)',
                    borderBottom: '1px solid #e0e0e0',
                    padding: '12px 24px',
                }}
            >
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#fff' }}>Stock Analytics Dashboard
                    </Typography>
                    <Link href="#" color="inherit" underline="hover">
                        Contact Us
                    </Link>
                </Toolbar>
            </AppBar>

            {/* Main Content */}
            <Container
                maxWidth="lg"
                sx={{
                    marginTop: 6,
                    padding: 4,
                    backgroundColor: '#f9fafb',
                    borderRadius: '12px',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
                }}
            >
                {children}
            </Container>
        </>
    );
};

export default Layout;
