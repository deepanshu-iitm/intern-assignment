import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { fetchStocks } from './features/stocksSlice';
import Dropdown from './components/Dropdown';
import DurationSelector from './components/DurationSelector';
import InfoCards from './components/InfoCards';
import Graph from './components/Graph';
import Layout from './components/Layout';
import { Box, CircularProgress, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { CenterFocusStrong } from '@mui/icons-material';

const App: React.FC = () => {
    const dispatch = useAppDispatch();
    const loading = useAppSelector((state) => state.stocks.loading);
    const selectedStock = useAppSelector((state) => state.stocks.selectedStock);
    const selectedDuration = useAppSelector((state) => state.stocks.selectedDuration);

    useEffect(() => {
        dispatch(fetchStocks());
    }, [dispatch]);

    return (
        <Layout>
            <Grid container spacing={8} justifyContent="center">
                {/* Dropdown Section */}
                <Grid size={{ xs: 12, md: 8 }}>
                    {loading ? (
                        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                            <CircularProgress />
                        </Box>
                    ) : (
                        <Dropdown />
                    )}
                </Grid>

                {/* Duration Selector */}
                {selectedStock && (
                    <Grid size={{ xs: 12, md: 8 }}>
                        <DurationSelector />
                    </Grid>
                )}

                {/* Info Cards */}
                {selectedStock && selectedDuration && (
                    <Grid size={{ xs: 12, md: 10 }}>
                        <InfoCards />
                    </Grid>
                )}

                {/* Graph Section */}
                {selectedStock && selectedDuration ? (
                    <Grid size={{ xs: 12, md: 10 }}>
                        <Graph />
                    </Grid>
                ) : (
                    <Grid size={{ xs: 12 }}>
                        <Box textAlign="center" sx={{ padding: 4 }}>
                            <Typography variant="h6" color="textSecondary">
                                Please select a stock and duration to view analytics.
                            </Typography>
                        </Box>
                    </Grid>
                )}
            </Grid>
        </Layout>
    );
};

export default App;
