import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    CircularProgress,
    Typography,
    Button,
    TextField,
    Avatar,
    Dialog,
    DialogTitle,
    DialogContent,
    TablePagination
} from '@mui/material';
import NoDataFound from './NoDataFound';
import { Link } from 'react-router-dom';

const AllStudents = () => {
    const [students, setStudents] = useState([]);
    const [classes, setClasses] = useState([]);
    const [sections, setSections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [classId, setClassId] = useState("");
    const [sectionId, setSectionId] = useState("");
    const [search, setSearch] = useState("");

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [selectedStudent, setSelectedStudent] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [studentsRes, classesRes, sectionsRes] = await Promise.all([
                    axios.get("http://localhost:3000/students"),
                    axios.get("http://localhost:3000/classes"),
                    axios.get("http://localhost:3000/sections"),
                ]);

                setStudents(studentsRes.data);
                setClasses(classesRes.data);
                setSections(sectionsRes.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const getClassName = (id) => {
        const cls = classes.find(c => c.classId === id);
        return cls ? cls.className : "N/A";
    };

    const getSectionName = (id) => {
        const sec = sections.find(s => s.sectionId === id);
        return sec ? sec.sectionName : "N/A";
    };

    const filteredSections = sections.filter(sec =>
        classId ? sec.classId === classId : true
    );

    const filteredStudents = students.filter(student => {
        return (
            (classId ? student.classId === classId : true) &&
            (sectionId ? student.sectionId === sectionId : true) &&
            student.name.toLowerCase().includes(search.toLowerCase())
        );
    });

    const paginatedStudents = filteredStudents.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    return (
        <Box p={3}>
            <Typography variant="h5" mb={2}>
                Students List
            </Typography>

            <Box display="flex" gap={2} mb={3}>
                <TextField
                    label="Search by Name"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    fullWidth
                />

                <FormControl fullWidth>
                    <InputLabel>Class</InputLabel>
                    <Select
                        value={classId}
                        label="Class"
                        onChange={(e) => {
                            setClassId(e.target.value);
                            setSectionId("");
                        }}
                    >
                        <MenuItem value="">All Classes</MenuItem>
                        {classes.map(cls => (
                            <MenuItem key={cls.classId} value={cls.classId}>
                                {cls.className}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth>
                    <InputLabel>Section</InputLabel>
                    <Select
                        value={sectionId}
                        label="Section"
                        onChange={(e) => setSectionId(e.target.value)}
                    >
                        <MenuItem value="">All Sections</MenuItem>
                        {filteredSections.map(sec => (
                            <MenuItem key={sec.sectionId} value={sec.sectionId}>
                                {sec.sectionName}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            {loading ? (
                <Box display="flex" justifyContent="center">
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Typography color="error">{error.message}</Typography>
            ) : (
                <Paper>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Avatar</TableCell>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Class</TableCell>
                                    <TableCell>Section</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {paginatedStudents.length === 0 ? (
                                    <NoDataFound />
                                ) : (
                                    paginatedStudents.map(student => (
                                        <TableRow key={student.studentId} hover>
                                            <TableCell>
                                                <Avatar src={student?.image} />
                                            </TableCell>
                                            <TableCell>{student?.studentId}</TableCell>
                                            <TableCell>{student?.name}</TableCell>
                                            <TableCell>{getClassName(student?.classId)}</TableCell>
                                            <TableCell>{getSectionName(student?.sectionId)}</TableCell>
                                            <TableCell>
                                                <Link to={`/school-admin/student/${student?.studentId}`}>
                                                    View
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <TablePagination
                        component="div"
                        count={filteredStudents.length}
                        page={page}
                        onPageChange={(e, newPage) => setPage(newPage)}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={(e) => {
                            setRowsPerPage(parseInt(e.target.value, 10));
                            setPage(0);
                        }}
                    />
                </Paper>
            )}


        </Box>
    );
};

export default AllStudents;