import { useState } from "react";
import { Link } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { MdDelete, MdFilterList, MdPersonAdd } from "react-icons/md";
import { TextField, MenuItem, InputAdornment } from "@mui/material";

import { FaEye } from "react-icons/fa";
import { staff, staffRoles, departments } from "../../data/staff";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { BiEdit } from "react-icons/bi";
import DataNotFound from "../DataNotFound";
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

          {/* Search */}
          <div className="flex-1">
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

          {/* Role Filter */}
          <TextField
            select
            size="small"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MdFilterList className="text-slate-400" />
                </InputAdornment>
              ),
            }}
            sx={{ minWidth: 150 }}
          >
            <MenuItem value="All">All Roles</MenuItem>
            {staffRoles.map((r) => (
              <MenuItem key={r} value={r}>
                {r}
              </MenuItem>
            ))}
          </TextField>

          {/* Department Filter */}
          <TextField
            select
            size="small"
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            sx={{ minWidth: 170 }}
          >
            <MenuItem value="All">All Departments</MenuItem>
            {departments.map((d) => (
              <MenuItem key={d} value={d}>
                {d}
              </MenuItem>
            ))}
          </TextField>

        </div>


        <div className="overflow-x-auto">
          <div className="max-h-[400px] overflow-y-auto scrollbar-hide">
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow className="bg-slate-50/80">
                    <TableCell className="text-xs font-semibold uppercase">Employee</TableCell>
                    <TableCell className="text-xs font-semibold uppercase">ID</TableCell>
                    <TableCell className="text-xs font-semibold uppercase">Role</TableCell>
                    <TableCell className="text-xs font-semibold uppercase">Department</TableCell>
                    <TableCell className="text-xs font-semibold uppercase">Contact</TableCell>
                    <TableCell className="text-xs font-semibold uppercase">Attendance</TableCell>
                    <TableCell className="text-xs font-semibold uppercase">Salary</TableCell>
                    <TableCell className="text-xs font-semibold uppercase">Action</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {filtered.map((member) => {
                    const att = member.attendance;
                    const attPercent = ((att.present / att.totalDays) * 100).toFixed(0);

                    return (
                      <TableRow key={member.id} hover>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-400 to-violet-600 flex items-center justify-center text-white font-bold text-sm">
                              {member.personalInfo.fullName
                                .split(" ")
                                .map((n) => n[0])
                                .slice(0, 2)
                                .join("")}
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-slate-800">
                                {member.personalInfo.fullName}
                              </p>
                              <p className="text-xs text-slate-400">
                                {member.professionalInfo.designation}
                              </p>
                            </div>
                          </div>
                        </TableCell>

                        <TableCell className="text-sm font-mono text-violet-600">
                          {member.id}
                        </TableCell>

                        <TableCell>
                          <RoleBadge role={member.role} />
                        </TableCell>

                        <TableCell className="text-sm text-slate-600">
                          {member.professionalInfo.department}
                        </TableCell>
                        <TableCell>
                          <p className="text-sm text-slate-700">
                            {member.personalInfo.phone}
                          </p>
                          <p className="text-xs text-slate-400">
                            {member.personalInfo.email}
                          </p>
                        </TableCell>

                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-12 bg-slate-100 rounded-full h-1.5">
                              <div
                                className={`h-1.5 rounded-full ${attPercent >= 90
                                  ? "bg-emerald-500"
                                  : attPercent >= 75
                                    ? "bg-amber-500"
                                    : "bg-red-500"
                                  }`}
                                style={{ width: `${attPercent}%` }}
                              ></div>
                            </div>
                            <span className="text-xs font-semibold text-slate-600">
                              {attPercent}%
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 mt-0.5">
                            {att.present}P / {att.absent}A / {att.late}L
                          </p>
                        </TableCell>

                        <TableCell className="text-sm font-semibold text-slate-700">
                          Rs.{member.salary.total.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Link
                              to={`/staff/${member?.id}`}
                              className="flex items-center gap-1 text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-2 rounded hover:text-blue-800 hover:bg-blue-200 transition-all duration-200 cursor-pointer"
                            >
                              <FaEye />
                            </Link>
                            <Link
                              to={`/staff/edit/${member?.id}`}
                              className="flex items-center gap-1 text-xs font-semibold text-yellow-600 bg-yellow-100 px-2 py-2 rounded hover:text-yellow-800 hover:bg-yellow-200 transition-all duration-200 cursor-pointer"
                            >
                              <BiEdit />
                            </Link>
                            <Link
                              to={`/staff/delete/${member?.id}`}
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

            {filtered.length === 0 && (
              <DataNotFound />
            )}
          </div>
        </div>
      </div>
    </div >
  );
};

export default StaffList;