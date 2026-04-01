import { useState } from "react";
import { Link } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { MdFilterList, MdPersonAdd } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { staff, staffRoles, departments } from "../../data/staff";

const RoleBadge = ({ role }) => {
  const colors = {
    Principal: "bg-violet-50 text-violet-600 border-violet-200",
    Teacher: "bg-blue-50 text-blue-600 border-blue-200",
    Accountant: "bg-emerald-50 text-emerald-600 border-emerald-200",
    Librarian: "bg-amber-50 text-amber-700 border-amber-200",
    "Transport Manager": "bg-orange-50 text-orange-600 border-orange-200",
    "Hostel Warden": "bg-red-50 text-red-600 border-red-200",
    "Reception Staff": "bg-sky-50 text-sky-600 border-sky-200",
  };
  return (
    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${colors[role] || "bg-slate-50 text-slate-600"}`}>
      {role}
    </span>
  );
};

const StaffList = () => {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [deptFilter, setDeptFilter] = useState("All");

  const filtered = staff.filter((s) => {
    const matchSearch =
      s.personalInfo.fullName.toLowerCase().includes(search.toLowerCase()) ||
      s.id.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "All" || s.role === roleFilter;
    const matchDept = deptFilter === "All" || s.professionalInfo.department === deptFilter;
    return matchSearch && matchRole && matchDept;
  });

  const roleStats = staffRoles.map((role) => ({
    role,
    count: staff.filter((s) => s.role === role).length,
  }));

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Staff Management</h1>
          <p className="text-sm text-slate-500">{staff.length} total staff members</p>
        </div>
        <Link
          to="/staff/add"
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
        >
          <MdPersonAdd className="text-xl" />
          Add Staff
        </Link>
      </div>

      {/* Role Stats */}
      <div className="grid grid-cols-7 gap-3">
        {roleStats.map(({ role, count }, i) => (
          <button
            key={role}
            onClick={() => setRoleFilter(roleFilter === role ? "All" : role)}
            className={`bg-white rounded-xl p-3 border shadow-sm text-center transition-all duration-300 cursor-pointer card-hover animate-slide-up ${roleFilter === role ? "border-blue-300 shadow-blue-100 ring-1 ring-blue-200" : "border-slate-100"}`}
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            <p className="text-xl font-bold text-slate-800">{count}</p>
            <p className="text-xs text-slate-500 mt-0.5">{role}</p>
          </button>
        ))}
      </div>

      {/* Filter + Table */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm animate-slide-up delay-4">
        <div className="flex items-center gap-3 p-4 border-b border-slate-100">
          <div className="relative flex-1">
            <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name or employee ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
            />
          </div>
          <div className="relative">
            <MdFilterList className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="pl-9 pr-8 py-2 text-sm border border-slate-200 rounded-lg appearance-none focus:outline-none focus:border-blue-400 bg-white cursor-pointer"
            >
              <option value="All">All Roles</option>
              {staffRoles.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
          <select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            className="px-4 py-2 text-sm border border-slate-200 rounded-lg appearance-none focus:outline-none focus:border-blue-400 bg-white cursor-pointer"
          >
            <option value="All">All Departments</option>
            {departments.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider bg-slate-50/80">
                <th className="px-5 py-3">Employee</th>
                <th className="px-5 py-3">ID</th>
                <th className="px-5 py-3">Role</th>
                <th className="px-5 py-3">Department</th>
                <th className="px-5 py-3">Contact</th>
                <th className="px-5 py-3">Attendance</th>
                <th className="px-5 py-3">Salary</th>
                <th className="px-5 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map((member) => {
                const att = member.attendance;
                const attPercent = ((att.present / att.totalDays) * 100).toFixed(0);
                return (
                  <tr key={member.id} className="hover:bg-blue-50/30 transition-colors">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-400 to-violet-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                          {member.personalInfo.fullName.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-800">{member.personalInfo.fullName}</p>
                          <p className="text-xs text-slate-400">{member.professionalInfo.designation}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-sm font-mono text-violet-600">{member.id}</td>
                    <td className="px-5 py-3"><RoleBadge role={member.role} /></td>
                    <td className="px-5 py-3 text-sm text-slate-600">{member.professionalInfo.department}</td>
                    <td className="px-5 py-3">
                      <p className="text-sm text-slate-700">{member.personalInfo.phone}</p>
                      <p className="text-xs text-slate-400">{member.personalInfo.email}</p>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-12 bg-slate-100 rounded-full h-1.5">
                          <div
                            className={`h-1.5 rounded-full transition-all duration-500 ${attPercent >= 90 ? "bg-emerald-500" : attPercent >= 75 ? "bg-amber-500" : "bg-red-500"}`}
                            style={{ width: `${attPercent}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-semibold text-slate-600">{attPercent}%</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">{att.present}P / {att.absent}A / {att.late}L</p>
                    </td>
                    <td className="px-5 py-3 text-sm font-semibold text-slate-700">
                      Rs.{member.salary.total.toLocaleString()}
                    </td>
                    <td className="px-5 py-3">
                      <Link
                        to={`/staff/${member.id}`}
                        className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800 px-3 py-1.5 bg-blue-50 rounded-lg hover:bg-blue-100 transition-all duration-200"
                      >
                        <FaEye /> View
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <p className="text-center text-slate-400 py-8">No staff members found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StaffList;