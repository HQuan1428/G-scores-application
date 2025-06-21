import React from 'react';

interface TopStudent {
    registration_number: string;
    toan: number;   
    vat_li: number;
    hoa_hoc: number;
    total_score: number;
}

interface Props {
    data: TopStudent[];
}


const TopTenUI:React.FC<Props> = ({ data }) => {
    return (
        <tbody>
            {data.map((student, idx) => (
                <tr key={student.registration_number} className="hover:bg-gray-50">
                    <td className="px-6 py-4 border-b">{idx + 1}</td>
                    <td className="px-6 py-4 border-b">{student.registration_number}</td>
                    <td className="px-6 py-4 border-b">{student.toan}</td>
                    <td className="px-6 py-4 border-b">{student.vat_li}</td>
                    <td className="px-6 py-4 border-b">{student.hoa_hoc}</td>
                    <td className="px-6 py-4 border-b font-semibold">{student.total_score}</td>
                </tr>
            ))}
        </tbody>
    );
}

export default TopTenUI;