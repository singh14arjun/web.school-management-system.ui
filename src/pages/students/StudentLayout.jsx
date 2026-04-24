import React, { useState } from "react";
import { PiUserCircle } from "react-icons/pi";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { MdOutlineDashboard } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import { HiOutlineCash } from "react-icons/hi";
import { FaBars, FaGraduationCap } from "react-icons/fa";
import { FaListCheck } from "react-icons/fa6";
import { BiBook, BiBookOpen, BiLogOut } from "react-icons/bi";
import { IoLogOut } from "react-icons/io5";
import { toast } from "react-toastify";

const StudentLayout = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const navigate = useNavigate();

  const navlinks = [
    {
      to: "/student-dashboard",
      label: "Dashboard",
      icon: <MdOutlineDashboard className="text-lg" />,
    },
    {
      to: "student-timetable",
      label: "Timetable",
      icon: <SlCalender className="text-lg" />,
    },
    {
      to: "student-fees",
      label: "Fees",
      icon: <HiOutlineCash className="text-lg" />,
    },
    {
      to: "student-result",
      label: "Results",
      icon: <FaGraduationCap className="text-lg" />,
    },
    {
      to: "student-attendance",
      label: "Attendance",
      icon: <FaListCheck className="text-lg" />,
    },
    {
      to: "student-assignment",
      label: "Assignment",
      icon: <BiBookOpen className="text-lg" />,
    },
    {
      to: "profile",
      label: "Profile",
      icon: <PiUserCircle className="text-lg" />,
    },
  ];

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all duration-300 ${
      isActive
        ? "bg-blue-600 text-white shadow"
        : "text-gray-300 hover:bg-gray-700 hover:text-white"
    }`;

  // ✅ FIXED FUNCTION
  const handleMenuOpen = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("selectedSchool");
    toast.success("Sign out successfully");
    navigate("/");
  };
  return (
    <div className="flex h-screen overflow-hidden">
      {/* 🔥 Sidebar */}
      <aside
        className={`
          fixed lg:static top-0 left-0 h-full w-64 bg-gray-900 text-white p-5 z-50
          transform transition-transform duration-300
          ${isSideBarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:flex flex-col
        `}
      >
        {/* Profile */}
        <div className="mb-6">
          <p className="text-sm text-gray-400">Welcome</p>
          <h2 className="text-lg font-semibold">Arjun Singh</h2>
        </div>

        {/* Title */}
        <h1 className="text-xl font-bold mb-6">Student Portal</h1>

        {/* Nav */}
        <nav className="flex flex-col gap-2">
          {navlinks.map((link, index) => (
            <NavLink
              key={index}
              to={link.to}
              className={navLinkClass}
              end={link.to === "/student-dashboard"}
              onClick={() => setIsSideBarOpen(false)} // ✅ close on click (mobile)
            >
              {link.icon}
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div
          className="p-4 mt-auto flex justify-center py-2 items-center gap-2 rounded-lg bg-red-100 text-red-600 font-bold border-red-600 border cursor-pointer hover:bg-red-800 hover:text-white"
          onClick={handleLogout}
        >
          Logout
          <IoLogOut />
        </div>
      </aside>

      {isSideBarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setIsSideBarOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col bg-gray-50">
        <header className="flex items-center justify-between px-6 py-3 bg-white shadow-sm">
          <FaBars
            className="flex lg:hidden cursor-pointer"
            onClick={handleMenuOpen}
          />

          <input
            type="text"
            placeholder="Search..."
            className="border px-4 py-2 rounded-lg w-40 md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="font-medium">Arjun Singh</p>
              <p className="text-sm text-gray-500">ID: 12345</p>
            </div>

            <img
              src="https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?w=600"
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover border"
            />
          </div>
        </header>

        <main className="p-2 md:p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default StudentLayout;
