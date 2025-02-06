import React from 'react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { selectDuration } from '../features/stocksSlice';
import { ButtonGroup, Button, Box, Typography } from '@mui/material';

const DurationSelector: React.FC = () => {
    const dispatch = useAppDispatch();
    const selectedStock = useAppSelector((state) => state.stocks.selectedStock);
    const selectedDuration = useAppSelector((state) => state.stocks.selectedDuration);
    const stocks = useAppSelector((state) => state.stocks.list);

    const stock = stocks.find((s) => s.id === selectedStock);

    if (!stock) return null;

    return (
        <Box sx={{ marginBottom: 4, textAlign: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 600, marginBottom: 2, color: '#1e3a8a' }}>
                Select Timeframe 
            </Typography>

            <ButtonGroup variant="outlined" color="primary" sx={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
                {stock.available.map((duration) => (
                    <Button
                        key={duration}
                        onClick={() => dispatch(selectDuration(duration))}
                        sx={{
                            textTransform: 'none',
                            fontWeight: selectedDuration === duration ? 'bold' : 'normal',
                            backgroundColor: selectedDuration === duration ? '#1976d2' : '#fff',
                            color: selectedDuration === duration ? '#fff' : '#1976d2',
                            '&:hover': {
                                backgroundColor: selectedDuration === duration ? '#1565c0' : '#e3f2fd',
                            },
                        }}
                    >
                        {duration.toUpperCase()}
                    </Button>
                ))}
            </ButtonGroup>
        </Box>
    );
};

export default DurationSelector;
