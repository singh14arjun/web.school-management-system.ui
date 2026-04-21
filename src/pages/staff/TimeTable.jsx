import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import React from "react";

const Timetable = () => {
  const today = new Date();
  const day = today.getDay();
  const diffToMonday = day === 0 ? -6 : 1 - day;

  const monday = new Date(today);
  monday.setDate(today.getDate() + diffToMonday);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  const formatDate = (date) =>
    date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  const weeklySchedule = [
    {
      day: "Monday",
      schedule: [
        {
          time: "8:00 AM - 8:40 AM",
          subject: "Mathematics",
          class: "10",
          section: "A",
          type: "teaching",
        },
        {
          time: "8:40 AM - 09:20 AM",
          subject: "Physics",
          class: "11",
          section: "B",
          type: "teaching",
        },
        {
          time: "09:20 AM - 10:00 AM",
          subject: "Mathematics",
          class: "9",
          section: "C",
          type: "teaching",
        },
        {
          time: "10:00 AM - 10:40 AM",
          subject: "Physics",
          class: "12",
          section: "A",
          type: "teaching",
        },
        {
          time: "10:40 AM - 11:00 AM",
          subject: "Break",
          type: "non-teaching",
        },
        {
          time: "11:00 AM - 11:40 AM",
          subject: "Mathematics",
          class: "10",
          section: "B",
          type: "teaching",
        },
        {
          time: "11:40 PM - 12:20 PM",
          subject: "Student Mentoring",
          type: "non-teaching",
        },
        {
          time: "12:20 PM - 1:00 PM",
          subject: "Mathematics",
          class: "10",
          section: "B",
          type: "teaching",
        },
        {
          time: "1:00 PM - 1:40 PM",
          subject: "Physics",
          class: "11",
          section: "C",
          type: "Lab",
        },
      ],
    },

    {
      day: "Tuesday",
      schedule: [
        {
          time: "8:00 AM - 9:00 AM",
          subject: "Physics",
          class: "11",
          section: "A",
          type: "teaching",
        },
        {
          time: "9:00 AM - 10:00 AM",
          subject: "Mathematics",
          class: "9",
          section: "B",
          type: "teaching",
        },
        {
          time: "10:00 AM - 11:00 AM",
          subject: "Mathematics",
          class: "10",
          section: "C",
          type: "teaching",
        },
        {
          time: "11:00 AM - 11:30 AM",
          subject: "Physics",
          class: "12",
          section: "B",
          type: "teaching",
        },
        {
          time: "11:30 AM - 12:00 PM",
          subject: "Break",
          type: "non-teaching",
        },
        {
          time: "12:00 PM - 1:00 PM",
          subject: "Physics",
          class: "11",
          section: "C",
          type: "teaching",
        },
        {
          time: "1:00 PM - 2:30 PM",
          subject: "Staff Meeting",
          type: "non-teaching",
        },
      ],
    },

    {
      day: "Wednesday",
      schedule: [
        {
          time: "8:00 AM - 9:00 AM",
          subject: "Mathematics",
          class: "10",
          section: "A",
          type: "teaching",
        },
        {
          time: "9:00 AM - 10:00 AM",
          subject: "Physics",
          class: "12",
          section: "A",
          type: "teaching",
        },
        {
          time: "10:00 AM - 11:00 AM",
          subject: "Mathematics",
          class: "9",
          section: "A",
          type: "teaching",
        },
        {
          time: "11:00 AM - 11:30 AM",
          subject: "Physics",
          class: "11",
          section: "B",
          type: "teaching",
        },
        {
          time: "11:30 AM - 12:00 PM",
          subject: "Break",
          type: "non-teaching",
        },
        {
          time: "12:00 PM - 1:00 PM",
          subject: "Mathematics",
          class: "10",
          section: "C",
          type: "teaching",
        },
        {
          time: "1:00 PM - 2:30 PM",
          subject: "Grading Papers",
          type: "non-teaching",
        },
      ],
    },

    {
      day: "Thursday",
      schedule: [
        {
          time: "8:00 AM - 9:00 AM",
          subject: "Mathematics",
          class: "9",
          section: "B",
          type: "teaching",
        },
        {
          time: "9:00 AM - 10:00 AM",
          subject: "Physics",
          class: "11",
          section: "A",
          type: "teaching",
        },
        {
          time: "10:00 AM - 11:00 AM",
          subject: "Mathematics",
          class: "10",
          section: "A",
          type: "teaching",
        },
        {
          time: "11:00 AM - 11:30 AM",
          subject: "Physics",
          class: "12",
          section: "C",
          type: "teaching",
        },
        {
          time: "11:30 AM - 12:00 PM",
          subject: "Break",
          type: "non-teaching",
        },
        {
          time: "12:00 PM - 1:00 PM",
          subject: "Mathematics",
          class: "9",
          section: "C",
          type: "teaching",
        },
        {
          time: "1:00 PM - 2:30 PM",
          subject: "Parent Communication",
          type: "non-teaching",
        },
      ],
    },

    {
      day: "Friday",
      schedule: [
        {
          time: "8:00 AM - 9:00 AM",
          subject: "Physics",
          class: "12",
          section: "A",
          type: "teaching",
        },
        {
          time: "9:00 AM - 10:00 AM",
          subject: "Mathematics",
          class: "10",
          section: "B",
          type: "teaching",
        },
        {
          time: "10:00 AM - 11:00 AM",
          subject: "Mathematics",
          class: "9",
          section: "A",
          type: "teaching",
        },
        {
          time: "11:00 AM - 11:30 AM",
          subject: "Physics",
          class: "11",
          section: "C",
          type: "teaching",
        },
        {
          time: "11:30 AM - 12:00 PM",
          subject: "Break",
          type: "non-teaching",
        },
        {
          time: "12:00 PM - 1:00 PM",
          subject: "Mathematics",
          class: "10",
          section: "A",
          type: "teaching",
        },
        {
          time: "1:00 PM - 2:30 PM",
          subject: "Weekly Review",
          type: "non-teaching",
        },
      ],
    },

    {
      day: "Saturday",
      schedule: [
        {
          time: "8:00 AM - 9:00 AM",
          subject: "Mathematics",
          class: "9",
          section: "A",
          type: "teaching",
        },
        {
          time: "9:00 AM - 10:00 AM",
          subject: "Physics",
          class: "11",
          section: "B",
          type: "teaching",
        },
        {
          time: "10:00 AM - 11:00 AM",
          subject: "Revision",
          class: "All",
          section: "-",
          type: "teaching",
        },
        {
          time: "11:00 AM - 11:30 AM",
          subject: "Doubt Session",
          class: "All",
          section: "-",
          type: "teaching",
        },
        {
          time: "11:30 AM - 12:00 PM",
          subject: "Break",
          type: "non-teaching",
        },
        {
          time: "12:00 PM - 1:00 PM",
          subject: "Test / Quiz",
          class: "10",
          section: "A",
          type: "teaching",
        },
        {
          time: "1:00 PM - 2:30 PM",
          subject: "Activity / Club",
          type: "non-teaching",
        },
      ],
    },
  ];

  const darkenColor = (hex, amount = 40) => {
    let col = hex.replace("#", "");

    let r = parseInt(col.substring(0, 2), 56);
    let g = parseInt(col.substring(2, 4), 56);
    let b = parseInt(col.substring(4, 6), 56);

    r = Math.max(0, r - amount);
    g = Math.max(0, g - amount);
    b = Math.max(0, b - amount);

    return `rgb(${r}, ${g}, ${b})`;
  };

  const getTeachingColor = (cls, section) => {
    const colors = {
      "9-A": "#E3F2FD",
      "9-B": "#E8F5E9",
      "9-C": "#FFF3E0",
      "10-A": "#F3E5F5",
      "10-B": "#E0F7FA",
      "10-C": "#FCE4EC",
      "11-A": "#E1F5FE",
      "11-B": "#F1F8E9",
      "11-C": "#FFF8E1",
      "12-A": "#FBE9E7",
      "12-B": "#EDE7F6",
      "12-C": "#E0F2F1",
    };

    return colors[`${cls}-${section}`] || "#E3F2FD";
  };

  return (
    <div>
      <header>
        <h1 className="text-4xl font-bold">Teaching Schedule</h1>
        <p className="text-lg text-gray-500">
          Manage your teaching schedule and view your class timetable
        </p>
        <p>
          This Week {formatDate(monday)} - {formatDate(sunday)}
        </p>
      </header>
      <main>
        <TableContainer component={Paper} sx={{ mt: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>Time</b>
                </TableCell>
                {weeklySchedule.map((day) => (
                  <TableCell key={day.day} align="center">
                    <b>{day.day}</b>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {weeklySchedule[0].schedule.map((_, rowIndex) => (
                <TableRow key={rowIndex}>
                  <TableCell
                    sx={{ fontWeight: "bold" }}
                    className="bg-blue-200"
                  >
                    {weeklySchedule[0].schedule[rowIndex].time}
                  </TableCell>

                  {weeklySchedule.map((day) => {
                    const slot = day.schedule[rowIndex];

                    let bgColor = getTeachingColor(slot?.class, slot?.section);
                    let borderColor = darkenColor(bgColor, 60);
                    if (slot?.subject === "Break") {
                      bgColor = "#FFF59D";
                    } else if (slot?.type === "non-teaching") {
                      bgColor = "#E0E0E0";
                    } else if (slot?.type === "teaching") {
                      bgColor = getTeachingColor(slot?.class, slot?.section);
                    } else if (slot?.type === "Lab") {
                      bgColor = "#B2DFDB";
                    }

                    return (
                      <TableCell key={day.day} align="center">
                        {slot && (
                          <div
                            style={{
                              background: bgColor,
                              borderLeft: `5px solid ${borderColor}`,
                              padding: "10px",
                              borderRadius: "10px",
                              minHeight: "70px",
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                            }}
                          >
                            <p style={{ fontWeight: 600 }}>{slot.subject}</p>

                            {slot.type === "teaching" || slot.type === "Lab" ? (
                              <p style={{ fontSize: "13px" }}>
                                Class {slot.class} - {slot.section}
                                <p
                                  style={{
                                    fontSize: "12px",
                                    color: "gray",
                                    fontWeight: "bold",
                                  }}
                                >
                                  {slot.type === "Lab"
                                    ? "Laboratory Session"
                                    : "Regular Class"}
                                </p>
                              </p>
                            ) : null}
                          </div>
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </main>
    </div>
  );
};
export default Timetable;
