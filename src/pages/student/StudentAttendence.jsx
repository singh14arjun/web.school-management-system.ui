import React from "react";
import StudentProfile from "../students/StudentProfile";
import { PiStudentFill } from "react-icons/pi";
import { MdCancel, MdLeakRemove } from "react-icons/md";
import { BiCheck } from "react-icons/bi";

const StudentAttendence = () => {
  const totalAttendence = 90;
  const [currentDate, setCurrentDate] = React.useState(new Date());

  const absentList = [14, 18];

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

    const isToday =
      d === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear();

    if (dayOfWeek === 0) {
      border = "border-blue-500"; // Sunday
      bg = "bg-blue-100"; // Sunday
      status = "Sunday";
    } else if (absentList.includes(d)) {
      border = "border-red-500"; // Absent
      bg = "bg-red-100"; // Absent
      status = "Absent";
    } else {
      border = "border-green-500";
      bg = "bg-green-100"; // Absent
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
    if (isToday) {
      border = "border-purple-500";
      bg = "bg-purple-200";
      status = "Today";
    }
    days.push({ day: d, bg, border, status });
  }

  const totalPresent = 25;
  const totalAbsent = 5;
  const totalDays = totalPresent + totalAbsent;

  const presentPercent = (totalPresent / totalDays) * 100;

  const totalOverall = 35 + 15;
  const overallPercent = (35 / totalOverall) * 100;
  return (
    <div className="flex flex-col gap-6">
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
        <h2 className="text-lg font-semibold mb-3">Attendance Calendar</h2>

        <div className="grid grid-cols-7 gap-1 text-center font-semibold mb-2 ">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div
              key={d}
              className="bg-amber-200  rounded h-10 md:h-20 flex justify-center items-center"
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
                className={`h-10 md:h-20 flex flex-col items-center justify-center rounded text-black font-bold ${item.bg} border-l-8 border ${item?.border} rounded-lg`}
              >
                <p className="text-lg">{item.day}</p>
                <p className="text-black/50 font-semibold text-sm">
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
            {" "}
            <p className="bg-green-600 w-3 h-3 animate-pulse rounded-2xl"></p>
            Present
          </span>
          <span className="flex items-center gap-2">
            <p className="bg-red-600 w-3 h-3 animate-pulse rounded-2xl"></p>
            Absent
          </span>
          <span className="flex items-center gap-2">
            <p className="bg-blue-600 w-3 h-3 animate-pulse rounded-2xl"></p>
            Sunday Holiday
          </span>
        </div>

        <div className="flex justify-between items-center my-4">
          <button
            onClick={() => setCurrentDate(new Date(year, month - 1, 1))}
            className="px-3 py-1 bg-red-200 rounded border border-red-600"
          >
            Prev
          </button>

          <h2 className="text-lg font-semibold">
            {currentDate.toLocaleString("default", {
              month: "long",
            })}{" "}
            {year}
          </h2>

          <button
            onClick={() => setCurrentDate(new Date(year, month + 1, 1))}
            className="px-3 py-1 bg-green-200 rounded border border-green-600"
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
};

export default StudentAttendence;
