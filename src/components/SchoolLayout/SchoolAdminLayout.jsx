import React from 'react'
import { MdDashboard } from 'react-icons/md'
import { PiExamBold, PiStudent } from 'react-icons/pi'
import { NavLink, Outlet } from 'react-router-dom'
import { GiTeacher } from 'react-icons/gi'
import { SiGoogleclassroom } from 'react-icons/si'
import { FaCalendarCheck, FaRupeeSign, FaSearch } from 'react-icons/fa'
import { FaCalendarAlt } from 'react-icons/fa'
import { GrSettingsOption } from 'react-icons/gr'
import { FaBullhorn } from 'react-icons/fa'
import { FaBus } from 'react-icons/fa'
import { FaBook } from 'react-icons/fa'
import { BiLogOut, BiNotification } from 'react-icons/bi'
import { IoIosLogOut } from 'react-icons/io'
import { Button } from '@mui/material'

const navLinkClass = ({ isActive }) => `flex items-center gap-2 font-semibold hover:bg-gray-700 p-2 rounded-md ${isActive ? 'bg-blue-500' : ''}`;

const SchoolAdminLayout = () => {
    return (
        <div className='flex h-screen'>
            <aside className='w-1/5 bg-gray-800 text-white sticky top-0 h-screen overflow-y-auto'>
                <div className='p-4'>

                    <h1 className='text-2xl font-semibold'>School <span className='text-blue-500'>Admin</span></h1>
                    <p className='text-sm text-gray-400'>School Name</p>
                </div>
                <div className='flex flex-col gap-1  px-4'>
                    <NavLink to="/school-admin/dashboard" className={navLinkClass}> <MdDashboard className='text-2xl' />
                        Dashboard Overview</NavLink>
                    <NavLink to="/school-admin/teachers" className={navLinkClass}> <GiTeacher className='text-2xl' />
                        Teachers Management</NavLink>
                    <NavLink to="/school-admin/students" className={navLinkClass}><PiStudent className='text-2xl' /> Students Management</NavLink>
                    <NavLink to="/school-admin/non-teaching-staff" className={navLinkClass}>Non Teaching Staff Management</NavLink>
                    <NavLink to="/school-admin/classes" className={navLinkClass}> <SiGoogleclassroom className='text-2xl' />
                        Classes & Sections</NavLink>
                    <NavLink to="/school-admin/attendance" className={navLinkClass}> <FaCalendarCheck className='text-2xl' />
                        Attendance Management</NavLink>
                    <NavLink to="/school-admin/account" className={navLinkClass}><FaRupeeSign className='text-2xl' />
                        Account / Finance</NavLink>
                    <NavLink to="/school-admin/exams" className={navLinkClass}><PiExamBold className='text-2xl' />
                        Exams & Results</NavLink>
                    <NavLink to="/school-admin/timetable" className={navLinkClass}><FaCalendarAlt className='text-2xl' />
                        Time Table</NavLink>
                    <NavLink to="/school-admin/notice" className={navLinkClass}><FaBullhorn className='text-2xl' />
                        Notice /Announcements</NavLink>
                    <NavLink to="/school-admin/transport" className={navLinkClass}> <FaBus className='text-2xl' />
                        Transport Management</NavLink>
                    <NavLink to="/school-admin/library" className={navLinkClass}> <FaBook className='text-2xl' />
                        Library Management</NavLink>
                    <NavLink to="/school-admin/settings" className={navLinkClass}><GrSettingsOption className='text-2xl' /> Settings</NavLink>
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
                            <Button type='button' variant='contained' color="error" className='flex items-center gap-2 hover:bg-gray-700 p-2 rounded-md'><IoIosLogOut className='text-2xl' />
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
