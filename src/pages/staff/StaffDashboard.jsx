import React from "react";
import { BiSupport } from "react-icons/bi";
import { FaArrowRight, FaForward } from "react-icons/fa";
import {
  MdAutoGraph,
  MdGraphicEq,
  MdLockClock,
  MdSchedule,
  MdSyncLock,
  MdTimer,
} from "react-icons/md";

const StaffDashboard = () => {
  const currentHour = new Date().getHours();

  const message =
    currentHour < 12
      ? "Good Morning 🌞"
      : currentHour >= 12 && currentHour < 17
        ? "Good Afternoon ☀️🌅 🌤️🌤️🌤️"
        : "Good Evening  ☀️🌅 🌙✨🌠";

  const schedule = [
    {
      startTime: "9:00",
      endTime: "10:00",
      subject: "Data Structures and Algorithms",
      class: "CS101",
      room: "Room 101",
    },
    {
      startTime: "10:15",
      endTime: "11:15",
      subject: "Operating Systems",
      class: "CS202",
      room: "Room 204",
    },
    {
      startTime: "11:30",
      endTime: "12:30",
      subject: "Database Systems",
      class: "CS303",
      room: "Room 305",
    },
    {
      startTime: "13:30",
      endTime: "14:30",
      subject: "Computer Networks",
      class: "CS404",
      room: "Room 402",
    },
    {
      startTime: "14:45",
      endTime: "15:45",
      subject: "Software Engineering",
      class: "CS505",
      room: "Room 503",
    },
  ];
  const getCurrentMinutes = () => {
    const now = new Date();
    return now.getHours() * 60 + now.getMinutes();
  };

  const convertToMinutes = (time) => {
    const [hour, minute] = time.split(":").map(Number);
    return hour * 60 + minute;
  };
  const currentTime = getCurrentMinutes();

  return (
    <div>
      <header className="flex flex-col md:flex-row justify-between">
        <div>
          <h1 className="text-2xl text-blue-500">{message} ! Arjun </h1>
          <p>Here's an overview of your academic workspace today.</p>
        </div>
        <div className="flex gap-4">
          <button className="bg-slate-500 p-2 rounded font-semibold">
            View Schedule
          </button>
          <button className="bg-blue-500 p-2 rounded text-white font-semibold">
            View Attendance
          </button>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">
        <div className="flex flex-col gap-5  p-4 rounded bg-gradient-to-r from-blue-100 to-blue-200">
          <div className="flex justify-between items-center">
            <p className="text-gray-600">Next Class</p>
            <MdTimer className="bg-blue-200 text-blue-600 text-4xl p-1 rounded" />
          </div>
          <div>
            <p className="font-bold text-2xl"> 09:00-10:00</p>
            <p className="text-slate-900">Data Structures and Algorithms</p>
          </div>
        </div>
        <div className="flex flex-col gap-5  p-4 rounded bg-gradient-to-r from-blue-100 to-blue-200">
          <div className="flex justify-between items-center">
            <p className="text-gray-600">Attendance rate</p>
            <MdAutoGraph className="bg-blue-200 text-blue-600 text-4xl p-1 rounded" />
          </div>
          <div>
            <p className="font-bold text-2xl">94%</p>
            <div className="w-full bg-gray-500 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: "64%" }}
              ></div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5  p-4 rounded bg-gradient-to-r from-blue-100 to-blue-200">
          <div className="flex justify-between items-center">
            <p className="text-gray-600">Attendance rate</p>
            <MdAutoGraph className="bg-blue-200 text-blue-600 text-4xl p-1 rounded" />
          </div>
          <div>
            <p className="font-bold text-2xl">54%</p>
            <div className="w-full bg-gray-500 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: "54%" }}
              ></div>
            </div>
          </div>
        </div>
      </section>

      <div className="flex gap-5 md:flex-row flex-col mt-10">
        <div className="w-full md:w-2/3">
          <section className="bg-blue-100 p-4 rounded mt-10">
            <div className="bg-blue-200 p-4 rounded flex items-center gap-3">
              <MdSchedule />
              <p>Today's Academic Schedule</p>
            </div>
            <div className="flex flex-col gap-5">
              {schedule.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-5 items-center p-4 bg-white rounded shadow"
                >
                  <p className="font-bold border-r border-gray-300 ">
                    {item.startTime} - {item.endTime}
                    <p className="font-bold text-sm">
                      {(() => {
                        const start = convertToMinutes(item.startTime);
                        const end = convertToMinutes(item.endTime);

                        if (currentTime < start) {
                          return (
                            <span className="text-yellow-500">Upcoming</span>
                          );
                        } else if (currentTime >= start && currentTime <= end) {
                          return (
                            <span className="text-green-500">Ongoing</span>
                          );
                        } else {
                          return (
                            <span className="text-gray-500">Completed</span>
                          );
                        }
                      })()}
                    </p>
                  </p>
                  <p>{item.subject}</p>
                  <p>{item.class}</p>
                  <p>{item.room}</p>
                  <p className="font-bold">
                    {(() => {
                      const start = convertToMinutes(item.startTime);
                      const end = convertToMinutes(item.endTime);

                      if (currentTime < start) {
                        return (
                          <span className="text-yellow-500">Upcoming</span>
                        );
                      } else if (currentTime >= start && currentTime <= end) {
                        return <span className="text-green-500">Ongoing</span>;
                      } else {
                        return <span className="text-gray-500">Completed</span>;
                      }
                    })()}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <div className="mt-10 border-l-10 p-4 border-blue-500 rounded bg-gradient-to-r from-blue-100 to-blue-200">
            <div className="flex justify-between pb-5 font-bold ">
              <p className="text-lg">Upcoming this week</p>
              <p className="text-lg text-blue-600 font-bold">Full Calender</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {schedule.slice(0, 2).map((item, index) => (
                <div
                  key={index}
                  className="flex gap-1 border p-2 rounded bg-white"
                >
                  <p className="font-bold">
                    {item.startTime} - {item.endTime}
                  </p>
                  <p>{item.subject}</p>
                  <p>{item.class}</p>
                  <p>{item.room}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="md:w-1/3">
          <div className="mt-10 flex justify-center">
            <div className="rounded-2xl bg-slate-200 shadow-lg relative overflow-hidden">
              <div className="h-40 w-full bg-gradient-to-r from-blue-700 to-blue-500"></div>

              <div className="absolute top-24 left-1/2 -translate-x-1/2">
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
                  alt="Faculty Profile"
                  className="w-28 h-28 rounded-2xl object-cover border-4 border-white shadow-md"
                />
              </div>

              <div className="mt-20 px-6 pb-6 text-center">
                <p className="font-bold text-xl text-gray-900">Dogesh Bhai</p>
                <p className="text-gray-600 text-sm mt-1">Senior Lecturer</p>

                <div className="bg-white rounded-xl p-4 mt-5 text-left shadow-sm">
                  <p className="text-xs text-gray-500 font-semibold tracking-wide">
                    DEPARTMENT
                  </p>
                  <p className="font-semibold text-gray-800 mt-1">
                    Computer Science
                  </p>
                  <p className="text-gray-600 text-sm">
                    Faculty of Engineering
                  </p>
                </div>

                <div className="bg-white rounded-xl p-4 mt-4 text-left shadow-sm">
                  <p className="text-xs text-gray-500 font-semibold tracking-wide">
                    EXPERIENCE
                  </p>
                  <p className="font-semibold text-gray-800 mt-1">
                    5 years of teaching experience in Computer Science
                  </p>
                </div>

                {/* Subjects */}
                <div className="bg-white rounded-xl p-4 mt-4 text-left shadow-sm">
                  <p className="text-xs text-gray-500 font-semibold tracking-wide">
                    PRIMARY SUBJECTS
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="px-3 py-1 text-sm bg-slate-200 rounded-md">
                      DSA
                    </span>
                    <span className="px-3 py-1 text-sm bg-slate-200 rounded-md">
                      Operating Systems
                    </span>
                    <span className="px-3 py-1 text-sm bg-slate-200 rounded-md">
                      Database Systems
                    </span>
                    <span className="px-3 py-1 text-sm bg-slate-200 rounded-md">
                      Computer Networks
                    </span>
                    <span className="px-3 py-1 text-sm bg-slate-200 rounded-md">
                      Software Engineering
                    </span>
                  </div>
                </div>

                {/* Button */}
                <div className="mt-5 border border-blue-600 text-blue-600 py-2 rounded-lg cursor-pointer hover:bg-blue-600 hover:text-white transition">
                  Edit Faculty Profile
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 bg-white rounded mt-10 shadow">
            <div className="flex  justify-between items-center gap-3 font-bold text-lg mb-4">
              <BiSupport className="text-blue-500 text-2xl" />
              <p>Faculty Support</p>
            </div>
            <p>
              Need help with the portal or classroom equipment? Academic IT is
              available until 18:00.
            </p>
            <p className="text-blue-600 flex items-center gap-2 mt-4 font-bold cursor-pointer">
              Contact Support <FaArrowRight />{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;
