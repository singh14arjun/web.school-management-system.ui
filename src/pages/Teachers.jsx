import React, { useState } from "react";
import { staff } from "../data/staff";
import { MdCall, MdCancel, MdDelete, MdFilterList, MdPersonAdd } from "react-icons/md";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  MenuItem,
  InputAdornment,
} from "@mui/material";
import {
  FaEnvelope,
  FaEye,
  FaFemale,
  FaMale,
  FaRupeeSign,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { BiEdit } from "react-icons/bi";
import DataNotFound from "./DataNotFound";

const Teachers = () => {
  const [teachers] = useState(staff.filter((user) => user?.role === "Teacher"));

  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");

  const filteredTeachers = teachers.filter((teacher) => {
    const name = teacher?.personalInfo?.fullName?.toLowerCase();
    const dept = teacher?.professionalInfo?.department;

    return (
      name.includes(search.toLowerCase()) &&
      (department === "All" || dept === department)
    );
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center gap-5">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Teachers</h1>
          <p className="text-sm text-slate-500">
            {filteredTeachers.length} teachers found
          </p>
        </div>
        <Link
          to="/staff/add"
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 animate-slide-up delay-1"
        >
          <MdPersonAdd className="text-xl" />
          Add Staff
        </Link>
      </div>
      <div className="flex flex-col justify-between gap-5 bg-white rounded-lg shadow-md">


        <div className="flex flex-col md:flex-row justify-between gap-4 p-4">



          <div className="flex-1 animate-slide-up delay-1">
            <TextField
              fullWidth
              size="small"
              placeholder="Search by name or employee ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IoSearch className="text-slate-400" />
                  </InputAdornment>
                ),
              }}
            />
          </div>

          <div className="flex gap-4 items-center animate-slide-up delay-2">
            <TextField
              select
              size="small"
              label="Filter by Subject"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              sx={{ minWidth: 180 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" >
                    <MdFilterList className="text-slate-400" />
                  </InputAdornment>
                ),
              }}
            >
              <MenuItem value="All">All</MenuItem>
              {[...new Set(teachers.map((t) => t?.professionalInfo?.department))].map((dept) => (
                <MenuItem key={dept} value={dept}>
                  {dept}
                </MenuItem>
              ))}
            </TextField>

            {(search || department !== "All") && (
              <Button
                variant="outlined"
                color="error"
                onClick={() => {
                  setSearch("");
                  setDepartment("All");
                }}
              >
                Clear
                <MdCancel className="pl-1" size={20} />
              </Button>
            )}
          </div>
        </div>

        <TableContainer component={Paper} className='animate-slide-up delay-2'>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Employee</strong>
                </TableCell>
                <TableCell>
                  <strong>Experience</strong>
                </TableCell>
                <TableCell>
                  <strong>Subject</strong>
                </TableCell>
                <TableCell>
                  <strong>Contact</strong>
                </TableCell>
                <TableCell>
                  <strong>Gender</strong>
                </TableCell>
                <TableCell>
                  <strong>Attendance</strong>
                </TableCell>
                <TableCell>
                  <strong>Salary</strong>
                </TableCell>
                <TableCell>
                  <strong>Action</strong>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredTeachers.map((teacher) => {
                const att = teacher?.attendance || {};

                const attPercent = att.totalDays
                  ? ((att.present / att.totalDays) * 100).toFixed(0)
                  : 0;

                return (
                  <TableRow key={teacher.id} hover>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-400 to-violet-600 flex items-center justify-center text-white font-bold text-sm">
                          {teacher.personalInfo.fullName
                            .split(" ")
                            .map((n) => n[0])
                            .slice(0, 2)
                            .join("")}
                        </div>
                        <div>
                          <p className="text-sm font-semibold">
                            {teacher.personalInfo.fullName}
                          </p>
                          <p className="text-xs text-gray-400">
                            {teacher.professionalInfo.designation}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>{teacher?.professionalInfo?.experience}</TableCell>

                    <TableCell>{teacher?.professionalInfo?.department}</TableCell>

                    <TableCell>
                      <div className="flex items-center gap-2">
                        <MdCall size={14} />
                        {teacher?.personalInfo?.phone}
                      </div>
                      <div className="flex items-center gap-2">
                        <FaEnvelope size={12} />
                        {teacher?.personalInfo?.email}
                      </div>
                    </TableCell>

                    <TableCell>
                      {teacher?.personalInfo?.gender === "Male" ? (
                        <FaMale className="text-blue-500" />
                      ) : (
                        <FaFemale className="text-pink-500" />
                      )}
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${attPercent >= 90
                              ? "bg-green-500"
                              : attPercent >= 75
                                ? "bg-yellow-500"
                                : "bg-red-500"
                              }`}
                            style={{ width: `${attPercent}%` }}
                          />
                        </div>
                        <span className="text-xs font-semibold">
                          {attPercent}%
                        </span>
                      </div>

                      <p className="text-xs text-gray-400">
                        {att.present}P / {att.absent}A / {att.late}L
                      </p>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-1">
                        <FaRupeeSign /> {teacher?.salary?.total}
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/staff/${teacher.id}`}
                          className="flex items-center gap-1 text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-2 rounded hover:text-blue-800 hover:bg-blue-200 transition-all duration-200 cursor-pointer"
                        >
                          <FaEye />
                        </Link>
                        <Link
                          to={`/staff/edit/${teacher.id}`}
                          className="flex items-center gap-1 text-xs font-semibold text-yellow-600 bg-yellow-100 px-2 py-2 rounded hover:text-yellow-800 hover:bg-yellow-200 transition-all duration-200 cursor-pointer"
                        >
                          <BiEdit />
                        </Link>
                        <Link
                          to={`/staff/delete/${teacher.id}`}
                          className="flex items-center gap-1 text-xs font-semibold text-red-600 bg-red-100 px-2 py-2 rounded hover:text-red-800 hover:bg-red-200 transition-all duration-200 cursor-pointer"
                        >
                          <MdDelete />
                        </Link>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        {filteredTeachers.length === 0 && (
          <DataNotFound />
        )}
      </div>

    </div>
  );
};

export default Teachers;
