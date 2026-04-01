import React, { useState } from 'react';
import { staff } from '../data/staff';

// MUI Components
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button
} from '@mui/material';
import { FaEnvelope, FaPhone, FaRupeeSign } from 'react-icons/fa';

const Teachers = () => {

  // ✅ Filter only teachers
  const [teachers] = useState(
    staff.filter(user => user?.role === "Teacher")
  );

  const getSubjectIcon = (subject) => {
    const icons = {
      'Mathematics': '📐', 'English': '📖', 'Science': '🔬', 'Physics': '⚛️',
      'Chemistry': '🧪', 'Biology': '🧬', 'History': '📜', 'Geography': '🌍',
      'Computer Science': '💻', 'Hindi': '📖', 'Commerce': '📊',
      'Economics': '📈', 'Physical Education': '⚽'
    };
    return icons[subject] || '📚';
  };

  const attPercent = ((teachers?.attendance?.present / teachers?.attendance?.totalDays) * 100).toFixed(0);


  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Teachers</h1>
        <p className="text-sm text-slate-500">
          {teachers.length} teachers found
        </p>
      </div>

      {/* ✅ MUI Table */}
      <TableContainer component={Paper} elevation={3}>
        <Table>

          {/* Table Head */}
          <TableHead>
            <TableRow>
              <TableCell><strong>Employee ID</strong></TableCell>
              <TableCell><strong>ID</strong></TableCell>
              <TableCell><strong>Role</strong></TableCell>
              <TableCell><strong>Department</strong></TableCell>
              <TableCell><strong>Contact</strong></TableCell>
              <TableCell><strong>Attendance</strong></TableCell>
              <TableCell><strong>Salary</strong></TableCell>
              <TableCell><strong>Action</strong></TableCell>
            </TableRow>
          </TableHead>

          {/* Table Body */}
          <TableBody>
            {teachers.map((teacher) => (
              <TableRow key={teacher.id} hover>

                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-400 to-violet-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                      {teacher.personalInfo.fullName.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{teacher.personalInfo.fullName}</p>
                      <p className="text-xs text-slate-400">{teacher.professionalInfo.designation}</p>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  {teacher?.personalInfo?.email}
                </TableCell>

                <TableCell>
                  {getSubjectIcon(teacher?.professionalInfo?.department)}{" "}
                  {teacher?.professionalInfo?.department}
                </TableCell>

                <TableCell>
                  {teacher?.professionalInfo?.experience}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <FaPhone />
                    {teacher?.personalInfo?.phone}
                  </div>
                  <div className="flex items-center gap-2">
                    <FaEnvelope />
                    {teacher?.personalInfo?.email}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-12 bg-slate-100 rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full transition-all duration-500 ${attPercent >= 90 ? "bg-emerald-500" : attPercent >= 75 ? "bg-amber-500" : "bg-red-500"}`}
                        style={{ width: `${attPercent}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-semibold text-slate-600">{attPercent}%</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{teacher?.attendance?.present}P / {teacher?.attendance?.absent}A / {teacher?.attendance?.late}L</p>

                  {teacher?.attendance?.present}/{teacher?.attendance?.totalDays}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <FaRupeeSign /> {teacher?.salary?.total}
                  </div>
                </TableCell>
                <TableCell>
                  <Button variant="contained" color="primary">
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

        </Table>
      </TableContainer>

      {/* Empty State */}
      {teachers.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-400">No teachers found</p>
        </div>
      )}
    </div>
  );
};

export default Teachers;