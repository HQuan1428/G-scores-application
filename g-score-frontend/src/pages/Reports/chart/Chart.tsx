'use client';
import { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import ChartComponent from './chartComponent';
import { Typography, Container, Box, CircularProgress } from '@mui/material';
import Grid from '@mui/material/Grid';
import studentServices from '../../../services/studentService';
import { StatisticsSubject } from '../../../lib/interface';

const theme = createTheme();

const Chart = () => {
    const [statistics, setStatistics] = useState<StatisticsSubject[] | []>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await studentServices.getStatistics();
                setStatistics(data);
            } catch (error: any) {
                console.error("Failed to fetch statistics:", error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth="lg">
                <Box sx={{ my: 4 }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Báo cáo phổ điểm các môn học
                    </Typography>

                    {isLoading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <Grid container spacing={4}>
                            {statistics.map((subjectData) => {
                                const scoreRanges = Object.keys(subjectData).filter(key => key !== 'subject');
                                const singleChartXAxis = scoreRanges;
                                const singleChartSeries = [{
                                    label: 'Số lượng',
                                    data: scoreRanges.map((range) => Number(subjectData[range as keyof typeof subjectData]))
                                }];

                                return (
                                    <Grid
                                        key={subjectData.subject}
                                        sx={{
                                            width: '100%', 
                                            [theme.breakpoints.up('md')]: {},
                                            [theme.breakpoints.up('lg')]: {},
                                        }}
                                    >
                                        <ChartComponent
                                            title={subjectData.subject}
                                            xAxisData={singleChartXAxis}
                                            seriesData={singleChartSeries}
                                            height={300}
                                        />
                                    </Grid>
                                );
                            })}
                        </Grid>
                    )}
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default Chart;