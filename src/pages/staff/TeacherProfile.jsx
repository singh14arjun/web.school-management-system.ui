import React from "react";
import { FaSchool } from "react-icons/fa6";
import { HiHome } from "react-icons/hi";
import { IoCall } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { PiRowsFill } from "react-icons/pi";

const TeacherProfile = () => {
  return (
    <div>
      <section className="flex gap-10">
        <div className="w-1/3">
          <div className="bg-blue-200 w-90 h-90 relative rotate-3 hover:rotate-6 rounded-2xl"></div>
          <img
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGVhY2hlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
            alt="Teacher Profile"
            className="w-82 h-82 rounded object-cover absolute top-4 left-4 "
          />
          <div></div>
          <div></div>
        </div>
        <div className="w-2/3">
          <div className="flex flex-col gap-2">
            <p className="text-xl font-semibold">Senior Faculty</p>
            <p className="text-4xl font-bold">prof John Doe </p>
            <p className="text-xl font-bold text-black/50 flex items-center gap-2">
              <div className="bg-blue-600 w-2 h-2 rounded-full"></div>
              Department of Computer Science{" "}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10 justify-between">
            <div className="bg-blue-200 p-4 rounded-2xl">
              <div>
                <PiRowsFill />
                <p>10 years</p>
                <p>Teaching Experience</p>
              </div>
              <div>Longevity</div>
            </div>
            <div className="bg-blue-200 p-4 rounded-2xl">
              <div>
                <PiRowsFill />
                <p>10 years</p>
                <p>Teaching Experience</p>
              </div>
              <div>Longevity</div>
            </div>
            <div className="bg-blue-200 p-4 rounded-2xl">
              <div>
                <PiRowsFill />
                <p>10 years</p>
                <p>Teaching Experience</p>
              </div>
              <div>Longevity</div>
            </div>
          </div>
        </div>
      </section>
      <section className="mt-10 flex gap-5">
        <div className="w-2/3">
          <div className="flex items-center gap-2 text-2xl font-bold mb-4">
            <div className="w-10 h-2 bg-blue-600"></div> Academic Background
          </div>
          <p className="font-semibold text-black/80">
            "Mathematics is not just about numbers, equations, or algorithms:
            it's about understanding the logic that structures our reality. My
            goal is to transform abstract theories into tangible tools that
            students can use to solve real-world problems."
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-4">
            <div className="flex gap-2 bg-white p-2 rounded  items-center">
              <MdEmail className="bg-blue-600 text-4xl p-1 rounded text-white" />
              <div className="flex flex-col gap-1">
                <p>Institutional Email</p>
                <p>123 Main Street, Cityville</p>
              </div>
            </div>
            <div className="flex gap-2 bg-white p-2 rounded  items-center">
              <FaSchool className="bg-blue-600 text-4xl p-1 rounded text-white" />
              <div className="flex flex-col gap-1">
                <p>Office Location</p>
                <p>123 Main Street, Cityville</p>
              </div>
            </div>
            <div className="flex gap-2 bg-white p-2 rounded  items-center">
              <HiHome className="bg-blue-600 text-4xl p-1 rounded text-white" />
              <div className="flex flex-col gap-1">
                <p>Residential Address</p>

                <p>123 Main Street, Cityville</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/3">
          <div className="bg-blue-200 rounded p-4 gap-5 flex flex-col">
            <p className="text-lg font-bold">Department Contact</p>
            <p className="flex items-center gap-2">
              <IoCall /> 123-456-7890
            </p>
            <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
              Download CV
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TeacherProfile;
