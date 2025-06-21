'use client';
import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { Typography, Box } from '@mui/material';

// Sửa đổi ở đây: Thay đổi kiểu dữ liệu của 'data' từ 'StorageManager[]' thành 'number[]'
interface ChartSeries {
    data: number[]; // <--- THAY ĐỔI QUAN TRỌNG
    label?: string;
    id?: string;
    [key: string]: any;
}

export interface CustomizableBarChartProps {
    title?: string;
    xAxisData: string[];
    seriesData: ChartSeries[];
    height?: number;
}

const ChartComponent: React.FC<CustomizableBarChartProps> = ({
    title,
    xAxisData,
    seriesData,
    height = 300
}) => {
    if (!xAxisData || !seriesData || xAxisData.length === 0 || seriesData.length === 0) {
        return <Typography>Không có dữ liệu để hiển thị.</Typography>;
    }

    // Đảm bảo rằng dữ liệu được truyền vào BarChart là hợp lệ
    // BarChart mong đợi dữ liệu series là một mảng các đối tượng,
    // mỗi đối tượng có thuộc tính `data` là một mảng các số.
    const validSeriesData = seriesData.map(series => ({
        ...series,
        data: series.data.map(item => (typeof item === 'number' ? item : 0)) // Chuyển đổi an toàn
    }));


    return (
        <Box sx={{ width: '100%' }}>
            {title && (
                <Typography variant="h6" component="h3" align="center" gutterBottom>
                    {title}
                </Typography>
            )}
            <div style={{ height: `${height}px` }}>
                <BarChart
                    xAxis={[{ scaleType: 'band', data: xAxisData }]}
                    // Sử dụng dữ liệu đã được xác thực
                    series={validSeriesData}
                />
            </div>
        </Box>
    );
};

export default ChartComponent;