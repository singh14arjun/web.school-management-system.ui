import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { Button, Avatar, Chip } from '@mui/material'
import { schools } from '../../data/schools'
import { GiFamilyHouse, GiMailbox, GiTeacher } from 'react-icons/gi'
import { MdMail } from 'react-icons/md'
import { BiEdit, BiHappy } from 'react-icons/bi'
import { PiStudent } from 'react-icons/pi'
import { address } from '../../data/address'
const SchoolProfile = () => {
    const { schoolId } = useParams();
    const school = schools.find((s) => s.id === schoolId);
    console.log(school);
    console.log(address);

    const schoolAddress = Object.values(address).filter((a) => a.id === school?.addressId);
    console.log("address", schoolAddress);

    const getBgColor = (type) => {
        switch (type) {
            case 'Primary': return 'bg-blue-200';
            case 'Secondary': return 'bg-emerald-200';
            case 'Higher Secondary': return 'bg-violet-200';
            case 'Senior Secondary': return 'bg-gray-200';
            case 'K-12': return 'bg-amber-200';
            default: return 'bg-violet-200';
        }
    };
    return (
        <div>


            <div className="flex flex-col gap-10">
                <section className='p-4 flex justify-between gap-10'>
                    <div className="flex items-center gap-4">
                        <Avatar
                            src={school.schoolLogo || "https://via.placeholder.com/40"}
                            variant="rounded"
                            sx={{ width: 100, height: 100 }}
                        />

                        <div>
                            <h1 className="text-2xl font-bold">{school.schoolName}</h1>
                            <p className="text-gray-600">{school.schoolCode}</p>
                            <p>Excellence in Classical Education since {school?.establishedYear || "2002"}</p>
                        </div>
                        <div>
                            {school.isActive ? (
                                <Chip label="Active" color="success" />
                            ) : (
                                <Chip label="Inactive" color="error" />
                            )}
                        </div>
                    </div>
                    <div className='flex gap-2 h-fit'>
                        <button className='bg-gray-500 hover:bg-gray-600 cursor-pointer text-white px-4 py-2 rounded-lg flex items-center gap-2 '><MdMail /> Contact Principal</button>
                        <button className='bg-blue-500 hover:bg-blue-600 cursor-pointer text-white px-4 py-2 rounded-lg flex items-center gap-2 '><BiEdit />Edit School</button>
                    </div>
                </section>

                <section className="grid grid-cols-3 gap-10">

                    <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-4">

                        <div className="flex justify-between items-start">
                            <div className="bg-blue-100 p-3 rounded-xl text-blue-600 text-xl">
                                <PiStudent />
                            </div>
                            <span className="text-green-600 text-sm font-semibold">↗ 2.4%</span>
                        </div>

                        <p className="text-gray-500 text-sm font-medium">STUDENTS ATTENDANCE</p>

                        <h2 className="text-3xl font-bold text-gray-800">
                            {Math.round(((school.totalStudents - 10) / school.totalStudents) * 100)}%
                        </h2>

                        <div className="w-full h-2 bg-gray-200 rounded-full">
                            <div
                                className="h-2 bg-blue-500 rounded-full"
                                style={{
                                    width: `${((school.totalStudents - 10) / school.totalStudents) * 100}%`
                                }}
                            />
                        </div>

                    </div>

                    <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-4">

                        <div className="flex justify-between items-start">
                            <div className="bg-purple-100 p-3 rounded-xl text-purple-600 text-xl">
                                <GiTeacher />
                            </div>
                            <span className="text-green-600 text-sm font-semibold">↗ 1.2%</span>
                        </div>

                        <p className="text-gray-500 text-sm font-medium">TEACHERS ATTENDANCE</p>

                        <h2 className="text-3xl font-bold text-gray-800">
                            {Math.round(((school.totalTeachers - 10) / school.totalTeachers) * 100)}%
                        </h2>

                        <div className="w-full h-2 bg-gray-200 rounded-full">
                            <div
                                className="h-2 bg-purple-500 rounded-full"
                                style={{
                                    width: `${((school.totalTeachers - 10) / school.totalTeachers) * 100}%`
                                }}
                            />
                        </div>

                    </div>
                    <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-4">

                        <div className="flex justify-between items-start">
                            <div className="bg-yellow-100 p-3 rounded-xl text-yellow-600 text-xl">
                                <BiHappy />
                            </div>
                            <span className="text-green-600 text-sm font-semibold">↗ 1.2%</span>
                        </div>

                        <p className="text-gray-500 text-sm font-medium">FACILITIES</p>

                        <h2 className="text-3xl font-bold text-gray-800">
                            95%
                            {/* {Math.round(((school?.totalFacilities - 10) / school?.totalFacilities) * 100)}% */}
                        </h2>

                        <div className="w-full h-2 bg-gray-200 rounded-full">
                            <div
                                className="h-2 bg-yellow-500 rounded-full"
                                style={{
                                    width: `95%`
                                }}
                            />
                        </div>

                    </div>
                </section>

                <section className='flex gap-10 mt-10'>
                    <div className='w-2/3 flex flex-col gap-5'>
                        <div className='flex flex-col gap-5'>
                            <div className='border-l-5 border-blue-500 pl-2 text-xl font-semibold'>Institutional Information</div>
                            <div className='bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-4'>
                                <div className='flex justify-between'>
                                    <div>
                                        <p className='text-lg font-semibold'>Address</p>

                                        <p>{schoolAddress[0]?.street}, {schoolAddress[0]?.city}, {schoolAddress[0]?.state}, {schoolAddress[0]?.pincode}</p>
                                    </div>
                                    <div>
                                        <p className='text-lg font-semibold'>Website</p>
                                        <p className='text-sm text-blue-400 underline font-medium'>{school?.website || "Not Available"}</p>
                                    </div>
                                </div>
                                <div className='flex justify-between'>
                                    <div>

                                        <p className='text-lg font-semibold'>Founded Year</p>
                                        <p className='text-sm text-blue-600 font-medium'>{school?.establishedYear || "Not Available"}</p>
                                    </div>
                                    <div>
                                        <p className='text-lg font-semibold'>Medium</p>
                                        <p className='text-sm text-blue-600 font-medium'>{school?.medium}</p>
                                    </div>
                                    <div>
                                        <p className='text-lg font-semibold'>Label</p>
                                        <p className='text-sm text-blue-600 font-medium'>{school?.label}</p>
                                    </div>
                                    <div className={`p-2 rounded-lg ${getBgColor(school?.type)}`}>
                                        <p className='text-lg font-semibold'>Type</p>
                                        <p className='text-sm text-blue-600 font-medium'>{school?.type}</p>
                                    </div>

                                </div>

                            </div>
                        </div>
                        <div>
                            <div className='border-l-5 border-blue-500 pl-2 text-xl font-semibold'>Acdemic Breakdown</div>
                            <div className='grid grid-cols-4 gap-4 bg-white rounded-2xl shadow-sm p-6 flex-col gap-4'>
                                <div className='flex flex-col gap-1 bg-blue-100 p-2 rounded-lg'>
                                    <p className='text-2xl text-blue-500 font-bold'>{school?.totalStudents}</p>
                                    <p className='text-sm text-gray-500 font-medium'>Total Students</p>
                                </div>
                                <div className='flex flex-col gap-1 bg-blue-100 p-2 rounded-lg'>
                                    <p className='text-2xl text-blue-500 font-bold'>{school?.totalTeachers}</p>
                                    <p className='text-sm text-gray-500 font-medium'>Total Teachers</p>
                                </div>
                                <div className='flex flex-col gap-1 bg-blue-100 p-2 rounded-lg'>
                                    <p className='text-2xl text-blue-500 font-bold'>1:
                                        {school?.totalStudents / school?.totalTeachers}
                                    </p>
                                    <p className='text-sm text-gray-500 font-medium'>Ration</p>
                                </div>
                                <div className='flex flex-col gap-1 bg-blue-100 p-2 rounded-lg'>
                                    <p className='text-2xl text-blue-500 font-bold'>{school?.totalFacilities}</p>
                                    <p className='text-sm text-gray-500 font-medium'>Total Facilities</p>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col gap-5'>
                            <div className='border-l-5 border-blue-500 pl-2 text-xl font-semibold'>campuse Gallery</div>
                            <div className="grid grid-cols-2 gap-3">
                                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2cUHHbMER9Yj0IE2Qxb4Y3zDaDb5nMsvqBxwX0DZVkwJ-ersp5EQOvqOMivcNrifrt0pLbQnDpOe6QjarzzuU7wux9MSS8C44GmxMEeTcb3dxpOXK4r09X6mhuX1nrKa5ALhwplGPGTRHYzkU9JNUwhWKekPkXw63Rmo7wzSoyghpB19waM6pG6CrKuogGg4ahAcf82gGtDwFzpn7NirxAq7DrnXOoJ2vYaHi7Kmn6QsIYiKGFH3tYDn6EZvR0W27viKNcbxmUB4" alt=""
                                    className='rounded-lg border-4 border-blue-100 w-full h-50 object-cover grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer'
                                />
                                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCllc1W6uheiksCcOpapgC5wTj2uBeSCaX0lCBQP69q0xPxy9jb0zdFA62of6DKgd95BVCkeGHFvxKu5TLS-TSTOeKZRqxfJMdaIeADK-qmduJE1JdFdA6INuSg01ocOxjfIvjX45irnXXt3ovEEHc5pBaEYta96IX08r-1iw54jLSUZkSvla_n916uegc_iTWQkltp_utGMYcz4IcN3LAz1xDXZ0laHJ5Pz5-6Z5Dke5TlpE0TU0wnuaV3upGc-F0BDGuWd4a5fUo" alt=""
                                    className='rounded-lg border-4 border-blue-100 w-full h-50 object-cover grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer'
                                />
                                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDj_9fKL4bUGHpnEy2BpyFf4HxtkIZ1I11CFeSW2CXbZAOJZXKjNv5QlSAWwild5BXfemsZVoC1_-Dd8TBBiSnCdwlYMn0gbB80LVEMCC-_TOxnx765c4ywMLXrLFHERUB4X03A73fRzssH4Px8nbNCk8gvCzCOF3i4N4tyWZwfD9roHO_cR_8nN5892Hrin64tFdpWBaO87_A9PLbo39MoOrhxqQD2z_fo79Ka2lgdWSOxTgwXrB0ZYM04OZAOV08eFWz1bgg1tF0" alt=""
                                    className='rounded-lg border-4 border-blue-100 w-full h-50 object-cover grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer'
                                />
                                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMKXfw-L5ZEX7GfjQP7YFfD9c6EFqJ5TjZrQhoQYDnih6YhCiCjpfWXJW0jTqKT0LVXYylmqxbIqVDn_YjBkIGNDF872j9YMO506Al8kkoLTkWLppYSeIhrBMIsTBeP3W34xicy8A5QUQ3O66KAYRLfyQJpF_3SQiit72h_SuhskvJa43atlgfRy8vRugvVS2PJ8eAxOD3IiRrhYe1svnL6TSpnsXxD5zJu9drCyyapw6Ka8Kmlnp0m-mJ7gRSRVpkXG2eWuLDU0g" alt=""
                                    className='rounded-lg border-4 border-blue-100 w-full h-50 object-cover grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer'
                                />
                            </div>

                        </div>
                    </div>



                    <div className="flex flex-col gap-4 w-1/3 bg-white rounded-2xl shadow-sm p-6 h-fit items-center">
                        <div className="relative">
                            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBlH0rVQkrJypYjCX4i-ymQbQ0NxEsSW2Nf1CaYC56vMOzHQ8nKwDv5tGSi7RQyYI3T2iXtDb45VqpD43MsL3ojDZ25Vw0jC8OoUYsNRiULxQTvVNY9qQFezw63o8LPpKZ0nbCZKAM4UegA0eM5-07J-sqC7hQdzZe_IsSqNpYD3utF3ZGgE7DEHkenf6LFlR2EvXuwiZhLWq8fTEja5E6aMYF3ZWh3V9LvjZ2D7jLPSoaZhDt99NDEhkdO4j3N7j7MJQsLBbP9YfE" alt=""
                                className='rounded-full border-4 border-blue-100 w-40 h-40 object-cover'
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className='text-xl font-bold'>Dr. Lenora Vance</p>
                            <p className='text-blue-500 text-sm font-bold'>Principal & Head of Academics</p>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex flex-col gap-1">
                                <p className="text-gray-500 text-sm font-medium">Tenure</p>
                                <p className='text-xl font-semibold'>12 Years</p>
                            </div>
                            <div className="flex flex-col gap-1">
                                <p className="text-gray-500 text-sm font-medium">Experience</p>
                                <p className='text-xl font-semibold'>28 Years</p>
                            </div>
                        </div>
                        <div>Dr. Vance has pioneered the "Digital-First Humanity" curriculum at St. Andrews. Under her leadership, the institution has seen a 40% increase in STEM enrollments while maintaining its heritage in classical linguistics.</div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default SchoolProfile