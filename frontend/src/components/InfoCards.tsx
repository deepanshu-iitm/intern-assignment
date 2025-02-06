import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useAppSelector } from '../store/hooks';

const InfoCards: React.FC = () => {
    const graphData = useAppSelector((state) => state.stocks.graphData);
    const selectedStock = useAppSelector((state) => state.stocks.selectedStock);
    const selectedDuration = useAppSelector((state) => state.stocks.selectedDuration);

    const data = graphData[`${selectedStock}-${selectedDuration}`] || [];
    const latestData = data.length ? data[data.length - 1] : null;

    return (
        <Grid container spacing={4} justifyContent="center">
            {/* Current Price */}
            <Grid size={{ xs: 12, md: 4 }}>
                <Card sx={{ backgroundColor: '#1e3a8a', color: '#fff', borderRadius: '8px' }}>
                    <CardContent>
                        <Typography variant="h6">Current Price</Typography>
                        <Typography variant="h4" sx={{ fontWeight: 700 }}>
                            {latestData ? `$${latestData.price.toFixed(2)}` : '--'}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>

            {/* Change % */}
            <Grid size={{ xs: 12, md: 4 }}>
                <Card sx={{ backgroundColor: '#3b82f6', color: '#fff', borderRadius: '8px' }}>
                    <CardContent>
                        <Typography variant="h6">Change %</Typography>
                        <Typography variant="h4" sx={{ fontWeight: 700 }}>
                            {latestData ? `${latestData.change.toFixed(2)}%` : '--'}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default InfoCards;
