import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import { periods, timetableData } from "../../data/timetableData";

const subjectColors = {
  Mathematics: "bg-blue-100 text-blue-700",
  English: "bg-purple-100 text-purple-700",
  Physics: "bg-amber-100 text-amber-700",
  Chemistry: "bg-pink-100 text-pink-700",
  Biology: "bg-green-200 text-green-700",
  "Computer Science": "bg-indigo-100 text-indigo-700",
  Hindi: "bg-orange-100 text-orange-700",
  SST: "bg-yellow-100 text-yellow-700",
  GK: "bg-teal-100 text-teal-700",
  Drawing: "bg-rose-100 text-rose-700",
  Sports: "bg-lime-100 text-lime-700",
  PE: "bg-cyan-100 text-cyan-700",
  Library: "bg-gray-100 text-gray-700",
};

const SubjectCard = ({ subject }) => {
  if (subject === "Break") {
    return (
      <div className="bg-gray-200 text-gray-700 text-center py-2 rounded-xl border border-dashed">
        Break
      </div>
    );
  }

  return (
    <div
      className={`text-center  py-4 px-2 rounded-xl font-medium shadow-sm
      ${subjectColors[subject] || "bg-gray-100 text-gray-700"} border-l-4 `}
    >
      {subject}
    </div>
  );
};

const MobileView = ({ data }) => {
  return (
    <div className="space-y-4">
      {data.map((dayData, index) => (
        <div key={index} className="bg-white rounded-xl shadow p-3">
          <h2 className="font-bold text-lg mb-2 text-blue-600">
            {dayData.day}
          </h2>

          <div className="space-y-2">
            {periods.map((time, i) => {
              const sub = dayData.subjects[i];

              return (
                <div
                  key={i}
                  className="flex gap-2 justify-between items-center text-sm"
                >
                  <span className="text-gray-700 font-bold bg-blue-200 w-1/2 border-l-4 border-blue-600 py-4 rounded-2xl text-center">
                    {time}
                  </span>

                  <div className="w-1/2">
                    <SubjectCard subject={sub} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

const StudentTimeTable = () => {
  const classId = 10;
  const data = timetableData[classId];

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div className="p-2 md:p-4">
      <header>
        <p className="font-bold text-3xl">Weekly Timetable</p>
        <p className="font-semibold mt-1 text-gray-600">
          Class {classId}th A ({new Date().getFullYear()})
        </p>
      </header>

      <main className="mt-6">
        {isMobile ? (
          <MobileView data={data} />
        ) : (
          <TableContainer className="rounded-xl shadow-md">
            <Table>
              <TableHead>
                <TableRow className="bg-blue-600 ">
                  <TableCell>
                    <b className="text-white font-bold">Time / Days</b>
                  </TableCell>

                  {data.map((d, index) => (
                    <TableCell key={index}>
                      <b className="text-white font-bold ">{d.day}</b>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {periods.map((time, periodIndex) => (
                  <TableRow key={periodIndex}>
                    <TableCell className="bg-blue-600">
                      <b className="font-semibold text-gray-100">{time}</b>
                    </TableCell>

                    {data.map((dayData, dayIndex) => (
                      <TableCell key={dayIndex}>
                        <SubjectCard subject={dayData.subjects[periodIndex]} />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </main>
    </div>
  );
};

export default StudentTimeTable;
