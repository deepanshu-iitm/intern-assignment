import React from 'react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { selectStock } from '../features/stocksSlice';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Box, Typography } from '@mui/material';

const Dropdown: React.FC = () => {
    const dispatch = useAppDispatch();
    const stocks = useAppSelector((state) => state.stocks.list);
    const selectedStock = useAppSelector((state) => state.stocks.selectedStock);

    const handleChange = (event: SelectChangeEvent<string>) => {
        dispatch(selectStock(event.target.value));
    };

    return (
        <Box sx={{ marginBottom: 4, textAlign: 'center' }}>
            <Typography variant="h5" sx={{ fontWeight: 700, marginBottom: 2, color: '#1e3a8a' }}>
                Select a Stock 
            </Typography>

            <FormControl
                fullWidth
                variant="outlined"
                sx={{
                    backgroundColor: '#fff',
                    borderRadius: '12px',
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
                }}
            >
                <InputLabel id="stock-select-label">Stock</InputLabel>
                <Select
                    labelId="stock-select-label"
                    value={selectedStock || ''}
                    onChange={handleChange}
                    label="Stock"
                    sx={{
                        padding: '6px',
                        fontWeight: 600,
                        '& .MuiSelect-icon': {
                            color: '#1e88e5',
                        },
                        '&:hover': {
                            backgroundColor: '#e3f2fd',
                        },
                    }}
                >
                    {stocks.map((stock) => (
                        <MenuItem key={stock.id} value={stock.id}>
                            {stock.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
};

export default Dropdown;
