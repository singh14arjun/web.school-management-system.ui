import React from 'react'
import { MdDashboard } from 'react-icons/md'
import { PiExamBold, PiStudent } from 'react-icons/pi'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { GiTeacher } from 'react-icons/gi'
import { SiGoogleclassroom } from 'react-icons/si'
import { FaCalendarCheck, FaRupeeSign, FaSearch, FaUser } from 'react-icons/fa'
import { FaCalendarAlt } from 'react-icons/fa'
import { GrSettingsOption } from 'react-icons/gr'
import { FaBullhorn } from 'react-icons/fa'
import { FaBus } from 'react-icons/fa'
import { FaBook } from 'react-icons/fa'
import { BiLogOut, BiNotification } from 'react-icons/bi'
import { IoIosLogOut } from 'react-icons/io'
import { Button } from '@mui/material'

const navLinkClass = ({ isActive }) => `flex items-center gap-2 font-semibold text-sm hover:bg-gray-700 p-2 rounded-md ${isActive ? 'bg-blue-500' : ''}`;

const SchoolAdminLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const sidebarLinks = [
        { to: "/school-admin/dashboard", label: "Dashboard", icon: <MdDashboard className='text-2xl' /> },
        { to: "/school-admin/teachers", label: "Teachers", icon: <GiTeacher className='text-2xl' /> },
        { to: "/school-admin/students", label: "Students", icon: <PiStudent className='text-2xl' /> },
        { to: "/school-admin/non-teaching-staff", label: "Non Teaching Staff", icon: <FaUser className='text-2xl' /> },
        { to: "/school-admin/classes", label: "Classes & Sections", icon: <SiGoogleclassroom className='text-2xl' /> },
        { to: "/school-admin/attendance", label: "Attendance", icon: <FaCalendarCheck className='text-2xl' /> },
        { to: "/school-admin/account", label: "Account / Finance", icon: <FaRupeeSign className='text-2xl' /> },
        { to: "/school-admin/exams", label: "Exams & Results", icon: <PiExamBold className='text-2xl' /> },
        { to: "/school-admin/timetable", label: "Time Table", icon: <FaCalendarAlt className='text-2xl' /> },
        { to: "/school-admin/notice", label: "Notice /Announcements", icon: <FaBullhorn className='text-2xl' /> },
        { to: "/school-admin/transport", label: "Transport", icon: <FaBus className='text-2xl' /> },
        { to: "/school-admin/library", label: "Library", icon: <FaBook className='text-2xl' /> },
        { to: "/school-admin/settings", label: "Settings", icon: <GrSettingsOption className='text-2xl' /> },
    ]

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    }
    return (
        <div className='flex h-screen'>
            <aside className='w-1/5 bg-gray-800 text-white sticky top-0 h-screen overflow-y-auto'>
                <div className='p-4'>

                    <h1 className='text-2xl font-semibold'>School <span className='text-blue-500'>Admin</span></h1>
                    <p className='text-sm text-gray-400'>School Name</p>
                </div>
                <div className='flex flex-col gap-1  px-4'>
                    {sidebarLinks.map((link) => (
                        <NavLink to={link.to} className={navLinkClass}>
                            {link.icon}
                            {link.label}
                        </NavLink>
                    ))}
                </div>

                <div className='flex flex-col gap-1  px-4 absolute bottom-5 w-full'>
                    <Button variant='contained' color='error' className='flex items-center gap-2 hover:bg-gray-700 p-2 rounded-md'><IoIosLogOut className='text-2xl' onClick={() => { handleLogout() }} />
                        Logout
                    </Button>
                </div>

            </aside>
            <main className='w-4/5'>
                <nav className='flex justify-between items-center px-4 py-2 bg-gray-100 sticky top-0 border-b border-gray-300 z-10'>
                    <div className='flex w-full items-center gap-2'>

                        <div className='flex items-center gap-2'>
                            <p>School Name</p>

                        </div>
                        <div className='flex items-center gap-2 relative w-1/2'>
                            <input type="text" placeholder='Search' className='border border-gray-300 rounded-md px-2 py-1 w-full' />
                            <FaSearch className='absolute right-2 top-2' />
                        </div>
                    </div>
                    <div className='flex justify-end items-center gap-4 w-1/2'>
                        <div>
                            <BiNotification className='text-2xl' />
                        </div>
                        <div>
                            <div>
                                <p>arjun</p>
                                <p>School Admin</p>
                            </div>
                            <div>
                                <img src="" alt="" />
                            </div>
                        </div>
                        <div>
                            <Button type='button' variant='contained' color="error" className='flex items-center gap-2 hover:bg-gray-700 p-2 rounded-md' onClick={handleLogout}><IoIosLogOut className='text-2xl' />
                            </Button>
                        </div>
                    </div>
                </nav>
                <div className='p-4'>
                    <Outlet />
                </div>
            </main>
        </div>
    )
}

export default SchoolAdminLayout
