import React from "react";
import { BiCheck } from "react-icons/bi";
import { MdCancel } from "react-icons/md";
import { PiStudentFill } from "react-icons/pi";

const StaffAttendance = () => {
  const totalAttendance = 88;
  const [currentDate, setCurrentDate] = React.useState(new Date());

  const absentList = [5, 9, 18];

  const staffList = [
    { name: "Mr. Sharma", role: "Math Teacher" },
    { name: "Ms. Iyer", role: "Science Teacher" },
    { name: "Mr. Khan", role: "Admin" },
  ];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const today = new Date();

  const days = [];

  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const dayOfWeek = new Date(year, month, d).getDay();

    let border = "border-gray-200";
    let bg = "bg-gray-200";
    let status;

    if (dayOfWeek === 0) {
      border = "border-blue-500";
      bg = "bg-blue-100";
      status = "Sunday";
    } else if (absentList.includes(d)) {
      border = "border-red-500";
      bg = "bg-red-100";
      status = "Absent";
    } else {
      border = "border-green-500";
      bg = "bg-green-100";
      status = "Present";
    }

    const isFuture =
      year === today.getFullYear() &&
      month === today.getMonth() &&
      d > today.getDate();

    if (isFuture) {
      border = "border-gray-500";
      bg = "bg-gray-100";
      status = "";
    }

    days.push({ day: d, border, bg, status });
  }

  const totalPresent = 22;
  const totalAbsent = 3;
  const totalDays = totalPresent + totalAbsent;

  const presentPercent = (totalPresent / totalDays) * 100;

  return (
    <div className="flex flex-col gap-6">
      {/* 🔹 Header Stats */}
      <header className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-blue-600 text-sm font-semibold">
              DAILY OPERATIONS
            </p>
            <h1 className="text-3xl font-bold">Mark Daily Attendance</h1>
          </div>

          {/* <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl shadow">
                 <button
                   onClick={() =>
                     setCurrentDate(new Date(year, month, currentDate.getDate() - 1))
                   }
                 >
                   ◀
                 </button>
     
                 <p className="font-medium">{currentDate.toDateString()}</p>
     
                 <button
                   onClick={() =>
                     setCurrentDate(new Date(year, month, currentDate.getDate() + 1))
                   }
                 >
                   ▶
                 </button>
               </div> */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          <div className="bg-gray-100 p-5 rounded-2xl flex flex-col gap-4">
            <div className="flex gap-5">
              <p className="text-sm text-gray-500">Class 9th</p>
              <p className="text-sm text-gray-500">Section B</p>
            </div>
          </div>

          <div className="flex  justify-between items-center bg-white p-5 rounded-2xl shadow border-l-4 border-blue-600">
            <div>
              <p className="text-gray-500">TOTAL ATTENDENCE</p>
              <p className="text-3xl font-bold">32</p>
            </div>
            <PiStudentFill className="bg-blue-200 text-4xl rounded p-1 text-blue-600" />
          </div>

          {/* 🔹 Present */}
          <div className="flex justify-between  items-center bg-white p-5 rounded-2xl shadow border-l-4 border-green-500">
            <div>
              <p className="text-gray-500">TOTAL PRESENT</p>
              <p className="text-3xl font-bold text-blue-600">28</p>
            </div>
            <BiCheck className="bg-green-200 text-4xl p-1 rounded text-green-600" />
          </div>

          {/* 🔹 Absent */}
          <div className="flex justify-between items-center bg-white p-5 rounded-2xl shadow border-l-4 border-red-500">
            <div>
              <p className="text-gray-500">TOTAL ABSENT</p>
              <p className="text-3xl font-bold text-red-600">04</p>
            </div>
            <MdCancel className="bg-red-200 text-4xl p-1 rounded text-red-600" />
          </div>
        </div>
      </header>

      <main className="bg-white p-4 rounded-2xl">
        <h2 className="text-lg font-semibold mb-3">
          Staff Attendance Calendar
        </h2>

        {/* Days Header */}
        <div className="grid grid-cols-7 gap-1 text-center font-semibold mb-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div
              key={d}
              className="bg-gray-400 h-10 md:h-20 flex justify-center items-center rounded"
            >
              {d}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {days.map((item, i) =>
            item ? (
              <div
                key={i}
                className={`h-10 md:h-20 flex flex-col items-center justify-center rounded-lg font-bold ${item.border} border-l-8 border ${item.bg} `}
              >
                <p className="text-lg">{item.day}</p>
                <p className="text-sm font-semibold text-black/50">
                  {item?.status}
                </p>
              </div>
            ) : (
              <div key={i}></div>
            ),
          )}
        </div>

        <div className="flex gap-4 mt-4 text-sm">
          <span className="flex items-center gap-2">
            <div className="bg-green-500 w-3 h-3 rounded"></div>
            Present
          </span>
          <span className="flex items-center gap-2">
            <div className="bg-red-500 w-3 h-3 rounded"></div>
            Absent
          </span>
          <span className="flex items-center gap-2">
            <div className="bg-blue-500 w-3 h-3 rounded"></div>
            Sunday
          </span>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-5">
          <button
            onClick={() => setCurrentDate(new Date(year, month - 1, 1))}
            className="px-3 py-1 bg-red-200 rounded"
          >
            Prev
          </button>

          <h2 className="font-bold">
            {currentDate.toLocaleString("default", {
              month: "long",
            })}{" "}
            {year}
          </h2>

          <button
            onClick={() => setCurrentDate(new Date(year, month + 1, 1))}
            className="px-3 py-1 bg-green-200 rounded"
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
};

export default StaffAttendance;
