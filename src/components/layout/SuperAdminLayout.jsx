import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { FaHouseMedical, FaSchool } from "react-icons/fa6";
import { IoIosLogOut } from "react-icons/io";
import { PiStudent } from "react-icons/pi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";

const SuperAdminLayout = () => {

    const token = localStorage.getItem("token");
    console.log(token);
    const decoded = token ? jwtDecode(token) : null;
    console.log(decoded);
    const userName = decoded?.name || "Guest";
    console.log(userName);
    const role = decoded?.role || "Super Admin";
    console.log(role);

    const navLinks = [
        { to: "/super-admin", label: "Dashboard", icon: <FaHouseMedical /> },
        { to: "/super-admin/schools", label: "Schools", icon: <FaSchool /> },
        { to: "/super-admin/teachers", label: "Teachers", icon: <FaChalkboardTeacher /> },
        { to: "/super-admin/students", label: "Students", icon: <PiStudent /> },
    ];

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="grid grid-cols-12">
            <aside className="col-span-2 sticky top-0 h-screen bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white px-4">
                <div className="flex items-center gap-2 py-5">
                    <FaSchool className="text-4xl bg-blue-500 p-1 rounded" />
                    <div>
                        <p className="text-lg">{userName}</p>
                        <p className="text-sm">{role}</p>
                    </div>
                </div>

                <nav className="flex flex-col gap-4">
                    {navLinks.map((link) => (
                        <div key={link.to} className="p-2 hover:bg-slate-600 cursor-pointer bg-slate-700 rounded">
                            <Link to={link.to} className="flex items-center gap-2">
                                {link.icon} {link.label}
                            </Link>
                        </div>
                    ))}
                </nav>

                <div className="absolute bottom-10">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 p-2 bg-red-500/10 border border-red-500 rounded hover:bg-red-500/20"
                    >
                        Logout <IoIosLogOut />
                    </button>
                </div>
            </aside>

            <main className="col-span-10">
                <Outlet />
            </main>
        </div>
    );
};

export default SuperAdminLayout;