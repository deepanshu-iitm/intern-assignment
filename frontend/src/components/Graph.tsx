import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Box, Typography, CircularProgress } from '@mui/material';  
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchStockData, selectGraphData, selectGraphStatus } from '../features/stocksSlice';
import type { ChartOptions } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Graph: React.FC = () => {
    const dispatch = useAppDispatch();
    const selectedStock = useAppSelector((state) => state.stocks.selectedStock);
    const selectedDuration = useAppSelector((state) => state.stocks.selectedDuration);
    const graphData = useAppSelector(selectGraphData);
    const graphStatus = useAppSelector(selectGraphStatus);

    const [displayData, setDisplayData] = useState(graphData);

    useEffect(() => {
        if (selectedStock && selectedDuration) {
            dispatch(fetchStockData({ id: selectedStock, duration: selectedDuration }));
        }
    }, [selectedStock, selectedDuration, dispatch]);

    useEffect(() => {
        setDisplayData(graphData);
    }, [graphData]);

    if (!displayData.length && graphStatus !== 'COMPLETE') {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
                <CircularProgress size={60} thickness={5} color="primary" />
            </Box>
        );
    }

    const chartData = {
        labels: displayData.map((point: any) => point.timestamp),
        datasets: [
            {
                label: 'Stock Price',
                data: displayData.map((point: any) => point.price),
                borderColor: '#3b82f6',
                backgroundColor: (context: any) => {
                    const chart = context.chart;
                    const { ctx, chartArea } = chart;
                    if (!chartArea) return null;

                    const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
                    gradient.addColorStop(0, 'rgba(59, 130, 246, 0.4)');
                    gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
                    return gradient;
                },
                borderWidth: 3,
                pointRadius: 0,
                fill: true,
                tension: 0.3,
            },
        ],
    };

    const chartOptions: ChartOptions<'line'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: true,
                mode: 'index',
                intersect: false,
            },
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: { color: '#666' },
            },
            y: {
                grid: { color: '#e0e0e0' },
                ticks: { color: '#666' },
            },
        },
    };

    return (
        <Box sx={{ position: 'relative', paddingBottom: 2 }}>
            <Box sx={{ height: '400px' }}>
                <Line data={chartData} options={chartOptions} />
            </Box>

            {graphStatus === 'IN_PROGRESS' && (
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(255, 255, 255, 0.6)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 1,
                    }}
                >
                    <CircularProgress size={50} thickness={4} color="secondary" />
                </Box>
            )}
        </Box>
    );
};

export default Graph;
