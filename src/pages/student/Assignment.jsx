import React, { useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";

const Assignment = () => {
  const [filter, setFilter] = useState("All");

  const assignments = [
    {
      id: 1,
      title: "Calculus Problem Set #4: Limits & Continuity",
      subject: "Mathematics",
      teacher: "Prof. Julian Sterling",
      status: "Pending",
      due: "Today, 11:59 PM",
      urgent: true,
    },
    {
      id: 2,
      title: "Algorithm Complexity Analysis (Big O)",
      subject: "Computer Science",
      teacher: "Dr. Linda Watson",
      status: "Pending",
      due: "Oct 24, 2023",
    },
    {
      id: 3,
      title: "The Industrial Revolution: Socio-Economic Impact",
      subject: "Modern History",
      teacher: "Mr. Mark Kovic",
      status: "Graded",
      grade: "A+",
    },
  ];
  const filteredAssignments = useMemo(() => {
    if (filter === "All") return assignments;

    return assignments.filter((a) => a.status === filter);
  }, [filter, assignments]);
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* 🔹 Top Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">My Assignments</h1>
          <p className="text-gray-500">
            You have{" "}
            <span className="text-blue-600 font-semibold">3 pending tasks</span>{" "}
            this week. Keep up the momentum!
          </p>
        </div>

        <div className="flex items-center bg-white px-3 py-2 rounded-lg shadow w-72">
          <FiSearch className="text-gray-400" />
          <input
            type="text"
            placeholder="Search tasks..."
            className="ml-2 outline-none w-full"
          />
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4 items-center mb-6">
          {["All", "Pending", "Graded"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1 rounded-full font-medium ${
                filter === f ? "bg-blue-100 text-blue-600" : "text-gray-600"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <span className="text-sm bg-gray-200 px-3 py-1 rounded-full">
          Showing {filteredAssignments.length} items
        </span>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 flex flex-col gap-4">
          {filteredAssignments.length > 0 ? (
            filteredAssignments.map((item) => (
              <div
                key={item.id}
                className={`p-4 rounded-xl shadow flex justify-between items-center ${
                  item.status === "Graded"
                    ? "bg-gray-100"
                    : "bg-white border-l-4"
                } ${
                  item.urgent
                    ? "border-red-500"
                    : item.status === "Pending"
                      ? "border-blue-500"
                      : ""
                }`}
              >
                <div>
                  <p
                    className={`text-xs font-semibold ${
                      item.urgent
                        ? "text-red-500"
                        : item.status === "Pending"
                          ? "text-blue-500"
                          : "text-gray-500"
                    }`}
                  >
                    {item.status.toUpperCase()} • {item.subject}
                  </p>

                  <h2 className="font-bold text-lg">{item.title}</h2>
                  <p className="text-sm text-gray-500">{item.teacher}</p>
                </div>

                <div className="text-right">
                  {item.status !== "Graded" ? (
                    <>
                      <p className="text-sm text-gray-500">Deadline</p>
                      <p className="font-semibold">{item.due}</p>

                      <button className="mt-2 bg-blue-600 text-white px-4 py-1 rounded-lg">
                        Submit
                      </button>
                    </>
                  ) : (
                    <>
                      <p className="text-sm text-gray-500">Grade Received</p>
                      <p className="text-blue-600 font-bold text-lg">
                        {item.grade}
                      </p>
                    </>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 py-10">
              No assignments found
            </p>
          )}
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="font-bold mb-3">Upcoming Deadlines</h3>

            <div className="flex flex-col gap-3">
              <div className="flex gap-3 items-center">
                <div className="bg-gray-200 w-10 h-10 flex items-center justify-center rounded-full">
                  22
                </div>
                <div>
                  <p className="font-medium">Physics Lab Report</p>
                  <p className="text-sm text-gray-500">Physics • Oct 22</p>
                </div>
              </div>

              <div className="flex gap-3 items-center">
                <div className="bg-gray-200 w-10 h-10 flex items-center justify-center rounded-full">
                  25
                </div>
                <div>
                  <p className="font-medium">Literature Essay</p>
                  <p className="text-sm text-gray-500">English • Oct 25</p>
                </div>
              </div>

              <div className="flex gap-3 items-center opacity-60">
                <div className="bg-gray-200 w-10 h-10 flex items-center justify-center rounded-full">
                  28
                </div>
                <div>
                  <p className="font-medium">Data Structures Quiz</p>
                  <p className="text-sm text-gray-500">CompSci • Oct 28</p>
                </div>
              </div>
            </div>

            <button className="text-blue-600 mt-4 text-sm">
              View Calendar
            </button>
          </div>

          {/* 📊 Recent Grades */}
          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="font-bold mb-3">Recent Grades</h3>

            <div className="bg-gray-100 p-3 rounded-lg flex justify-between mb-2">
              <span>Midterm Calculus</span>
              <span className="text-blue-600 font-semibold">94/100</span>
            </div>
            <div className="bg-gray-100 p-3 rounded-lg flex justify-between mb-2">
              <span>Morden History</span>
              <span className="text-blue-600 font-semibold">74/100</span>
            </div>
            <div className="bg-gray-100 p-3 rounded-lg flex justify-between mb-2">
              <span>Maths</span>
              <span className="text-blue-600 font-semibold">84/100</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assignment;
