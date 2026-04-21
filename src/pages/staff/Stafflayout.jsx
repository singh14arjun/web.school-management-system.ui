import React from "react";
import { BiCalendar, BiLogOut, BiNotification } from "react-icons/bi";
import { NavLink, Outlet } from "react-router-dom";
import { PiCarProfile, PiStudent, PiUserCircle } from "react-icons/pi";
import { FaChalkboardTeacher, FaNotesMedical } from "react-icons/fa";
import {
  IoCash,
  IoNotificationsCircleOutline,
  IoSettings,
} from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
const StaffLayout = () => {
  const navLinks = [
    {
      to: "/staff-dashboard",
      label: "My Schedule",
      icon: <BiCalendar className="text-xl" />,
    },

    { to: "salary", label: "Salary", icon: <IoCash className="text-xl" /> },
    {
      to: "attendence",
      label: "Attendance",
      icon: <BiCalendar className="text-xl" />,
    },
    {
      to: "timetable",
      label: "Timetable",
      icon: <BiNotification className="text-xl" />,
    },
    // {
    //   to: "/students",
    //   label: "Students",
    //   icon: <PiStudent className="text-xl" />,
    // },
    {
      to: "assignments",
      label: "Assignments",
      icon: <FaNotesMedical className="text-xl" />,
    },
    {
      to: "results",
      label: "Results",
      icon: <FaChalkboardTeacher className="text-xl" />,
    },

    {
      to: "profile",
      label: "Profile",
      icon: <PiUserCircle className="text-xl" />,
    },
  ];
  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2.5 font-medium rounded-lg transition-all duration-300 cursor-pointer group ` +
    (isActive
      ? `text-white bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg shadow-blue-500/25`
      : `text-blue-100/70 hover:text-white hover:bg-white/10`);
  return (
    <div>
      <div className="hidden md:flex">
        <aside
          className={`w-64 fixed h-screen flex flex-col z-20 transition-all duration-300 bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#0f172a]`}
        >
          <div className="p-4">
            <h1 className="text-xl font-bold text-blue-500">Staff Portal</h1>
            <p className="text-sm font-bold text-white/50">Arjun Singh</p>
          </div>
          <nav className="flex flex-col gap-4 p-4">
            {navLinks.map((link) => (
              <NavLink
                to={link.to}
                className={navLinkClass}
                end={link.to === "/staff-dashboard"}
              >
                {link.icon}
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="p-4 mt-auto">
            <button className="flex  gap-2 justify-center items-center border p-2 rounded border-red-500 bg-red-500/10 text-white hover:bg-red-500/20 w-full transition-all duration-300    cursor-pointer">
              Logout
              <IoIosLogOut className="text-xl" />
            </button>
          </div>
        </aside>
      </div>

      <div>
        <main className="flex-1 md:ml-64 p-6">
          <header className="mb-6 sticky top-0 z-10 backdrop-blur-lg">
            <div className="flex justify-between items-center gap-4">
              <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold text-gray-800">
                  Welcome Back, Arjun!
                </h1>
                <p className="text-gray-600">
                  Here's what's happening with your classes today.
                </p>
              </div>
              <div className="flex gap-4 items-center mt-4">
                <div>
                  <input
                    type="text"
                    placeholder="Search..."
                    className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  />
                </div>
                <IoNotificationsCircleOutline />
                <IoSettings />
              </div>
            </div>
          </header>

          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default StaffLayout;
