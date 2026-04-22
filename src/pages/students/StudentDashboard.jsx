import React from "react";
import {
  BiArrowBack,
  BiArrowFromRight,
  BiArrowToLeft,
  BiArrowToRight,
  BiListCheck,
  BiRightArrow,
  BiStar,
} from "react-icons/bi";
import { GiCash } from "react-icons/gi";
import { HiCash } from "react-icons/hi";
import { IoMdArrowRoundForward } from "react-icons/io";
import { PiExam } from "react-icons/pi";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
const StudentDashboard = () => {
  const attendanceData = [
    { month: "Jan", attendance: 78 },
    { month: "Feb", attendance: 98 },
    { month: "Mar", attendance: 80 },
    { month: "April", attendance: 68 },
    { month: "May", attendance: 92 },
    { month: "June", attendance: 52 },
    { month: "July", attendance: 82 },
    { month: "Aug", attendance: 72 },
    { month: "Sep", attendance: 92 },
    { month: "Oct", attendance: 96 },
    { month: "Nov", attendance: 90 },
    { month: "Dec", attendance: 75 },
  ];

  const currentMonth = new Date().toLocaleString("en-US", {
    month: "short",
  }); // e.g. "Apr"

  const maxAttendance = Math.max(
    ...attendanceData.map((item) => item.attendance),
  );
  return (
    <div>
      <header>
        <p className="font-bold text-3xl">Good Morning , Alex</p>
        <p className="font-semibold text-lg text-black/70">
          Here is an overview of your academic performance and upcoming tasks.
        </p>
      </header>
      <section className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
        <div className="bg-white rounded-2xl p-4 flex flex-col gap-4">
          <div className="flex justify-between">
            <BiListCheck className="bg-blue-100 text-blue-600 text-4xl rounded p-1" />
            <p className="bg-green-100 text-sm text-center px-1 rounded h-fit font-bold text-green-600">
              +1.2%
            </p>
          </div>
          <div>
            <p className="text-2xl font-bold">Attendence</p>
            <p className="font-semibold text-black/70">90%</p>
          </div>
          <div className="h-2 bg-gray-200 rounded-2xl">
            <div
              className="h-2 bg-blue-600 rounded-2xl"
              style={{ width: "67%" }}
            ></div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 flex flex-col gap-4">
          <div className="flex justify-between">
            <HiCash className="bg-orange-100 text-orange-600 text-4xl rounded p-1" />
            <p className="bg-orange-100 rounded font-semibold px-1 flex items-center text-orange-600 h-fit text-sm">
              Due in 5d
            </p>
          </div>
          <div>
            <p className="text-2xl font-bold">Pendening Fees</p>
            <p className="font-semibold text-black/70">15000</p>
          </div>
          <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm hover:text-blue-700 cursor-pointer">
            Pay Now <IoMdArrowRoundForward />
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 flex flex-col gap-4">
          <PiExam className="bg-purple-100 text-purple-600 text-3xl rounded p-1 " />
          <div>
            <p className="text-2xl uppercase font-bold">upcoming exam</p>
            <p className="text-xl font-semibold text-black/70">Mathematice</p>
            <p className="text-sm font-semibold text-black/50">
              {new Date().toLocaleDateString("en-IN", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4">
          <div className="flex justify-between">
            <BiStar className="bg-green-100 text-green-600 text-3xl rounded p-1" />
            <p className="bg-blue-100 text-blue-600 rounded h-fit px-1 text-sm">
              New
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <p className=" font-semibold text-lg">Latest Result</p>
            <p className="font-bold text-green-600 text-2xl">Scinece</p>
            <p className="text-2xl text-green-600 font-bold">
              A+ <span className="text-sm text-black/70">GPA 10.0</span>
            </p>
            <p className="text-black/50 font-semibold text-sm">
              Graded by Dr.Smith
            </p>
          </div>
        </div>
      </section>

      <section className="mt-10 bg-white p-1 rounded-2xl">
        <div className="flex justify-between items-center mb-5">
          <div>
            <p className="text-xl font-bold">Attendance Trends</p>
            <p className="text-sm text-black/60">
              Monthly comparison across semester modules
            </p>
          </div>

          <button className="bg-blue-600 text-white px-4 py-1 rounded-lg text-sm">
            Monthly
          </button>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={attendanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis domain={[0, 100]} />
            <Tooltip />

            <Bar
              dataKey="attendance"
              radius={[6, 6, 0, 0]}
              label={{ position: "top", fill: "#000", fontSize: 12 }}
              shape={(props) => {
                const { x, y, width, height, payload } = props;

                const shortMonth = payload.month.slice(0, 3);

                const isCurrent = shortMonth === currentMonth;
                const isMax = payload.attendance === maxAttendance;

                let fill = "#93c5fd";

                if (isMax) fill = "#1d4ed8";
                else if (isCurrent) fill = "lightgreen";

                return (
                  <g>
                    <rect
                      x={x}
                      y={y}
                      width={width}
                      height={height}
                      fill={fill}
                      rx={6}
                    />

                    {/* Show value inside bar */}
                    <text
                      x={x + width / 2}
                      y={y + 15}
                      textAnchor="middle"
                      fill="#fff"
                      fontSize="12"
                      fontWeight="bold"
                    >
                      {payload.attendance}%
                    </text>
                  </g>
                );
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </section>
    </div>
  );
};

export default StudentDashboard;
