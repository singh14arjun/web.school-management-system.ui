import React, { useEffect } from 'react'
import axios from 'axios'
import { Card } from '@mui/material';
const AllTeachers = () => {
    const [teachers, setTeachers] = React.useState([]);
    const [schools, setSchools] = React.useState([]);
    React.useEffect(() => {
        axios.get('http://localhost:3000/teachers')
            .then(response => {
                setTeachers(response.data);
            })
            .catch(error => {
                console.error('Error fetching teachers:', error);
            });
    }, []);
    useEffect(() => {
        axios.get('http://localhost:3000/schools')
            .then(response => {
                setSchools(response.data);
            })
            .catch(error => {
                console.error('Error fetching schools:', error);
            });
    }, []);
    const getSubjectIcon = (subject) => {
        switch (subject) {
            case 'Mathematics':
                return '📚';
            case 'English':
                return '📖';
            case 'Science':
                return '🔬';
            case 'Physics':
                return '⚛️';
            case 'Chemistry':
                return '🧪';
            case 'Biology':
                return '🧬';
            case 'History':
                return '📜';
            case 'Geography':
                return '🌍';
            case 'Computer Science':
                return '💻';
            case 'Hindi':
                return '📖';
            case 'Commerce':
                return '📊';
            case 'Economics':
                return '📈';
            case 'Physical Education':
                return '⚽';
            default:
                return '📚';
        }
    };
    const getSubjectColor = (subject) => {
        switch (subject) {
            case 'Mathematics':
                return 'border-green-300';
            case 'English':
                return 'border-blue-300';
            case 'Science':
                return 'border-red-300';
            case 'Physics':
                return 'border-yellow-300';
            case 'Chemistry':
                return 'border-purple-300';
            case 'Biology':
                return 'border-pink-300';
            case 'History':
                return 'border-orange-300';
            case 'Geography':
                return 'border-teal-300';
            case 'Computer Science':
                return 'border-indigo-300';
            case 'Hindi':
                return 'border-cyan-300';
            case 'Commerce':
                return 'border-lime-300';
            case 'Economics':
                return 'border-fuchsia-300';
            case 'Physical Education':
                return 'border-rose-300';
            default:
                return 'border-gray-300';
        }
    };
    return (
        <div className='p-4'>
            <h1 className='text-2xl font-bold mb-4'>Teachers</h1>
            <Card className='grid grid-cols-4 gap-4 p-4'>
                {teachers.map(teacher => (
                    <div key={teacher.id} className={`p-4 rounded-lg shadow-md border-2 border-l-8 rounded-l-xl ${getSubjectColor(teacher.subject)}`}>
                        <p className='text-lg font-bold'>{getSubjectIcon(teacher.subject)} {teacher.name}</p>
                        <p className='text-sm text-gray-600'>{teacher.email}</p>
                        <p className='text-sm text-gray-600'>{teacher.subject}</p>
                        <p className='text-sm text-gray-600'>{teacher.experience}</p>
                        <p className='text-sm text-gray-600'>{schools.find(school => school.id === teacher.schoolId)?.schoolName}</p>
                    </div>
                ))}
            </Card>
        </div>
    )
}

export default AllTeachers