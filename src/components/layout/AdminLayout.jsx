import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { IoSchool } from "react-icons/io5";
import { BiSolidSchool, BiUser } from "react-icons/bi";
import {
  MdDashboard,
  MdPersonAdd,
  MdSwapHoriz,
  MdEventAvailable,
  MdClass,
  MdTimeToLeave,
} from "react-icons/md";
import { FaCalendarAlt, FaChalkboardTeacher, FaUserTie } from "react-icons/fa";
import { PiStudent } from "react-icons/pi";
import { IoIosLogOut } from "react-icons/io";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { toast } from "react-toastify";

const AdminLayout = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const selectedSchool = JSON.parse(
    localStorage.getItem("selectedSchool") || "null",
  );

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("selectedSchool");
    toast.success("Sign out successfully");
    navigate("/");
  };

  const handleSwitchSchool = () => {
    localStorage.removeItem("selectedSchool");
    navigate("/select-school");
  };

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2.5 font-medium rounded-lg transition-all duration-300 cursor-pointer group ` +
    (isActive
      ? `text-white bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg shadow-blue-500/25`
      : `text-blue-100/70 hover:text-white hover:bg-white/10`);

  const sidebarLinks = [
    {
      to: "/dashboard",
      icon: <MdDashboard className="text-xl" />,
      label: "Dashboard",
    },
    {
      to: `/school-profile/${selectedSchool?.id}`,
      icon: <BiSolidSchool className="text-xl" />,
      label: "School",
    },
    {
      to: "/enrollment",
      icon: <MdPersonAdd className="text-xl" />,
      label: "Enrollment",
    },
    {
      to: "/students",
      icon: <PiStudent className="text-xl" />,
      label: "Students",
    },
    {
      to: "/students/attendance",
      icon: <MdEventAvailable className="text-xl" />,
      label: "Attendance",
    },
    { to: "/classes", icon: <MdClass className="text-xl" />, label: "Classes" },
    { to: "/staff", icon: <FaUserTie className="text-xl" />, label: "Staff" },
    {
      to: "/teachers",
      icon: <FaChalkboardTeacher className="text-xl" />,
      label: "Teachers",
    },
    {
      to: "/timetable",
      icon: <FaCalendarAlt className="text-xl" />,
      label: "TimeTable",
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#f0f4ff]">
      {/* Sidebar */}
      <aside
        className={`${sidebarOpen ? "w-64" : "w-20"} fixed h-screen flex flex-col z-20 transition-all duration-300 bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#0f172a]`}
      >
        {/* Logo & Selected School */}
        <div className="flex gap-3 items-center p-4 border-b border-white/10">
          <div className="p-1.5 rounded-lg bg-blue-500/20 border border-blue-400/30 shrink-0 animate-pulse-glow">
            <IoSchool className="text-2xl text-blue-400" />
          </div>
          {sidebarOpen && (
            <div className="animate-fade-in min-w-0">
              <h1 className="text-base font-bold text-white truncate">
                {selectedSchool ? (
                  selectedSchool.schoolName
                ) : (
                  <>
                    School<span className="text-blue-400">MS</span>
                  </>
                )}
              </h1>
              <p className="text-[10px] text-blue-300/50 font-medium tracking-wider uppercase">
                {selectedSchool ? selectedSchool.schoolCode : "Admin Panel"}
              </p>
            </div>
          )}
        </div>

        {/* Switch School Button */}
        {selectedSchool && (
          <div className="px-3 mt-3">
            <button
              onClick={handleSwitchSchool}
              className="w-full flex items-center gap-2 px-4 py-2 text-xs font-medium text-blue-300/70 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:text-white transition-all duration-300 cursor-pointer"
            >
              <MdSwapHoriz className="text-lg" />
              {sidebarOpen && <span>Switch School</span>}
            </button>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex flex-col gap-1 px-3 mt-5 flex-1 overflow-y-auto">
          <p
            className={`text-[10px] font-bold text-blue-300/40 uppercase tracking-widest mb-2 ${sidebarOpen ? "px-4" : "text-center"}`}
          >
            {sidebarOpen ? "Main Menu" : "---"}
          </p>
          {sidebarLinks.map((link, i) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={navLinkClass}
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <span className="transition-transform duration-200 group-hover:scale-110">
                {link.icon}
              </span>
              {sidebarOpen && <span className="text-sm">{link.label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* User Info */}
        <div className="border-t border-white/10 p-3">
          <div className="flex items-center gap-2">
            <div className="bg-blue-500/20 border border-blue-400/30 rounded-lg shrink-0">
              <BiUser className="text-3xl text-blue-400 p-1" />
            </div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0 animate-fade-in">
                <p className="text-sm font-bold text-white truncate">Kanchan</p>
                <p className="text-[10px] font-semibold text-blue-400">
                  Super Admin
                </p>
              </div>
            )}
            <button
              onClick={handleSignOut}
              className="flex items-center gap-1 text-red-400 font-semibold border border-red-400/20 bg-red-400/10 px-2 py-1.5 rounded-lg transition-all duration-300 hover:bg-red-500/20 hover:border-red-400/40 cursor-pointer shrink-0"
              title="Logout"
            >
              <IoIosLogOut className="text-lg" />
              {sidebarOpen && <span className="text-xs">Logout</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`flex-1 ${sidebarOpen ? "ml-64" : "ml-20"} transition-all duration-300`}
      >
        {/* Top Header */}
        <header className="sticky top-0 z-10 glass border-b border-slate-200/60 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-slate-500 hover:text-blue-600 transition-colors cursor-pointer p-1 rounded-lg hover:bg-blue-50"
            >
              <HiOutlineMenuAlt2 className="text-2xl" />
            </button>
            <div>
              <input
                type="text"
                placeholder="Search students, staff, schools..."
                className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm w-80 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all placeholder:text-slate-400"
              />
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-500">
            <span className="px-3 py-1.5 bg-blue-50 rounded-lg border border-blue-100">
              Academic Year: <strong className="text-blue-700">2025-26</strong>
            </span>
          </div>
        </header>

        {/* Page Content */}
        <section className="p-6">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default AdminLayout;
