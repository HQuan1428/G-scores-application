import { useEffect, useState } from 'react';
import TopTenUI from './TopTenUI';
import studentServices from '../../../services/studentService';
import { CircularProgress } from '@mui/material';
import { StudentDataAGroup } from '../../../lib/interface';

const TopTen= () => {
    const [topTen, setTopTen] = useState<StudentDataAGroup[] | []>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await studentServices.getTopTen();
                setTopTen(data);
            } catch (error: any) {
                console.error(error.message); 
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);
    console.log(topTen);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Top Ten A Group </h1>
            <table className="p min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
                <thead>
                    <tr className="bg-gray-100 text-left text-gray-700 uppercase text-sm">
                        <th className="px-6 py-3 border-b">#</th>
                        <th className="px-6 py-3 border-b">Registration Number</th>
                        <th className="px-6 py-3 border-b">Math</th>
                        <th className="px-6 py-3 border-b">Physics</th>
                        <th className="px-6 py-3 border-b">Chemistry</th>
                        <th className="px-6 py-3 border-b">Total</th>
                    </tr>
                </thead>
                {isLoading ? (
                    <tbody >
                        <tr>
                            <td colSpan={6} className="text-center py-8">
                                <CircularProgress />
                            </td>
                        </tr>
                    </tbody>
                ) : (
                    <TopTenUI data={topTen} />
                )}
            </table>
        </div>
    );
};

export default TopTen;
