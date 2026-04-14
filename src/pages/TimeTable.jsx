import React, { useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button,
  InputLabel, Select, MenuItem, FormControl,
} from "@mui/material";

import { timetableData, periods } from "../data/timetableData";
import { staff } from "../data/staff";

// 🎨 Subject Colors
const getColor = (subject) => {
  const map = {
    Math: "bg-blue-100 text-blue-700",
    English: "bg-purple-100 text-purple-700",
    Physics: "bg-yellow-100 text-yellow-700",
    Chemistry: "bg-pink-100 text-pink-700",
    Biology: "bg-green-100 text-green-700",
    Computer: "bg-indigo-100 text-indigo-700",
    Hindi: "bg-orange-100 text-orange-700",
    Geography: "bg-teal-100 text-teal-700",
    Sports: "bg-red-100 text-red-700",
    Break: "bg-gray-200 text-gray-600",
    Drawing: "bg-emerald-100 text-emerald-700",
    Science: "bg-cyan-500 text-cyan-100",
    PE: "bg-rose-100 text-rose-700",
    Holiday: "bg-gray-300 text-gray-800",
    SST: "bg-teal-100 text-teal-700",
    GK: "bg-red-100 text-red-700",
  };
  return map[subject] || "bg-gray-100";
};

const TimeTable = () => {
  const [selectedClass, setSelectedClass] = useState("1");
  const [section, setSection] = useState("A");
  const [year, setYear] = useState("2024-2025");
  const [selectedTeachers, setSelectedTeachers] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);

  const timetable = timetableData[selectedClass];

  // ✅ Handle dropdown change
  const handleTeacherChange = (key, teacherId) => {
    setSelectedTeachers((prev) => ({
      ...prev,
      [key]: teacherId,
    }));
  };

  return (
    <div className="p-6 space-y-6">

      {/* 🔽 Filters */}
      <div className="flex justify-between gap-4">
        <div className="flex gap-4">

          <FormControl size="small" sx={{ width: 100 }}>
            <InputLabel>Class</InputLabel>
            <Select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
              {[...Array(12)].map((_, i) => (
                <MenuItem key={i} value={(i + 1).toString()}>
                  {i + 1}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ width: 100 }}>
            <InputLabel>Section</InputLabel>
            <Select value={section} onChange={(e) => setSection(e.target.value)}>
              {["A", "B", "C", "D"].map((sec) => (
                <MenuItem key={sec} value={sec}>
                  {sec}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small">
            <InputLabel>Year</InputLabel>
            <Select value={year} onChange={(e) => setYear(e.target.value)}>
              {["2022-2023", "2023-2024", "2024-2025"].map((yr) => (
                <MenuItem key={yr} value={yr}>
                  {yr}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div>
          {isEditMode ? (
            <div className="flex gap-2">
              <Button variant="outlined" color="error" onClick={() => setIsEditMode(false)}>Cancel</Button>
              <Button variant="contained" color="success" onClick={() => setIsEditMode(false)}>Save</Button>
            </div>
          ) : (
            <Button variant="contained" color="primary" onClick={() => setIsEditMode(!isEditMode)}>{isEditMode ? "Save" : "Edit"}</Button>
          )}

        </div>
      </div>

      {/* 📊 Table */}
      <TableContainer component={Paper}>
        <Table>

          <TableHead>
            <TableRow>
              <TableCell><strong>Period</strong></TableCell>

              {timetable.map((day, i) => (
                <TableCell key={i} align="center">
                  <strong>{day.day}</strong>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          {/* Body */}
          <TableBody>
            {periods.map((time, rowIndex) => (
              <TableRow key={rowIndex}>

                {/* Period Column */}
                <TableCell>
                  <strong>P{rowIndex + 1}</strong>
                  <div className="text-xs text-gray-500">{time}</div>
                </TableCell>

                {/* Days */}
                {timetable.map((day, colIndex) => {
                  const subject = day.subjects[rowIndex];

                  // ✅ Get teachers for subject
                  const subjectTeachers = staff.filter(
                    (s) => s.professionalInfo.department === subject
                  );

                  // ✅ Unique key per cell
                  const cellKey = `${selectedClass}-${section}-${day.day}-${rowIndex}`;

                  return (
                    <TableCell key={colIndex}>
                      <div className={`flex flex-col items-center py-1 text-xs rounded-md ${isEditMode ? "" : getColor(subject)}`}>

                        <span>{subject}</span>

                        {!isEditMode && subject !== "Break" && (
                          <span className="text-[10px] text-gray-700 mt-1">
                            {
                              staff.find((t) => t.id === selectedTeachers[cellKey])
                                ?.personalInfo?.fullName ||
                              subjectTeachers[0]?.personalInfo?.fullName ||
                              "N/A"
                            }
                          </span>
                        )}


                        {isEditMode && subject !== "Break" && (
                          <div className={`${getColor(subject)}`}>
                            <FormControl size="small" sx={{ minWidth: 100, }}>
                              <Select
                                sx={{ fontSize: "10px" }}
                                value={selectedTeachers[cellKey] || subjectTeachers[0]?.id || ""}
                                onChange={(e) =>
                                  handleTeacherChange(cellKey, e.target.value)
                                }
                              >
                                {subjectTeachers.map((t) => (
                                  <MenuItem key={t.id} value={t.id}>
                                    {t?.personalInfo?.fullName || "N/A"}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </div>
                        )}

                      </div>
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>

        </Table>
      </TableContainer>
    </div>
  );
};

export default TimeTable;