import { TextField } from "@mui/material";
import React, { useState, useMemo } from "react";
import { BiCheck, BiFilter } from "react-icons/bi";
import { MdCancel } from "react-icons/md";
import { PiStudentFill } from "react-icons/pi";
import { SlCalender } from "react-icons/sl";
import { toast } from "react-toastify";

const StudentsAttendanceSheet = () => {
  const today = new Date().toISOString().split("T")[0];
  const [search, setSearch] = useState("");

  const [selectedDate, setSelectedDate] = useState(today);

  const [students, setStudents] = useState([
    { id: "STU-001", name: "Aarav Sharma", attendance: "" },
    { id: "STU-002", name: "Riya Verma", attendance: "" },
    { id: "STU-003", name: "Kabir Singh", attendance: "" },
    { id: "STU-004", name: "Ananya Gupta", attendance: "" },
    { id: "STU-005", name: "Vihaan Mehta", attendance: "" },
    { id: "STU-006", name: "Krish Gupta", attendance: "" },
    { id: "STU-007", name: "Demo Singh", attendance: "" },
    { id: "STU-008", name: "Rupesh Singh", attendance: "" },
    { id: "STU-009", name: "Rupali Thakur", attendance: "" },
    { id: "STU-010", name: "Vihaan Mehta", attendance: "" },
  ]);

  const isFutureDate = selectedDate > today;
  const isPastDate = selectedDate < today;
  const isToday = selectedDate === today;

  const markAttendance = (id, status) => {
    if (!isToday) return;

    setStudents((prev) =>
      prev.map((student) =>
        student.id === id ? { ...student, attendance: status } : student,
      ),
    );
  };

  const markAllPresent = () => {
    if (!isToday) return;

    setStudents((prev) =>
      prev.map((student) => ({
        ...student,
        attendance: "Present",
      })),
    );
  };

  const stats = useMemo(() => {
    const total = students.length;
    const present = students.filter((s) => s.attendance === "Present").length;
    const absent = students.filter((s) => s.attendance === "Absent").length;

    return { total, present, absent };
  }, [students]);

  const saveAttendance = () => {
    toast.success("Attendance Save Successfully");
  };
  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const query = search.toLowerCase();

      return (
        student.name.toLowerCase().includes(query) ||
        student.id.toLowerCase().includes(query)
      );
    });
  }, [search, students]);

  return (
    <div>
      <header className="flex justify-between items-center mb-6">
        <div>
          <p className="text-blue-600 font-semibold text-sm">
            DAILY OPERATIONS
          </p>
          <p className="text-2xl font-bold">Mark Daily Attendance</p>
        </div>

        <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-lg shadow">
          <SlCalender />
          <input
            type="date"
            value={selectedDate}
            max={today}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="outline-none"
          />
        </div>
      </header>

      {isFutureDate && (
        <p className="text-red-500 mb-4">
          ❌ You cannot mark attendance for future dates
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-10">
        <div className="bg-gray-100 p-5 rounded-2xl flex flex-col gap-4">
          <div className="flex gap-5">
            <p className="text-sm text-gray-500">Class 9th</p>
            <p className="text-sm text-gray-500">Section B</p>
          </div>
        </div>

        <div className="flex  justify-between items-center bg-white p-5 rounded-2xl shadow border-l-4 border-blue-600">
          <div>
            <p className="text-gray-500">TOTAL ATTENDENCE</p>
            <p className="text-3xl font-bold">32</p>
          </div>
          <PiStudentFill className="bg-blue-200 text-4xl rounded p-1 text-blue-600" />
        </div>

        {/* 🔹 Present */}
        <div className="flex justify-between  items-center bg-white p-5 rounded-2xl shadow border-l-4 border-green-500">
          <div>
            <p className="text-gray-500">TOTAL PRESENT</p>
            <p className="text-3xl font-bold text-blue-600">28</p>
          </div>
          <BiCheck className="bg-green-200 text-4xl p-1 rounded text-green-600" />
        </div>

        {/* 🔹 Absent */}
        <div className="flex justify-between items-center bg-white p-5 rounded-2xl shadow border-l-4 border-red-500">
          <div>
            <p className="text-gray-500">TOTAL ABSENT</p>
            <p className="text-3xl font-bold text-red-600">04</p>
          </div>
          <MdCancel className="bg-red-200 text-4xl p-1 rounded text-red-600" />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-4">
        <div className="flex justify-between mb-4">
          <div className="w-100">
            <p className="text-xl font-bold">Student Class Attendance</p>
            <TextField
              fullWidth
              placeholder="Search by name or ID"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <div>
              <p className="text-lg font-semibold text-black/79">Classe 10th</p>
              <p className=" font-semibold text-black/50">Section D</p>
            </div>

            {isToday && (
              <button
                onClick={markAllPresent}
                className="text-white font-medium flex items-center bg-blue-600 p-2 rounded gap-2 h-fit hover:bg-blue-700 cursor-pointer"
              >
                <BiFilter /> Mark All Present
              </button>
            )}
          </div>
        </div>

        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-500 border-b">
              <th className="py-2">Student ID</th>
              <th>Name</th>
              <th>Attendance</th>
            </tr>
          </thead>

          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.id} className="border-b">
                <td className="py-3">{student.id}</td>
                <td>{student.name}</td>

                <td>
                  {isToday ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => markAttendance(student.id, "Present")}
                        className={`px-3 py-1 rounded ${
                          student.attendance === "Present"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200"
                        }`}
                      >
                        Present
                      </button>

                      <button
                        onClick={() => markAttendance(student.id, "Absent")}
                        className={`px-3 py-1 rounded ${
                          student.attendance === "Absent"
                            ? "bg-red-600 text-white"
                            : "bg-gray-200"
                        }`}
                      >
                        Absent
                      </button>
                    </div>
                  ) : (
                    <span className="text-gray-500">
                      {student.attendance || "Not Marked"}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {isPastDate && (
          <p className="text-gray-500 mt-4">
            Viewing past attendance (read-only)
          </p>
        )}

        <div className="flex justify-end mt-5">
          <button
            disabled={!isToday}
            className={`px-4 py-2 rounded text-white ${
              isToday
                ? "bg-green-600 hover:bg-green-700 cursor-pointer"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            onClick={saveAttendance}
          >
            Save Attendance
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentsAttendanceSheet;
