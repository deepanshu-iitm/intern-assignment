import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store/store';

// Async thunk to fetch the list of stocks
export const fetchStocks = createAsyncThunk('stocks/fetchStocks', async () => {
    const response = await axios.get('/api/stocks');
    return response.data;
});

// Async thunk to fetch stock data dynamically
export const fetchStockData = createAsyncThunk(
    'stocks/fetchStockData',
    async ({ id, duration }: { id: string; duration: string }, { getState }) => {
        let allData: any[] = [];
        let status = 'IN_PROGRESS';

        // Continuously fetch data until status is COMPLETE
        while (status === 'IN_PROGRESS') {
            const response = await axios.post(`/api/stocks/${id}`, { duration });
            const { data, status: newStatus } = response.data;

            // Filter out duplicate timestamps
            const existingTimestamps = new Set(allData.map((item) => item.timestamp));
            const newData = data.filter((item: any) => !existingTimestamps.has(item.timestamp));

            allData = [...allData, ...newData]; // Append new, unique data
            status = newStatus;

            // Simulate delay between requests
            await new Promise((resolve) => setTimeout(resolve, 1000));
        }

        return { id, duration, data: allData };
    }
);

// State types
interface Stock {
    id: string;
    name: string;
    symbol: string;
    available: string[];
}

interface StocksState {
    list: Stock[];
    selectedStock: string | null;
    selectedDuration: string | null;
    graphData: Record<string, any[]>;
    loading: boolean;
    status: Record<string, string>;
}

const initialState: StocksState = {
    list: [],
    selectedStock: null,
    selectedDuration: null,
    graphData: {},
    loading: false,
    status: {},
};

const stocksSlice = createSlice({
    name: 'stocks',
    initialState,
    reducers: {
        selectStock(state, action) {
            state.selectedStock = action.payload;
        },
        selectDuration(state, action) {
            state.selectedDuration = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchStocks.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchStocks.fulfilled, (state, action) => {
                state.list = action.payload;
                state.loading = false;
            })
            .addCase(fetchStocks.rejected, (state) => {
                state.loading = false;
            })
            .addCase(fetchStockData.fulfilled, (state, action) => {
                const { id, duration, data } = action.payload;
                const key = `${id}-${duration}`;

                // Append new data while avoiding duplicates
                const existingData = state.graphData[key] || [];
                const existingTimestamps = new Set(existingData.map((item) => item.timestamp));
                const uniqueNewData = data.filter((item: any) => !existingTimestamps.has(item.timestamp));

                state.graphData[key] = [...existingData, ...uniqueNewData]; // Append new data
                state.status[key] = 'COMPLETE'; // Mark as complete
            });
    },
});

export const { selectStock, selectDuration } = stocksSlice.actions;

// Selectors
export const selectGraphData = createSelector(
    [
        (state: RootState) => state.stocks.graphData,
        (state: RootState) => state.stocks.selectedStock,
        (state: RootState) => state.stocks.selectedDuration,
    ],
    (graphData, selectedStock, selectedDuration) => {
        if (!selectedStock || !selectedDuration) return [];
        return graphData[`${selectedStock}-${selectedDuration}`] || [];
    }
);

export const selectGraphStatus = createSelector(
    [
        (state: RootState) => state.stocks.status,
        (state: RootState) => state.stocks.selectedStock,
        (state: RootState) => state.stocks.selectedDuration,
    ],
    (status, selectedStock, selectedDuration) => {
        if (!selectedStock || !selectedDuration) return 'UNKNOWN';
        return status[`${selectedStock}-${selectedDuration}`] || 'UNKNOWN';
    }
);

export const selectLoading = createSelector(
    [(state: RootState) => state.stocks.loading],
    (loading) => loading
);

export default stocksSlice.reducer;
