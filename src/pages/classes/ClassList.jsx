import { useState } from "react";
import { Link } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { MdFilterList, MdAdd, MdEdit, MdDelete, MdClass, MdPeople, MdRoom, MdAccessTime } from "react-icons/md";
import { FaEye, FaChalkboardTeacher } from "react-icons/fa";
import { classes } from "../../data/classes";
import { toast } from "react-toastify";

const StatusBadge = ({ status }) => (
  <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${status === "Active" ? "bg-emerald-50 text-emerald-600 border-emerald-200" : "bg-slate-50 text-slate-500 border-slate-200"
    }`}>
    {status}
  </span>
);

const DeleteModal = ({ cls, onConfirm, onCancel }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in">
    <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md mx-4 animate-slide-up">
      <div className="flex items-center justify-center w-14 h-14 bg-red-100 rounded-full mx-auto mb-4">
        <MdDelete className="text-3xl text-red-500" />
      </div>
      <h3 className="text-lg font-bold text-slate-800 text-center">Delete Class?</h3>
      <p className="text-sm text-slate-500 text-center mt-2">
        Are you sure you want to delete <span className="font-semibold text-slate-700">{cls.className} - {cls.section}</span>?
        This will affect {cls.totalStudents} students. This action cannot be undone.
      </p>
      <div className="flex gap-3 mt-6">
        <button onClick={onCancel} className="flex-1 px-4 py-2.5 text-sm font-semibold text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all cursor-pointer">
          Cancel
        </button>
        <button onClick={onConfirm} className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-red-500 rounded-xl hover:bg-red-600 hover:shadow-lg hover:shadow-red-500/25 transition-all cursor-pointer">
          Yes, Delete
        </button>
      </div>
    </div>
  </div>
);

const ClassList = () => {
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("All");
  const [sectionFilter, setSectionFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [deleteTarget, setDeleteTarget] = useState(null);

  const allClassNames = [...new Set(classes.map((c) => c.className))].sort((a, b) => {
    const order = ["Nursery", "LKG", "UKG"];
    const aIdx = order.indexOf(a);
    const bIdx = order.indexOf(b);
    if (aIdx !== -1 && bIdx !== -1) return aIdx - bIdx;
    if (aIdx !== -1) return -1;
    if (bIdx !== -1) return 1;
    const aNum = parseInt(a.replace("Class ", ""));
    const bNum = parseInt(b.replace("Class ", ""));
    return aNum - bNum;
  });
  const allSections = [...new Set(classes.map((c) => c.section))].sort();

  const filtered = classes.filter((c) => {
    const matchSearch =
      c.className.toLowerCase().includes(search.toLowerCase()) ||
      c.classTeacher.toLowerCase().includes(search.toLowerCase()) ||
      c.id.toLowerCase().includes(search.toLowerCase());
    const matchClass = classFilter === "All" || c.className === classFilter;
    const matchSection = sectionFilter === "All" || c.section === sectionFilter;
    const matchStatus = statusFilter === "All" || c.status === statusFilter;
    return matchSearch && matchClass && matchSection && matchStatus;
  });

  const confirmDelete = () => {
    toast.success(`${deleteTarget.className} - ${deleteTarget.section} has been deleted`);
    setDeleteTarget(null);
  };

  const totalStudents = classes.reduce((sum, c) => sum + c.totalStudents, 0);
  const activeClasses = classes.filter((c) => c.status === "Active").length;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Delete Modal */}
      {deleteTarget && (
        <DeleteModal cls={deleteTarget} onConfirm={confirmDelete} onCancel={() => setDeleteTarget(null)} />
      )}

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Classes</h1>
          <p className="text-sm text-slate-500">{classes.length} total classes across all sections</p>
        </div>
        <Link
          to="/classes/add"
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
        >
          <MdAdd className="text-xl" />
          Add Class
        </Link>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm card-hover animate-slide-up delay-1">
          <div className="flex items-center gap-2 mb-1">
            <MdClass className="text-blue-500" />
            <span className="text-sm text-slate-500">Total Classes</span>
          </div>
          <p className="text-2xl font-bold text-blue-600">{classes.length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm card-hover animate-slide-up delay-2">
          <div className="flex items-center gap-2 mb-1">
            <MdPeople className="text-emerald-500" />
            <span className="text-sm text-slate-500">Active Classes</span>
          </div>
          <p className="text-2xl font-bold text-emerald-600">{activeClasses}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm card-hover animate-slide-up delay-3">
          <div className="flex items-center gap-2 mb-1">
            <MdPeople className="text-indigo-500" />
            <span className="text-sm text-slate-500">Total Students</span>
          </div>
          <p className="text-2xl font-bold text-indigo-600">{totalStudents}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm card-hover animate-slide-up delay-4">
          <div className="flex items-center gap-2 mb-1">
            <FaChalkboardTeacher className="text-violet-500" />
            <span className="text-sm text-slate-500">Unique Sections</span>
          </div>
          <p className="text-2xl font-bold text-violet-600">{allSections.length}</p>
        </div>
      </div>

      {/* Filter Bar + Table */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm animate-slide-up delay-3">
        <div className="flex items-center gap-3 p-4 border-b border-slate-100">
          <div className="relative flex-1">
            <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by class name, teacher, or ID..."
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
              {allClassNames.map((cls) => (
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
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <div className="max-h-[400px] overflow-y-auto scrollbar-hide">
            <table className="w-full">
              <thead className="sticky top-0 bg-slate-50/80 z-10">
                <tr className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider bg-slate-50/80">
                  <th className="px-5 py-3">Class & Section</th>
                  <th className="px-5 py-3">ID</th>
                  <th className="px-5 py-3">Class Teacher</th>
                  <th className="px-5 py-3">Students</th>
                  <th className="px-5 py-3">Room</th>
                  <th className="px-5 py-3">Schedule</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map((cls) => (
                  <tr key={cls.id} className="hover:bg-blue-50/30 transition-colors">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-20 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                          {cls.className} {cls.section}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-800">{cls.className}</p>
                          <p className="text-xs text-slate-400">Section {cls.section}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-sm font-mono text-blue-600">{cls.id}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <FaChalkboardTeacher className="text-slate-400 text-sm" />
                        <span className="text-sm text-slate-700">{cls.classTeacher}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <MdPeople className="text-blue-400" />
                        <span className="text-sm font-semibold text-slate-700">{cls.totalStudents}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-1.5">
                        <MdRoom className="text-slate-400 text-sm" />
                        <span className="text-sm text-slate-600">{cls.room}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-1.5">
                        <MdAccessTime className="text-slate-400 text-sm" />
                        <span className="text-xs text-slate-600">{cls.schedule}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3"><StatusBadge status={cls.status} /></td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-1.5">
                        <Link
                          to={`/classes/${cls.id}`}
                          className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800 px-2.5 py-1.5 bg-blue-50 rounded-lg hover:bg-blue-100 transition-all duration-200"
                        >
                          <FaEye /> View
                        </Link>
                        <Link
                          to={`/classes/edit/${cls.id}`}
                          className="flex items-center gap-1 text-xs font-semibold text-amber-600 hover:text-amber-800 px-2.5 py-1.5 bg-amber-50 rounded-lg hover:bg-amber-100 transition-all duration-200"
                        >
                          <MdEdit /> Edit
                        </Link>
                        <button
                          onClick={() => setDeleteTarget(cls)}
                          className="flex items-center gap-1 text-xs font-semibold text-red-600 hover:text-red-800 px-2.5 py-1.5 bg-red-50 rounded-lg hover:bg-red-100 transition-all duration-200 cursor-pointer"
                        >
                          <MdDelete /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <p className="text-center text-slate-400 py-8">No classes found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassList;
