import React from "react";
import {
  BiDownload,
  BiEdit,
  BiLocationPlus,
  BiPhoneCall,
} from "react-icons/bi";
import { IoCall } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { students } from "../../data/students";
const StudentProfile = () => {
  const clubs = ["Debate Club", "Robotics", "Varsity Swim", "Annual Function"];

  console.log("Student : ", students);

  return (
    <div>
      <section className="p-4 flex flex-row justify-between gap-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div>
            <img
              src="https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"
              alt="Profile"
              className="rounded-2xl w-50 h-50 object-cover "
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-semibold uppercase text-blue-600 text-xl">
              Student Roll Number: 12345
            </p>
            <p className="flex items-center  gap-2 text-6xl font-bold text-gray-800">
              {students?.feeStatus}
              <p className="bg-green-600 font-bold  rounded-full w-3 h-3 animate-pulse"></p>
              <p className="bg-red-600 font-bold  rounded-full w-3 h-3 animate-pulse"></p>
            </p>
            <div className="flex  gap-2 mt-2">
              <p className="bg-blue-400 font-bold px-2 rounded-2xl">
                Class: 10th Grade
              </p>
              <p className="bg-cyan-400 font-bold px-2 rounded-2xl">
                Section: A
              </p>

              <p className="bg-gray-400 font-bold px-2 rounded-2xl">
                Room No : 1-201
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-5 h-fit">
          <p className="flex items-center gap-2 bg-amber-100 text-amber-800 px-2 py-1 rounded font-bold hover:bg-amber-200 cursor-pointer">
            <BiDownload />
            Transcript
          </p>
          <p className="flex items-center gap-2 bg-blue-600 text-white px-2 py-1 rounded font-bold hover:bg-blue-700 cursor-pointer">
            <BiEdit />
            Edit Profile
          </p>
        </div>
      </section>
      <section className="mt-6 grid grid-cols-12  gap-10 p-4">
        <div className="bg-white col-span-12 lg:col-span-4 grid p-4 rounded-lg shadow">
          <p className="text-2xl font-semibold text-slate-800">
            Contact Details
          </p>
          <div className="flex items-center gap-2">
            <MdEmail className="text-blue-600 text-2xl" />
            <div className="flex flex-col gap-0.5">
              <p className="text-black/50 font-semibold">Academic Email: </p>
              <p className="font-bold">arjun.singh@school.com</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <BiPhoneCall className="text-blue-600 text-2xl" />
            <div className="flex flex-col gap-0.5">
              <p className="text-black/50 font-semibold">Academic Phone: </p>
              <p className="font-bold">+91 9876543210</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <BiLocationPlus className="text-blue-600 text-2xl" />
            <div>
              <p className="text-black/50 font-semibold">Residencial Address</p>
              <p className="font-bold">123 School Street, City, State</p>
            </div>
          </div>
        </div>
        <div className="bg-white col-span-12 lg:col-span-8 p-4 rounded-lg shadow">
          <p className="text-2xl pb-4 text-slate-800 font-semibold">
            Parent / Guardian Details
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
            <div className="bg-slate-400 p-4 rounded-lg flex gap-5">
              <div>
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="loading"
                  className="w-30 h-30 rounded-2xl"
                />
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-bold">John Doe</p>
                <p className="font-semibold">Father / Engineer</p>
                <p className="flex items-center gap-2">
                  <IoCall className="text-blue-600" />
                  +91 9876543210
                </p>
                <p className="flex items-center gap-2">
                  <MdEmail className="text-blue-600" />
                  john.doe@domain.com
                </p>
              </div>
            </div>
            <div className="bg-slate-400 p-4 rounded-lg gap-5 flex ">
              <div>
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="loading"
                  className="w-30 h-30 rounded-2xl"
                />
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-bold">Jane Doe</p>
                <p className="font-semibold">Mother / Teacher</p>
                <p className="flex items-center gap-2">
                  <IoCall className="text-blue-600" />
                  +91 9876543210
                </p>
                <p className="flex items-center gap-2">
                  <MdEmail className="text-blue-600" />
                  jane.doe@domain.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-10 p-4">
        <div className="bg-slate-300 p-4 rounded-2xl">
          <p className="font-bold">Attendence Rate</p>
          <p className="text-4xl font-bold pt-4">{(90 * 100) / 120} %</p>
        </div>
        <div className="bg-slate-300 p-4 rounded-2xl">
          <p className="font-bold">Clubs and Societies</p>

          <div className="flex flex-wrap gap-2">
            {clubs.map((club, index) => (
              <p
                key={index}
                className="bg-gray-700 px-4 py-1 rounded-2xl text-white"
              >
                {club}
              </p>
            ))}
          </div>
        </div>
        <div className="bg-slate-300 p-4 rounded-2xl">
          <p className="mb-2 font-semibold">Pending Task</p>

          <div className="w-full h-2 bg-gray-600 rounded-full">
            <div
              className="h-2 bg-green-600 rounded-full"
              style={{ width: `${(10 / 16) * 100}%` }}
            ></div>
          </div>

          <p className="mt-2 text-sm text-gray-900">12/16</p>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
