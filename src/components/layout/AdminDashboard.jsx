import React from "react";
import { dashboardStats } from "../../data/dashboard";
import { MdAdd, MdAnnouncement, MdPersonAdd, MdTrendingDown, MdTrendingUp } from "react-icons/md";
import { FaChalkboardTeacher, FaMoneyBillWave, FaUserTie } from "react-icons/fa";
import { BiSolidSchool } from "react-icons/bi";
import { PiStudent } from "react-icons/pi";
import { IoCheckmarkCircle } from "react-icons/io5";
import { Link } from "react-router-dom";
const AdminDashboard = () => {

  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) {
      return "Good Morning ";
    } else if (hour < 17) {
      return "Good Afternoon ";
    } else {
      return "Good Evening ";
    }
  }

  const StatCard = ({ icon, label, value, color, trend, trendValue, delay }) => (
    <div className={`bg-white rounded-xl border border-slate-100 shadow-sm card-hover p-5 animate-slide-up ${delay}`}>
      <div className="flex justify-between items-start">
        <div className={`p-2.5 rounded-xl ${color.bg}`}>{icon}</div>
        {trend && (
          <div className={`flex items-center gap-0.5 text-xs font-semibold px-2 py-1 rounded-full ${trend === "up" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"}`}>
            {trend === "up" ? <MdTrendingUp /> : <MdTrendingDown />}
            {trendValue}
          </div>
        )}
      </div>
      <div className="mt-3">
        <p className="text-sm text-slate-500 font-medium">{label}</p>
        <p className={`text-2xl font-bold mt-0.5 ${color.text}`}>{value}</p>
      </div>
    </div>
  );
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-2xl font-bold text-black">{getGreeting()}<span className="text-blue-500">Arjun</span></p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-white/10 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300 cursor-pointer"><MdAnnouncement /> Global Annoucement</button>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-white/10 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300 cursor-pointer"><MdAdd size={20} /> Add New School</button>
        </div>
      </div>




      <div className="grid grid-cols-4 gap-4">
        <StatCard
          icon={<BiSolidSchool className="text-2xl text-amber-500" />}
          label="School Code"
          value={0}
          color={{ bg: "bg-amber-50", text: "text-amber-600" }}
          delay="delay-1"
        />
        <StatCard
          icon={<PiStudent className="text-2xl text-blue-500" />}
          label="Total Students"
          value={6}
          color={{ bg: "bg-blue-50", text: "text-blue-600" }}
          trend="up" trendValue="8%" delay="delay-2"
        />
        <StatCard
          icon={<FaChalkboardTeacher className="text-2xl text-indigo-500" />}
          label="Total Teachers"
          value={10}
          color={{ bg: "bg-indigo-50", text: "text-indigo-600" }}
          trend="up" trendValue="4%" delay="delay-3"
        />
        <StatCard
          icon={<FaUserTie className="text-2xl text-violet-500" />}
          label="Total Staff"
          value={10}
          color={{ bg: "bg-violet-50", text: "text-violet-600" }}
          trend="up" trendValue="3%" delay="delay-4"
        />
      </div>
    </div>
  );
};

export default AdminDashboard;