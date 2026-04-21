import React from "react";

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

    let bg = "bg-gray-200";

    if (dayOfWeek === 0) {
      bg = "bg-blue-500";
    } else if (absentList.includes(d)) {
      bg = "bg-red-600";
    } else {
      bg = "bg-green-400";
    }

    const isFuture =
      year === today.getFullYear() &&
      month === today.getMonth() &&
      d > today.getDate();

    if (isFuture) {
      bg = "bg-gray-200"; // future days
    }

    days.push({ day: d, bg });
  }

  const totalPresent = 25;
  const totalAbsent = 5;
  const totalDays = totalPresent + totalAbsent;

  const presentPercent = (totalPresent / totalDays) * 100;

  const totalOverall = 35 + 15;
  const overallPercent = (35 / totalOverall) * 100;
  return (
    <div className="flex flex-col gap-6">
      <header className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
        <div className="bg-gray-200 p-4 rounded flex flex-col gap-2">
          <p className="font-semibold text-2xl">OverAll Attendence</p>
          <p className="text-4xl font-bold">{totalAttendence}%</p>

          <div className="bg-gray-300 w-full h-3 rounded-2xl">
            <div
              style={{ width: `${totalAttendence}%` }}
              className={`h-3 rounded-2xl ${
                totalAttendence >= 80
                  ? "bg-blue-600"
                  : totalAttendence >= 60
                    ? "bg-green-600"
                    : totalAttendence > 35
                      ? "bg-amber-600"
                      : "bg-red-600"
              }`}
            ></div>
          </div>
        </div>
        <div className="bg-gray-200 p-4 rounded-2xl flex flex-col gap-2">
          <p className="text-2xl font-bold">Scholarship Status</p>

          {totalAttendence >= 85 ? (
            <div className="flex items-center gap-2">
              <div className="bg-green-600 w-3 h-3 rounded-full"></div>
              <p className="font-bold">Maintained</p>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <div className="bg-red-600 w-3 h-3 rounded-full"></div>
              <p className="font-semibold">Not Maintained</p>
            </div>
          )}

          <div className="flex gap-1">
            <p className="font-semibold text-black/50">Requirement :</p>
            <p className="font-bold">85 %</p>
          </div>

          <p className="font-semibold text-black/50">
            Your Attendence :
            <span className="font-bold text-black"> {totalAttendence} %</span>
          </p>
        </div>

        <div className="bg-gray-200 p-4 rounded-2xl flex flex-col gap-4 ">
          <p className="text-2xl font-bold">This Month</p>

          <p className="font-semibold text-black/50">
            Total Present :{" "}
            <span className="text-black font-bold">{totalPresent}</span>
          </p>

          <p className="font-semibold text-black/50">
            Total Absent :{" "}
            <span className="text-black font-bold">{totalAbsent}</span>
          </p>

          <div className="flex justify-center">
            <div
              className="w-22 h-22 rounded-full"
              style={{
                background: `conic-gradient(
          cyan 0% ${presentPercent}%,
          magenta ${presentPercent}% 100%
        )`,
              }}
            ></div>
          </div>

          {/* Labels */}
          <div className="flex justify-between text-sm font-semibold">
            <span className="text-green-600">Present</span>
            <span className="text-red-600">Absent</span>
          </div>

          {/* Percentage */}
          <p className="text-center text-sm text-black/60">
            {presentPercent.toFixed(0)}% Attendance
          </p>
        </div>

        <div className="bg-gray-200 p-4 rounded-2xl flex flex-col gap-4 ">
          <p className="text-2xl font-bold">Total Attendance</p>

          <p className="font-semibold text-black/50">
            Total Present :<span className="text-black font-bold"> 35</span>
          </p>

          <p className="font-semibold text-black/50">
            Total Absent :<span className="text-black font-bold"> 15</span>
          </p>

          <div className="w-full h-4 bg-gray-300 rounded-full overflow-hidden flex">
            <div
              style={{ width: `${overallPercent}%` }}
              className="bg-blue-500 h-full"
            ></div>
            <div
              style={{ width: `${100 - overallPercent}%` }}
              className="bg-red-500 h-full"
            ></div>
          </div>

          <p className="text-center text-sm font-semibold">
            {overallPercent.toFixed(0)}% Overall Attendance
          </p>
        </div>
      </header>

      <main className="bg-white p-4 rounded-2xl">
        <h2 className="text-lg font-semibold mb-3">Attendance Calendar</h2>

        <div className="grid grid-cols-7 gap-1 text-center font-semibold mb-2 ">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div key={d} className="bg-amber-200 p-10 rounded">
              {d}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {days.map((item, i) =>
            item ? (
              <div
                key={i}
                className={`h-10 flex items-center justify-center rounded text-black font-bold ${item.bg}  p-10 rounded`}
              >
                {item.day}
                {item?.status}
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
