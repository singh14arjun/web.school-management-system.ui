import { useState } from "react";
import { MdCheckCircle, MdCancel, MdAccessTime, MdEventBusy } from "react-icons/md";
import { IoCheckmarkCircle } from "react-icons/io5";
import { students } from "../../data/students";
import { toast } from "react-toastify";

const Attendance = () => {
  const [activeView, setActiveView] = useState("mark"); // mark | report
  const [selectedClass, setSelectedClass] = useState("Class 7");
  const [selectedSection, setSelectedSection] = useState("A");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);

  const allClasses = [...new Set(students.map((s) => s.academicInfo.currentClass))].sort();
  const allSections = [...new Set(students.map((s) => s.academicInfo.section))].sort();

  const classStudents = students.filter(
    (s) => s.academicInfo.currentClass === selectedClass && s.academicInfo.section === selectedSection && s.status === "Active"
  );

  const [attendance, setAttendance] = useState(() => {
    const initial = {};
    students.forEach((s) => { initial[s.id] = "present"; });
    return initial;
  });

  const handleMark = (studentId, status) => {
    setAttendance((p) => ({ ...p, [studentId]: status }));
  };

  const markAll = (status) => {
    const updated = { ...attendance };
    classStudents.forEach((s) => { updated[s.id] = status; });
    setAttendance(updated);
  };

  const handleSubmit = () => {
    const present = classStudents.filter((s) => attendance[s.id] === "present").length;
    const absent = classStudents.filter((s) => attendance[s.id] === "absent").length;
    const late = classStudents.filter((s) => attendance[s.id] === "late").length;
    const leave = classStudents.filter((s) => attendance[s.id] === "leave").length;
    toast.success(`Attendance saved! P:${present} A:${absent} L:${late} Leave:${leave}`);
  };

  const statusBtn = (studentId, status, icon, color, label) => (
    <button
      onClick={() => handleMark(studentId, status)}
      className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
        attendance[studentId] === status
          ? `${color} shadow-sm scale-105`
          : "bg-slate-50 text-slate-400 hover:bg-slate-100"
      }`}
    >
      {icon} {label}
    </button>
  );

  // Report data
  const reportData = students.filter((s) => s.status === "Active").map((s) => ({
    ...s,
    totalDays: 220,
    presentDays: Math.round(220 * s.attendancePercent / 100),
    absentDays: 220 - Math.round(220 * s.attendancePercent / 100),
  }));

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Attendance</h1>
          <p className="text-sm text-slate-500">Mark and manage student attendance</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveView("mark")}
            className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all cursor-pointer ${
              activeView === "mark" ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25" : "bg-white text-slate-600 border border-slate-200 hover:border-blue-300"
            }`}
          >
            Mark Attendance
          </button>
          <button
            onClick={() => setActiveView("report")}
            className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all cursor-pointer ${
              activeView === "report" ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25" : "bg-white text-slate-600 border border-slate-200 hover:border-blue-300"
            }`}
          >
            Attendance Report
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm card-hover animate-slide-up delay-1">
          <div className="flex items-center gap-2 mb-1">
            <MdCheckCircle className="text-emerald-500" />
            <span className="text-sm text-slate-500">Present</span>
          </div>
          <p className="text-2xl font-bold text-emerald-600">
            {activeView === "mark" ? classStudents.filter((s) => attendance[s.id] === "present").length : reportData.filter((s) => s.attendancePercent >= 90).length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm card-hover animate-slide-up delay-2">
          <div className="flex items-center gap-2 mb-1">
            <MdCancel className="text-red-500" />
            <span className="text-sm text-slate-500">Absent</span>
          </div>
          <p className="text-2xl font-bold text-red-600">
            {activeView === "mark" ? classStudents.filter((s) => attendance[s.id] === "absent").length : reportData.filter((s) => s.attendancePercent < 75).length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm card-hover animate-slide-up delay-3">
          <div className="flex items-center gap-2 mb-1">
            <MdAccessTime className="text-amber-500" />
            <span className="text-sm text-slate-500">Late</span>
          </div>
          <p className="text-2xl font-bold text-amber-600">
            {activeView === "mark" ? classStudents.filter((s) => attendance[s.id] === "late").length : 0}
          </p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm card-hover animate-slide-up delay-4">
          <div className="flex items-center gap-2 mb-1">
            <MdEventBusy className="text-violet-500" />
            <span className="text-sm text-slate-500">On Leave</span>
          </div>
          <p className="text-2xl font-bold text-violet-600">
            {activeView === "mark" ? classStudents.filter((s) => attendance[s.id] === "leave").length : 0}
          </p>
        </div>
      </div>

      {activeView === "mark" ? (
        /* Mark Attendance */
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm animate-slide-up delay-3">
          {/* Filters */}
          <div className="flex items-center gap-3 p-4 border-b border-slate-100">
            <div>
              <label className="text-xs text-slate-500 block mb-1">Date</label>
              <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}
                className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400" />
            </div>
            <div>
              <label className="text-xs text-slate-500 block mb-1">Class</label>
              <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}
                className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 bg-white cursor-pointer">
                {allClasses.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-500 block mb-1">Section</label>
              <select value={selectedSection} onChange={(e) => setSelectedSection(e.target.value)}
                className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 bg-white cursor-pointer">
                {allSections.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="ml-auto flex gap-2">
              <button onClick={() => markAll("present")} className="px-3 py-2 text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-lg hover:bg-emerald-100 transition-all cursor-pointer">
                Mark All Present
              </button>
              <button onClick={() => markAll("absent")} className="px-3 py-2 text-xs font-semibold text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-all cursor-pointer">
                Mark All Absent
              </button>
            </div>
          </div>

          {/* Student List */}
          <div className="divide-y divide-slate-50">
            {classStudents.length === 0 ? (
              <p className="text-center text-slate-400 py-8">No students found for {selectedClass} - {selectedSection}</p>
            ) : (
              classStudents.map((student, i) => (
                <div key={student.id} className="flex items-center justify-between px-5 py-3 hover:bg-blue-50/20 transition-colors"
                  style={{ animation: `fadeIn 0.3s ease-out ${i * 0.05}s both` }}>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-400 w-6">{i + 1}</span>
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
                      {student.personalInfo.fullName.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{student.personalInfo.fullName}</p>
                      <p className="text-xs text-slate-400">Roll #{student.academicInfo.rollNumber}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {statusBtn(student.id, "present", <MdCheckCircle />, "bg-emerald-100 text-emerald-700", "Present")}
                    {statusBtn(student.id, "absent", <MdCancel />, "bg-red-100 text-red-700", "Absent")}
                    {statusBtn(student.id, "late", <MdAccessTime />, "bg-amber-100 text-amber-700", "Late")}
                    {statusBtn(student.id, "leave", <MdEventBusy />, "bg-violet-100 text-violet-700", "Leave")}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Submit */}
          {classStudents.length > 0 && (
            <div className="p-4 border-t border-slate-100 flex justify-end">
              <button onClick={handleSubmit}
                className="flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all cursor-pointer">
                <IoCheckmarkCircle className="text-lg" /> Save Attendance
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Attendance Report */
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm animate-slide-up delay-3">
          <div className="p-4 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-700">Attendance Report — All Students</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider bg-slate-50/80">
                  <th className="px-5 py-3">Student</th>
                  <th className="px-5 py-3">Class</th>
                  <th className="px-5 py-3">Total Days</th>
                  <th className="px-5 py-3">Present</th>
                  <th className="px-5 py-3">Absent</th>
                  <th className="px-5 py-3">Percentage</th>
                  <th className="px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {reportData.map((student) => (
                  <tr key={student.id} className="hover:bg-blue-50/30 transition-colors">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-xs">
                          {student.personalInfo.fullName.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <span className="text-sm font-semibold text-slate-800">{student.personalInfo.fullName}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-sm text-slate-600">{student.academicInfo.currentClass}-{student.academicInfo.section}</td>
                    <td className="px-5 py-3 text-sm text-slate-600">{student.totalDays}</td>
                    <td className="px-5 py-3 text-sm font-semibold text-emerald-600">{student.presentDays}</td>
                    <td className="px-5 py-3 text-sm font-semibold text-red-600">{student.absentDays}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-slate-100 rounded-full h-1.5">
                          <div
                            className={`h-1.5 rounded-full ${student.attendancePercent >= 90 ? "bg-emerald-500" : student.attendancePercent >= 75 ? "bg-amber-500" : "bg-red-500"}`}
                            style={{ width: `${student.attendancePercent}%` }}
                          />
                        </div>
                        <span className="text-xs font-bold text-slate-700">{student.attendancePercent}%</span>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                        student.attendancePercent >= 90 ? "bg-emerald-50 text-emerald-600" :
                        student.attendancePercent >= 75 ? "bg-amber-50 text-amber-600" : "bg-red-50 text-red-600"
                      }`}>
                        {student.attendancePercent >= 90 ? "Good" : student.attendancePercent >= 75 ? "Average" : "Low"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Attendance;
