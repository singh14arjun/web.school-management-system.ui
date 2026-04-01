import React from 'react';
import { address } from '../../data/address';
import { useNavigate } from 'react-router-dom';
const GridSchoolList = ({ schools, getBgColor, getBorderColor }) => {
    const navigate = useNavigate();

    const handleViewSchool = (schoolId) => {
        navigate(`/school/${schoolId}`);
    };
    return (
        <div className="grid grid-cols-3 gap-5">
            {schools.map((school, i) => {
                const addr = address.find((a) => a.id === school.addressId);

                return (
                    <div
                        key={school.id}
                        className={`${school?.isActive ? getBgColor(school?.type) : 'bg-red-50'} 
            rounded-xl border-l-8 border shadow-sm p-5 ${getBorderColor(school?.type)}`}
                        onClick={() => handleViewSchool(school.id)}
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <img
                                className="w-14 h-14 rounded-xl object-cover"
                                src={school?.schoolLogo || "https://via.placeholder.com/80"}
                                alt="logo"
                            />
                            <div>
                                <h3 className="font-bold">{school?.schoolName}</h3>
                                <p className="text-xs text-gray-400">{school?.schoolCode}</p>
                            </div>
                        </div>

                        <p>{addr?.street || "N/A"}, {addr?.pincode || "N/A"}</p>
                        <p className="text-sm text-gray-500">
                            {addr?.city || 'N/A'}, {addr?.state || ''}
                        </p>

                        <div className={`grid grid-cols-2 gap-2 text-sm py-3`}>
                            <div>Type: {school?.type}</div>
                            <div>Medium: {school?.medium}</div>
                            <div>Students: {school?.totalStudents || 0}</div>
                            <div>Teachers: {school?.totalTeachers || 0}</div>
                        </div>

                        <div className="flex justify-between text-xs pt-3">
                            <span>{school?.schoolPhone}</span>
                            <span className={school?.isActive ? 'text-green-600' : 'text-red-500'}>
                                {school?.isActive ? 'Active' : 'Inactive'}
                            </span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default GridSchoolList;