import { Card, CardContent, Typography, Avatar, Button, Chip, Divider } from "@mui/material";
import React from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
const TeacherProfile = () => {
    const { id } = useParams();
    const [teacher, setTeacher] = React.useState([]);
    const [address, setAddress] = React.useState([]);
    React.useEffect(() => {
        axios.get(`http://localhost:3000/teachers/${id}`)
            .then(response => {
                console.log(response.data);
                setTeacher(response.data);
            })
            .catch(error => {
                console.error('Error fetching teacher:', error);
            });
    }, [id]);
    React.useEffect(() => {
        axios.get(`http://localhost:3000/addresses/${teacher.addressId}`)
            .then(response => {
                console.log(response.data);
                setAddress(response.data);
            })
            .catch(error => {
                console.error('Error fetching address:', error);
            });
    }, [teacher.addressId]);
    return (

        <div className="max-w-4xl mx-auto p-4">

            <div className="flex justify-between items-center mb-4">
                <Typography variant="h5" className="font-bold">
                    Teacher Profile
                </Typography>
                <Button variant="contained" color="primary">
                    Edit
                </Button>
            </div>

            <Card className="rounded-2xl shadow-lg">
                <CardContent>

                    <div className="flex items-center gap-6 mb-6">
                        <Avatar
                            src={teacher.profileImage}
                            alt={teacher.name}
                            className="w-24 h-24"
                        />

                        <div>
                            <Typography variant="h6" className="font-semibold">
                                {teacher.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {teacher.subject}
                            </Typography>

                            <div className="mt-2 flex gap-2">
                                <Chip label={teacher.gender} size="small" />
                                <Chip
                                    label={teacher.status}
                                    color={teacher.status === "Active" ? "success" : "default"}
                                    size="small"
                                />
                            </div>
                        </div>
                    </div>

                    <Divider className="mb-6" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <div>
                            <Typography className="text-gray-500 text-sm">Email</Typography>
                            <Typography>{teacher.email}</Typography>
                        </div>

                        <div>
                            <Typography className="text-gray-500 text-sm">Phone</Typography>
                            <Typography>{teacher.phone}</Typography>
                        </div>

                        <div>
                            <Typography className="text-gray-500 text-sm">Subject</Typography>
                            <Typography>{teacher.subject}</Typography>
                        </div>

                        <div>
                            <Typography className="text-gray-500 text-sm">Experience</Typography>
                            <Typography>{teacher.experience} Years</Typography>
                        </div>

                        <div>
                            <Typography className="text-gray-500 text-sm">Class</Typography>
                            <Typography>
                                Class {teacher.classTeacherOf?.classId}
                            </Typography>
                        </div>

                        <div>
                            <Typography className="text-gray-500 text-sm">Section</Typography>
                            <Typography>
                                {teacher.classTeacherOf?.sectionId}
                            </Typography>
                        </div>

                        <div>
                            <Typography className="text-gray-500 text-sm">Joining Date</Typography>
                            <Typography>{teacher.joiningDate}</Typography>
                        </div>

                        <div>
                            <Typography className="text-gray-500 text-sm">Salary</Typography>
                            <Typography>₹ {teacher.salary}</Typography>
                        </div>

                        <div className="md:col-span-2">
                            <Typography className="text-gray-500 text-sm">Address</Typography>
                            <Typography>
                                {address?.street}
                            </Typography>
                            <Typography>
                                {address?.area}
                            </Typography>
                            <Typography>
                                {address?.city}
                            </Typography>
                            <Typography>
                                {address?.state}
                            </Typography>
                            <Typography>
                                {address?.pincode}
                            </Typography>
                        </div>

                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default TeacherProfile