import React from 'react'
import { BiPlus } from 'react-icons/bi'
import { GiStarFlag, GiTeacher } from 'react-icons/gi'
import { MdClass } from 'react-icons/md'
import { PiStudent } from 'react-icons/pi'
import { Box, CircularProgress } from "@mui/material";

const SchoolAdminDashborad = () => {

    const stats = [
        {
            title: "Total Students",
            value: 100,
            present: 80,
            icon: <PiStudent className='text-2xl' />
        },
        {
            title: "Total Teachers",
            value: 50,
            present: 45,
            icon: <GiTeacher className='text-2xl' />
        },
        {
            title: "Total Staff",
            value: 30,
            present: 15,
            icon: <GiStarFlag className='text-2xl' />
        },
        {
            title: "Total Classes",
            value: 10,
            present: 9,
            icon: <MdClass className='text-2xl' />
        }
    ];

    const getBorderColor = (title) => {
        const map = {
            "Total Students": "border-green-600",
            "Total Teachers": "border-cyan-600",
            "Total Staff": "border-purple-600",
            "Total Classes": "border-blue-600",
        };

        return map[title] || "border-gray-600";
    };

    const getBgColor = (title) => {
        const map = {
            "Total Students": "bg-green-100",
            "Total Teachers": "bg-cyan-100",
            "Total Staff": "bg-purple-100",
            "Total Classes": "bg-blue-100",
        };

        return map[title] || "bg-gray-600";
    };

    return (

        <div>

            <div className='flex justify-between items-center'>
                <div>
                    <p className='text-2xl font-semibold'>Dashboard Overview</p>
                    <p className='text-gray-500'>Welcome to your school dashboard</p>
                </div>

                <div className='flex gap-2'>
                    <button className='bg-gray-200 p-2 rounded-md'>Generate Report</button>
                    <button className='bg-indigo-600 text-white p-2 rounded-md flex items-center gap-2'>
                        <BiPlus /> New Admission
                    </button>
                </div>
            </div>

            <div className='grid grid-cols-4 gap-4 mt-4'>
                {stats.map((item, index) => {
                    const percent = Math.round((item.present / item.value) * 100);

                    return (
                        <div key={index} className={`bg-gray-200 shadow-md p-4 rounded-md flex items-center justify-between border-l-8 ${getBorderColor(item?.title)} ${getBgColor(item?.title)}`}>

                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    {item.icon}
                                    <p className='font-semibold'>{item.title}</p>
                                </div>

                                <p className='text-xl font-bold'>{item.value}</p>

                                <p className='text-sm text-green-600'>
                                    Present: {item.present}
                                </p>

                                <p className='text-sm text-red-500'>
                                    Absent: {item.value - item.present}
                                </p>
                            </div>

                            <div className="relative p-2 rounded">
                                <Box
                                    sx={{
                                        position: "relative",
                                        display: "inline-flex",
                                        border: "1px solid #e5e7eb",
                                        borderRadius: "50%",
                                        padding: "6px"
                                    }}
                                >
                                    <CircularProgress
                                        variant="determinate"
                                        value={100}
                                        size={60}
                                        thickness={5}
                                        sx={{ color: "#ffffff", position: "absolute" }}
                                    />

                                    <CircularProgress
                                        variant="determinate"
                                        value={percent}
                                        size={60}
                                        thickness={5}
                                        color={percent > 75 ? "success" : percent > 50 ? "warning" : "error"}
                                    />
                                </Box>

                                <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold">
                                    {percent}%
                                </div>
                            </div>

                        </div>
                    );
                })}
            </div>

        </div>
    )
}

export default SchoolAdminDashborad