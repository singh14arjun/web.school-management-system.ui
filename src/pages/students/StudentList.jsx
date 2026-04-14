import { useState } from "react";
import { Link } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { MdFilterList, MdPersonAdd, MdEdit, MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { students } from "../../data/students";
import { toast } from "react-toastify";

const StatusBadge = ({ status }) => {
  const colors = {
    Active: "bg-emerald-50 text-emerald-600 border-emerald-200",
    Inactive: "bg-slate-50 text-slate-500 border-slate-200",
    Transferred: "bg-orange-50 text-orange-600 border-orange-200",
    Alumni: "bg-blue-50 text-blue-600 border-blue-200",
  };
  return (
    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${colors[status] || "bg-slate-50 text-slate-600"}`}>
      {status}
    </span>
  );
};

const FeeBadge = ({ status }) => {
  const colors = {
    Clear: "text-emerald-600 bg-emerald-50",
    Due: "text-amber-600 bg-amber-50",
    Overdue: "text-red-600 bg-red-50",
  };
  return (
    <span className={`px-2 py-0.5 text-xs font-semibold rounded ${colors[status] || "text-slate-600 bg-slate-50"}`}>
      {status === "Clear" ? "No Dues" : status}
    </span>
  );
};

const DeleteModal = ({ student, onConfirm, onCancel }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in">
    <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md mx-4 animate-slide-up">
      <div className="flex items-center justify-center w-14 h-14 bg-red-100 rounded-full mx-auto mb-4">
        <MdDelete className="text-3xl text-red-500" />
      </div>
      <h3 className="text-lg font-bold text-slate-800 text-center">Delete Student?</h3>
      <p className="text-sm text-slate-500 text-center mt-2">
        Are you sure you want to delete <span className="font-semibold text-slate-700">{student.personalInfo.fullName}</span> ({student.id})?
        This action cannot be undone.
      </p>
      <div className="flex gap-3 mt-6">
        <button
          onClick={onCancel}
          className="flex-1 px-4 py-2.5 text-sm font-semibold text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all cursor-pointer"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-red-500 rounded-xl hover:bg-red-600 hover:shadow-lg hover:shadow-red-500/25 transition-all cursor-pointer"
        >
          Yes, Delete
        </button>
      </div>
    </div>
  </div>
);

const StudentList = () => {
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("All");
  const [sectionFilter, setSectionFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [deleteTarget, setDeleteTarget] = useState(null);

  const allClasses = [...new Set(students.map((s) => s.academicInfo.currentClass))].sort();
  const allSections = [...new Set(students.map((s) => s.academicInfo.section))].sort();

  const filtered = students.filter((s) => {
    const matchSearch =
      s.personalInfo.fullName.toLowerCase().includes(search.toLowerCase()) ||
      s.id.toLowerCase().includes(search.toLowerCase());
    const matchClass = classFilter === "All" || s.academicInfo.currentClass === classFilter;
    const matchSection = sectionFilter === "All" || s.academicInfo.section === sectionFilter;
    const matchStatus = statusFilter === "All" || s.status === statusFilter;
    return matchSearch && matchClass && matchSection && matchStatus;
  });

  const handleDelete = (student) => {
    setDeleteTarget(student);
  };

  const confirmDelete = () => {
    toast.success(`${deleteTarget.personalInfo.fullName} has been deleted`);
    setDeleteTarget(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <DeleteModal
          student={deleteTarget}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Students</h1>
          <p className="text-sm text-slate-500">{students.length} total students across all classes</p>
        </div>
        <Link
          to="/students/add"
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
        >
          <MdPersonAdd className="text-xl" />
          Add Student
        </Link>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm card-hover animate-slide-up delay-1">
          <p className="text-sm text-slate-500">Active</p>
          <p className="text-2xl font-bold text-emerald-600">{students.filter((s) => s.status === "Active").length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm card-hover animate-slide-up delay-2">
          <p className="text-sm text-slate-500">Fee Clear</p>
          <p className="text-2xl font-bold text-blue-600">{students.filter((s) => s.feeStatus === "Clear").length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm card-hover animate-slide-up delay-3">
          <p className="text-sm text-slate-500">Fee Overdue</p>
          <p className="text-2xl font-bold text-red-600">{students.filter((s) => s.feeStatus === "Overdue").length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm card-hover animate-slide-up delay-4">
          <p className="text-sm text-slate-500">Avg Attendance</p>
          <p className="text-2xl font-bold text-indigo-600">
            {(students.reduce((acc, s) => acc + s.attendancePercent, 0) / students.length).toFixed(1)}%
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm animate-slide-up delay-3">
        <div className="flex items-center gap-3 p-4 border-b border-slate-100">
          <div className="relative flex-1">
            <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name or student ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
            />
          </div>
          <div className="relative">
            <MdFilterList className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <select
              value={classFilter}
              onChange={(e) => setClassFilter(e.target.value)}
              className="pl-9 pr-8 py-2 text-sm border border-slate-200 rounded-lg appearance-none focus:outline-none focus:border-blue-400 bg-white cursor-pointer"
            >
              <option value="All">All Classes</option>
              {allClasses.map((cls) => (
                <option key={cls} value={cls}>{cls}</option>
              ))}
            </select>
          </div>
          <select
            value={sectionFilter}
            onChange={(e) => setSectionFilter(e.target.value)}
            className="px-4 py-2 text-sm border border-slate-200 rounded-lg appearance-none focus:outline-none focus:border-blue-400 bg-white cursor-pointer"
          >
            <option value="All">All Sections</option>
            {allSections.map((sec) => (
              <option key={sec} value={sec}>{sec}</option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 text-sm border border-slate-200 rounded-lg appearance-none focus:outline-none focus:border-blue-400 bg-white cursor-pointer"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Transferred">Transferred</option>
            <option value="Alumni">Alumni</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider bg-slate-50/80">
                <th className="px-5 py-3">Student</th>
                <th className="px-5 py-3">ID</th>
                <th className="px-5 py-3">Class</th>
                <th className="px-5 py-3">Guardian</th>
                <th className="px-5 py-3">Attendance</th>
                <th className="px-5 py-3">Fee</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map((student) => (
                <tr key={student.id} className="hover:bg-blue-50/30 transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                        {student.personalInfo.fullName.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">{student.personalInfo.fullName}</p>
                        <p className="text-xs text-slate-400">{student.personalInfo.gender} &bull; {student.personalInfo.bloodGroup}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-sm font-mono text-blue-600">{student.id}</td>
                  <td className="px-5 py-3">
                    <p className="text-sm font-medium text-slate-700">{student.academicInfo.currentClass}-{student.academicInfo.section}</p>
                    <p className="text-xs text-slate-400">Roll #{student.academicInfo.rollNumber}</p>
                  </td>
                  <td className="px-5 py-3">
                    <p className="text-sm text-slate-700">{student.guardianInfo.father.name}</p>
                    <p className="text-xs text-slate-400">{student.guardianInfo.father.mobile}</p>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-12 bg-slate-100 rounded-full h-1.5">
                        <div
                          className={`h-1.5 rounded-full transition-all duration-500 ${student.attendancePercent >= 90 ? "bg-emerald-500" : student.attendancePercent >= 75 ? "bg-amber-500" : "bg-red-500"}`}
                          style={{ width: `${student.attendancePercent}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-semibold text-slate-600">{student.attendancePercent}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-3"><FeeBadge status={student.feeStatus} /></td>
                  <td className="px-5 py-3"><StatusBadge status={student.status} /></td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-1.5">
                      <Link
                        to={`/students/${student.id}`}
                        className="flex items-center gap-1 text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-2 rounded hover:text-blue-800 hover:bg-blue-200 transition-all duration-200 cursor-pointer"
                      >
                        <FaEye />
                      </Link>
                      <Link
                        to={`/students/edit/${student.id}`}
                        className="flex items-center gap-1 text-xs font-semibold text-amber-600 bg-amber-100 px-2 py-2 rounded hover:text-amber-800 hover:bg-amber-200 transition-all duration-200 cursor-pointer"
                      >
                        <MdEdit />
                      </Link>
                      <button
                        onClick={() => handleDelete(student)}
                        className="flex items-center gap-1 text-xs font-semibold text-red-600 bg-red-100 px-2 py-2 rounded hover:text-red-800 hover:bg-red-200 transition-all duration-200 cursor-pointer"
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <p className="text-center text-slate-400 py-8">No students found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentList;