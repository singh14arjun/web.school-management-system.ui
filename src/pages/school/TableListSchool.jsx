import React from 'react'
import { address } from '../../data/address'
import NoDataFound from '../NoDataFound'

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Avatar,
    Chip,
    Button
} from '@mui/material'
import { useNavigate } from 'react-router-dom'

const TableListSchool = ({ schools, getBorderColorTable }) => {

    const navigate = useNavigate();

    const handleNavigate = (id) => {
        navigate(`/school/${id}`);
    }

    if (schools.length === 0) {
        return <NoDataFound />
    }

    return (
        <TableContainer component={Paper} elevation={2}>
            <Table>

                <TableHead>
                    <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                        <TableCell><b>School</b></TableCell>
                        <TableCell><b>Code</b></TableCell>
                        <TableCell><b>Type</b></TableCell>
                        <TableCell><b>Medium</b></TableCell>
                        <TableCell><b>Students</b></TableCell>
                        <TableCell><b>Teachers</b></TableCell>
                        <TableCell><b>Address</b></TableCell>
                        <TableCell><b>Phone</b></TableCell>
                        <TableCell><b>Status</b></TableCell>
                        <TableCell><b>Action</b></TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {schools.map((school) => {
                        const addr = address.find((a) => a.id === school.addressId) || {}

                        return (
                            <TableRow
                                key={school.id}
                                hover
                                sx={{
                                    borderLeft: '6px solid',
                                    borderColor: getBorderColorTable(school?.type)?.replace('border-', ''),
                                }}
                            >

                                <TableCell>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <Avatar
                                            src={school.schoolLogo || "https://via.placeholder.com/40"}
                                            variant="rounded"
                                        />
                                        {school.schoolName}
                                    </div>
                                </TableCell>

                                <TableCell>{school.schoolCode}</TableCell>
                                <TableCell>{school.type}</TableCell>
                                <TableCell>{school.medium}</TableCell>
                                <TableCell>{school.totalStudents || 0}</TableCell>
                                <TableCell>{school.totalTeachers || 0}</TableCell>

                                <TableCell>
                                    {addr.street || 'N/A'}, {addr.city || ''}, {addr.state || ''}
                                </TableCell>

                                <TableCell>{school.schoolPhone}</TableCell>

                                <TableCell>
                                    <Chip
                                        label={school.isActive ? 'Active' : 'Inactive'}
                                        color={school.isActive ? 'success' : 'error'}
                                        size="small"
                                    />
                                </TableCell>

                                <TableCell>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        onClick={() => handleNavigate(school.id)}
                                    >
                                        View
                                    </Button>
                                </TableCell>

                            </TableRow>
                        )
                    })}
                </TableBody>

            </Table>
        </TableContainer>
    )
}

export default TableListSchool