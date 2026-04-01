import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import {
    Card,
    CardContent,
    Typography,
    Avatar,
    Chip,
    Divider,
    Grid,
    Box
} from "@mui/material";

const ViewStudentDeatils = () => {
    const { id } = useParams()
    const [student, setStudent] = useState([])
    const [address, setAddress] = useState(null);
    const [classes, setClasses] = useState(null);
    const [section, setSection] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const studentRes = await axios.get(
                    `http://localhost:3000/students?studentId=${id}`
                );
                const studentData = studentRes.data[0];
                console.log(studentData);
                setStudent(studentData);

                if (studentData?.addressId) {
                    const addressRes = await axios.get(
                        `http://localhost:3000/addresses/${studentData.addressId}`
                    );
                    setAddress(addressRes.data);
                }
                if (studentData?.classId) {
                    const classRes = await axios.get(
                        `http://localhost:3000/classes/${studentData.classId}`
                    );
                    setClasses(classRes.data);
                }
                if (studentData?.sectionId) {
                    const sectionRes = await axios.get(
                        `http://localhost:3000/sections/${studentData.sectionId}`
                    );
                    setSection(sectionRes.data);
                }

            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, [id]);
    return (
        <div>
            <Box sx={{ p: 5 }}>

                <h1 className='text-4xl font-semibold mb-10 ml-20'>Student Details</h1>

                <Card
                    sx={{
                        maxWidth: 950,
                        mx: "auto",
                        borderRadius: 2,
                        borderLeft: "12px solid #09609bff",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                        overflow: "hidden"
                    }}
                >
                    <CardContent>

                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 3,
                                mb: 3,
                                p: 2,
                                borderRadius: 3,
                                background: "linear-gradient(135deg, #e0f2fe, #f0f9ff)"
                            }}
                        >
                            <Avatar
                                src={student?.image}
                                alt={student?.name}
                                sx={{
                                    width: 90,
                                    height: 90,
                                    border: "3px solid white",
                                    boxShadow: 2
                                }}
                            />

                            <Box>
                                <Typography variant="h5" fontWeight="bold">
                                    {student?.name}
                                </Typography>

                                <Typography color="text.secondary" sx={{ mb: 1 }}>
                                    Student ID: {student?.studentId}
                                </Typography>

                                <Box sx={{ display: "flex", gap: 1 }}>
                                    <Chip
                                        label={student?.gender}
                                        color={student?.gender === "Male" ? "primary" : "secondary"}
                                        size="small"
                                    />
                                    <Chip
                                        label={`Class ${student?.classId}-${student?.sectionId}`}
                                        variant="outlined"
                                        size="small"
                                    />
                                </Box>
                            </Box>
                        </Box>

                        <Divider sx={{ mb: 3 }} />

                        <Grid container spacing={2}>

                            {[
                                { label: "Email", value: student?.email || "demo@gmail.com" },
                                { label: "Phone", value: student?.phone || "1234567890" },
                                { label: "Age", value: student?.age || "20" },
                                {
                                    label: "Address",
                                    value: `${address?.street}, ${address?.city}, ${address?.state} - ${address?.pincode}` || "demo address"
                                },
                                { label: "Class", value: classes?.className || "demo class" },
                                { label: "Section", value: section?.sectionName || "demo section" },
                                { label: "Roll No", value: student?.rollNo || "demo roll no" },
                                { label: "Admission No", value: student?.admissionNo || "demo admission no" },
                                { label: "Admission Date", value: student?.admissionDate || "demo admission date" }
                            ].map((item, index) => (
                                <Grid item xs={12} sm={6} key={index}>
                                    <Box
                                        sx={{
                                            p: 2,
                                            borderRadius: 2,
                                            backgroundColor: "#f9fafb",
                                            transition: "0.3s",
                                            "&:hover": {
                                                backgroundColor: "#eef2ff",
                                                transform: "translateY(-2px)"
                                            }
                                        }}
                                    >
                                        <Typography
                                            variant="caption"
                                            sx={{ color: "text.secondary", fontWeight: 500 }}
                                        >
                                            {item.label}
                                        </Typography>

                                        <Typography variant="body1" fontWeight="medium">
                                            {item.value || "N/A"}
                                        </Typography>
                                    </Box>
                                </Grid>
                            ))}

                        </Grid>

                    </CardContent>
                </Card>
            </Box>
        </div>
    );

}

export default ViewStudentDeatils