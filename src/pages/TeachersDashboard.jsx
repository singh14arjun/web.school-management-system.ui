import React from 'react'
import { Card, CardContent, Typography, Avatar, Chip, Button } from "@mui/material";
import { PiStudent } from 'react-icons/pi'
import { GiTeacher } from 'react-icons/gi'
import { FaCalendarCheck } from 'react-icons/fa'
import { PiExamBold } from 'react-icons/pi'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
const TeachersDashboard = () => {
    const [teachers, setTeachers] = React.useState([]);
    const navigate = useNavigate();
    const schoolId = 101;
    React.useEffect(() => {
        axios.get(`http://localhost:3000/teachers?schoolId=${schoolId}`)
            .then(response => {
                console.log(response.data);
                setTeachers(response.data);
            })
            .catch(error => {
                console.error('Error fetching teachers:', error);
            });
    }, [schoolId]);
    return (
        <div>
            <h1>Teachers Dashboard</h1>

            <Card className="p-4 space-y-4">
                {teachers.map((teacher) => (
                    <Card
                        key={teacher.id}
                        className="flex items-center justify-between p-4 rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
                    >
                        <div className="flex items-center gap-4">
                            <Avatar
                                src={teacher.profileImage}
                                alt={teacher.name}
                                className="w-14 h-14"
                            />

                            <div>
                                <Typography variant="h6" className="font-semibold">
                                    {teacher.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {teacher.subject} • {teacher.experience} yrs exp
                                </Typography>
                            </div>
                        </div>

                        <div className="hidden md:flex flex-col text-sm">
                            <span className="text-gray-500">Class Teacher</span>
                            <span className="font-medium">
                                Class {teacher.classTeacherOf.classId} -{" "}
                                {teacher.classTeacherOf.sectionId}
                            </span>
                        </div>

                        <div className="flex items-center gap-3">
                            <Chip
                                label={`School ${teacher.schoolId}`}
                                color="primary"
                                size="small"
                            />

                            <Chip
                                label={teacher.status}
                                color={teacher.status === "Active" ? "success" : "default"}
                                size="small"
                            />
                        </div>
                        <div>
                            <Button type='button' size='small' variant="contained" color="primary" onClick={() => navigate(`/school-admin/teacher/${teacher.id}`)}>
                                View
                            </Button>
                        </div>
                    </Card>
                ))}
            </Card>
        </div>
    )
}

export default TeachersDashboard