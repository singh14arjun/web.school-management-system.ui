import { useState } from "react";
import { Link } from "react-router-dom";
import { BiSolidSchool } from "react-icons/bi";
import { FaChalkboardTeacher, FaUserTie, FaMoneyBillWave, FaCalendarAlt } from "react-icons/fa";
import { PiStudent } from "react-icons/pi";
import { MdPersonAdd, MdNotifications, MdAssignment, MdTrendingUp, MdTrendingDown } from "react-icons/md";
import { IoCheckmarkCircle, IoTime } from "react-icons/io5";
import { HiCurrencyRupee } from "react-icons/hi2";
import {
  dashboardStats,
  monthlyRevenue,
  recentActivities,
  upcomingEvents,
  feeOverview,
  todayAttendance,
  classWiseStudents,
  quickActions,
} from "../../data/dashboard";

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

const AdminDashboard = () => {
  const [revenueView] = useState("monthly");

  const activityIcons = {
    student: <PiStudent className="text-blue-500" />,
    payment: <HiCurrencyRupee className="text-emerald-500" />,
    attendance: <IoCheckmarkCircle className="text-blue-500" />,
    staff: <FaUserTie className="text-violet-500" />,
    exam: <MdAssignment className="text-amber-500" />,
    notification: <MdNotifications className="text-yellow-500" />,
  };

  const eventColors = {
    exam: "border-red-400 bg-red-50/60",
    meeting: "border-blue-400 bg-blue-50/60",
    event: "border-emerald-400 bg-emerald-50/60",
    fee: "border-amber-400 bg-amber-50/60",
    holiday: "border-violet-400 bg-violet-50/60",
  };

  const maxStudents = Math.max(...classWiseStudents.map((c) => c.students));

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
          <p className="text-sm text-slate-500">Welcome back! Here&apos;s your school overview.</p>
        </div>
        <div className="flex gap-2">
          {quickActions.slice(0, 3).map((action) => (
            <Link
              key={action.id}
              to={action.path}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-white border border-slate-200 rounded-xl hover:border-blue-300 hover:text-blue-600 hover:shadow-sm transition-all duration-300"
            >
              {action.id === 1 && <MdPersonAdd />}
              {action.id === 2 && <FaMoneyBillWave />}
              {action.id === 3 && <IoCheckmarkCircle />}
              {action.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard
          icon={<BiSolidSchool className="text-2xl text-amber-500" />}
          label="Total Schools"
          value={dashboardStats.totalSchools}
          color={{ bg: "bg-amber-50", text: "text-amber-600" }}
          trend="up" trendValue="2%" delay="delay-1"
        />
        <StatCard
          icon={<PiStudent className="text-2xl text-blue-500" />}
          label="Total Students"
          value={dashboardStats.totalStudents.toLocaleString()}
          color={{ bg: "bg-blue-50", text: "text-blue-600" }}
          trend="up" trendValue="8%" delay="delay-2"
        />
        <StatCard
          icon={<FaChalkboardTeacher className="text-2xl text-indigo-500" />}
          label="Total Teachers"
          value={dashboardStats.totalTeachers}
          color={{ bg: "bg-indigo-50", text: "text-indigo-600" }}
          trend="up" trendValue="4%" delay="delay-3"
        />
        <StatCard
          icon={<FaUserTie className="text-2xl text-violet-500" />}
          label="Total Staff"
          value={dashboardStats.totalStaff}
          color={{ bg: "bg-violet-50", text: "text-violet-600" }}
          trend="up" trendValue="3%" delay="delay-4"
        />
      </div>

      {/* Row 2: Attendance + Fee Overview + Revenue */}
      <div className="grid grid-cols-3 gap-4">
        {/* Today's Attendance */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5 card-hover animate-slide-up delay-3">
          <h3 className="text-lg font-bold text-slate-700 mb-4">Today&apos;s Attendance</h3>
          <div className="flex items-center justify-center mb-4">
            <div className="relative w-32 h-32">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#e2e8f0" strokeWidth="10" />
                <circle
                  cx="50" cy="50" r="40" fill="none" stroke="#3b82f6" strokeWidth="10"
                  strokeDasharray={`${todayAttendance.percentage * 2.51} 251`}
                  strokeLinecap="round"
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-blue-600">{todayAttendance.percentage}%</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-2 p-2 bg-emerald-50 rounded-lg">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <span className="text-slate-600">Present:</span>
              <span className="font-bold text-emerald-600">{todayAttendance.present}</span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-red-50 rounded-lg">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="text-slate-600">Absent:</span>
              <span className="font-bold text-red-600">{todayAttendance.absent}</span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-amber-50 rounded-lg">
              <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
              <span className="text-slate-600">Late:</span>
              <span className="font-bold text-amber-600">{todayAttendance.late}</span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-slate-600">Leave:</span>
              <span className="font-bold text-blue-600">{todayAttendance.onLeave}</span>
            </div>
          </div>
        </div>

        {/* Fee Overview */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5 card-hover animate-slide-up delay-4">
          <h3 className="text-lg font-bold text-slate-700 mb-4">Fee Overview</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-500">Collection Rate</span>
              <span className="text-lg font-bold text-emerald-600">{feeOverview.collectionRate}</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-3">
              <div className="bg-gradient-to-r from-blue-500 to-emerald-500 h-3 rounded-full transition-all duration-1000" style={{ width: feeOverview.collectionRate }}></div>
            </div>
            <div className="space-y-3 mt-4">
              <div className="flex justify-between items-center p-2.5 bg-emerald-50 rounded-lg">
                <span className="text-sm text-slate-600">Collected</span>
                <span className="font-bold text-emerald-600">Rs.{(feeOverview.totalCollected / 100000).toFixed(1)}L</span>
              </div>
              <div className="flex justify-between items-center p-2.5 bg-red-50 rounded-lg">
                <span className="text-sm text-slate-600">Outstanding</span>
                <span className="font-bold text-red-600">Rs.{(feeOverview.outstanding / 100000).toFixed(1)}L</span>
              </div>
              <div className="flex justify-between items-center p-2.5 bg-amber-50 rounded-lg">
                <span className="text-sm text-slate-600">Defaulters</span>
                <span className="font-bold text-amber-600">{feeOverview.defaulters} students</span>
              </div>
            </div>
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5 card-hover animate-slide-up delay-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-slate-700">Monthly Revenue</h3>
            <span className="text-xs text-slate-400 uppercase px-2 py-1 bg-slate-50 rounded-md">{revenueView}</span>
          </div>
          <div className="flex items-end gap-1.5 h-40">
            {monthlyRevenue.map((m) => (
              <div key={m.month} className="flex-1 flex flex-col items-center gap-1 group">
                <div className="w-full flex flex-col items-center gap-0.5" style={{ height: "130px" }}>
                  <div
                    className="w-full bg-blue-200 rounded-t-sm transition-all duration-300 group-hover:bg-blue-500"
                    style={{ height: `${(m.revenue / 520000) * 100}%`, minHeight: "4px" }}
                    title={`Due: Rs.${(m.revenue / 1000).toFixed(0)}K`}
                  ></div>
                </div>
                <span className="text-[10px] text-slate-400 group-hover:text-blue-600 transition-colors">{m.month}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 3: Class-wise + Activities + Events */}
      <div className="grid grid-cols-3 gap-4">
        {/* Class-wise Students */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5 card-hover animate-slide-up delay-5">
          <h3 className="text-lg font-bold text-slate-700 mb-4">Class-wise Students</h3>
          <div className="space-y-2 max-h-72 overflow-y-auto pr-2">
            {classWiseStudents.map((cls) => (
              <div key={cls.class} className="flex items-center gap-3 group">
                <span className="text-xs text-slate-500 w-16 shrink-0 group-hover:text-blue-600 transition-colors">{cls.class}</span>
                <div className="flex-1 bg-slate-100 rounded-full h-5 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-400 to-blue-600 h-full rounded-full flex items-center justify-end pr-2 transition-all duration-500"
                    style={{ width: `${(cls.students / maxStudents) * 100}%` }}
                  >
                    <span className="text-[10px] text-white font-bold">{cls.students}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5 card-hover animate-slide-up delay-6">
          <h3 className="text-lg font-bold text-slate-700 mb-4">Recent Activity</h3>
          <div className="space-y-3 max-h-72 overflow-y-auto pr-2">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 p-2 rounded-lg hover:bg-slate-50 transition-all duration-200">
                <div className="p-2 bg-slate-50 rounded-lg shrink-0 text-lg">
                  {activityIcons[activity.icon]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-700 leading-tight">{activity.message}</p>
                  <div className="flex items-center gap-1 mt-1 text-xs text-slate-400">
                    <IoTime className="text-xs" />
                    {activity.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5 card-hover animate-slide-up delay-7">
          <h3 className="text-lg font-bold text-slate-700 mb-4">Upcoming Events</h3>
          <div className="space-y-3 max-h-72 overflow-y-auto pr-2">
            {upcomingEvents.map((event) => (
              <div key={event.id} className={`p-3 rounded-lg border-l-4 transition-all duration-200 hover:translate-x-1 ${eventColors[event.type]}`}>
                <p className="text-sm font-semibold text-slate-700">{event.title}</p>
                <div className="flex items-center gap-1 mt-1 text-xs text-slate-500">
                  <FaCalendarAlt className="text-xs" />
                  {new Date(event.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Enrollment Stats */}
          <div className="mt-4 pt-4 border-t border-slate-100">
            <h4 className="text-sm font-semibold text-slate-600 mb-2">Enrollment Status</h4>
            <div className="grid grid-cols-2 gap-2">
              <div className="text-center p-2 bg-blue-50 rounded-lg">
                <p className="text-lg font-bold text-blue-600">{dashboardStats.newAdmissions}</p>
                <p className="text-xs text-slate-500">New This Month</p>
              </div>
              <div className="text-center p-2 bg-amber-50 rounded-lg">
                <p className="text-lg font-bold text-amber-600">6</p>
                <p className="text-xs text-slate-500">Pending Review</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;