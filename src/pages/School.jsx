import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, Card, CardContent, Typography, Box } from "@mui/material";
import axios from 'axios'
const School = () => {
    const [schools, setSchools] = useState([])
    useEffect(() => {
        axios.get('http://localhost:3000/schools')
            .then(response => {
                setSchools(response.data)
                console.log(response.data);

            })
            .catch(error => {
                console.error('Error fetching schools:', error)
            })
    }, [])

    const getBorderColor = (type) => {
        switch (type) {
            case 'Primary': return 'border-blue-500';
            case 'Secondary': return 'border-green-500';
            case 'Higher Secondary': return 'border-red-500';
            case 'K-12': return 'border-yellow-500';
            default: return 'border-purple-500';
        }
    };
    const getBackgroundColor = (type) => {
        switch (type) {
            case 'Primary': return 'bg-blue-500/10';
            case 'Secondary': return 'bg-green-500/10';
            case 'Higher Secondary': return 'bg-red-500/10';
            case 'K-12': return 'bg-yellow-500/10';
            default: return 'bg-purple-500/10';
        }
    };
    return (
        <div className='p-4'>
            <div className='flex justify-between items-center w -full'>
                <Card className='grid grid-cols-3 gap-10 w-full'>
                    {
                        schools.map((school) => (
                            <Card
                                key={school.id}
                                className={`shadow-lg rounded-2xl cursor-pointer border-l-8 hover:bg-gray-500 ${getBorderColor(school.type)}  `}
                            >
                                <CardContent className={`${getBackgroundColor(school.type)} `}>

                                    <Box className="flex items-center gap-4 mb-3">
                                        <img
                                            className="w-16 h-16 rounded-full object-cover border"
                                            src={school.schoolLogo || "https://via.placeholder.com/80"}
                                            alt="logo"
                                        />

                                        <Box>
                                            <Typography variant="h6" className="font-bold">
                                                {school.schoolName}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {school.schoolCode}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    <Typography variant="body2" className="mb-2 text-gray-600">
                                        📍 {school.address?.city || 'N/A'}, {school.address?.state || ''}
                                    </Typography>

                                    <Box className="grid grid-cols-2 gap-2 text-sm mb-3">
                                        <div><strong>Type:</strong> {school.type}</div>
                                        <div><strong>Medium:</strong> {school.medium}</div>
                                        <div><strong>Students:</strong> {school.totalStudents || 0}</div>
                                        <div><strong>Teachers:</strong> {school.totalTeachers || 0}</div>
                                        <div><strong>Phone:</strong> {school.schoolPhone}</div>
                                        <div><strong>Status:</strong>
                                            <span className={`ml-1 font-semibold ${school.isActive ? 'text-green-600' : 'text-red-500'}`}>
                                                {school.isActive ? 'Active' : 'Inactive'}
                                            </span>
                                        </div>
                                    </Box>

                                    {school.schoolImages?.length > 0 && (
                                        <Box className="flex gap-2 overflow-x-auto mb-3">
                                            {school.schoolImages.map((img, index) => (
                                                <img
                                                    key={index}
                                                    src={img}
                                                    alt="school"
                                                    className="w-20 h-20 rounded-lg object-cover border"
                                                />
                                            ))}
                                        </Box>
                                    )}

                                    <Box className="text-xs text-gray-500">
                                        <div>Email: {school.schoolEmail}</div>
                                        <div>Affiliation: {school.affiliationId}</div>
                                    </Box>

                                </CardContent>
                            </Card>
                        ))
                    }
                </Card>
            </div>

        </div>
    )
}

export default School