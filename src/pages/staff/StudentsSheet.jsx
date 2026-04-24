import React, { useMemo, useState } from "react";
import {
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  TableContainer,
  TableHead,
  TableCell,
  TableRow,
  Table,
  TableBody,
} from "@mui/material";
import { BiPlus, BiSearch } from "react-icons/bi";
import DataNotFound from "../DataNotFound";
import { MdAnnouncement } from "react-icons/md";

const StudentsSheet = () => {
  const [search, setSearch] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [section, setSection] = useState("");

  const listOfClassLevels = [
    "Class 1",
    "Class 2",
    "Class 3",
    "Class 4",
    "Class 5",
    "Class 6",
    "Class 7",
    "Class 8",
    "Class 9",
    "Class 10",
    "Class 11 Commerce",
    "Class 11 Science",
    "Class 12 Science",
  ];

  const listOfSections = ["Section A", "Section B", "Section C", "Section D"];

  const students = [
    {
      id: "2024-0492",
      name: "Julian Sterling",
      classLevel: "Class 12 Science",
      section: "Section A",
      performance: "92%",
      status: "Enrolled",
    },
    {
      id: "2024-0518",
      name: "Maya Rodriguez",
      classLevel: "Class 11 Science",
      section: "Section B",
      performance: "84%",
      status: "Enrolled",
    },
    {
      id: "2024-0520",
      name: "Alister Wright",
      classLevel: "Class 12 Science",
      section: "Section A",
      performance: "67%",
      status: "Attention",
    },

    // 🔽 20 more students
    {
      id: "2024-0521",
      name: "Aarav Sharma",
      classLevel: "Class 10",
      section: "Section A",
      performance: "88%",
      status: "Enrolled",
    },
    {
      id: "2024-0522",
      name: "Riya Verma",
      classLevel: "Class 9",
      section: "Section B",
      performance: "76%",
      status: "Enrolled",
    },
    {
      id: "2024-0523",
      name: "Kabir Singh",
      classLevel: "Class 8",
      section: "Section C",
      performance: "81%",
      status: "Enrolled",
    },
    {
      id: "2024-0524",
      name: "Ananya Gupta",
      classLevel: "Class 7",
      section: "Section D",
      performance: "69%",
      status: "Attention",
    },
    {
      id: "2024-0525",
      name: "Vihaan Mehta",
      classLevel: "Class 6",
      section: "Section A",
      performance: "90%",
      status: "Enrolled",
    },
    {
      id: "2024-0526",
      name: "Ishita Kapoor",
      classLevel: "Class 5",
      section: "Section B",
      performance: "73%",
      status: "Enrolled",
    },
    {
      id: "2024-0527",
      name: "Arjun Patel",
      classLevel: "Class 11 Commerce",
      section: "Section C",
      performance: "85%",
      status: "Enrolled",
    },
    {
      id: "2024-0528",
      name: "Sneha Iyer",
      classLevel: "Class 12 Commerce",
      section: "Section D",
      performance: "78%",
      status: "Enrolled",
    },
    {
      id: "2024-0529",
      name: "Rohan Das",
      classLevel: "Class 11 Science",
      section: "Section A",
      performance: "66%",
      status: "Attention",
    },
    {
      id: "2024-0530",
      name: "Pooja Nair",
      classLevel: "Class 12 Science",
      section: "Section B",
      performance: "91%",
      status: "Enrolled",
    },
    {
      id: "2024-0531",
      name: "Aditya Rao",
      classLevel: "Class 9",
      section: "Section C",
      performance: "74%",
      status: "Enrolled",
    },
    {
      id: "2024-0532",
      name: "Meera Joshi",
      classLevel: "Class 10",
      section: "Section D",
      performance: "82%",
      status: "Enrolled",
    },
    {
      id: "2024-0533",
      name: "Karan Malhotra",
      classLevel: "Class 8",
      section: "Section A",
      performance: "68%",
      status: "Attention",
    },
    {
      id: "2024-0534",
      name: "Neha Choudhary",
      classLevel: "Class 7",
      section: "Section B",
      performance: "79%",
      status: "Enrolled",
    },
    {
      id: "2024-0535",
      name: "Rahul Khanna",
      classLevel: "Class 6",
      section: "Section C",
      performance: "87%",
      status: "Enrolled",
    },
    {
      id: "2024-0536",
      name: "Simran Kaur",
      classLevel: "Class 5",
      section: "Section D",
      performance: "72%",
      status: "Enrolled",
    },
    {
      id: "2024-0537",
      name: "Yash Agarwal",
      classLevel: "Class 11 Arts",
      section: "Section A",
      performance: "80%",
      status: "Enrolled",
    },
    {
      id: "2024-0538",
      name: "Tanya Bansal",
      classLevel: "Class 12 Arts",
      section: "Section B",
      performance: "75%",
      status: "Enrolled",
    },
    {
      id: "2024-0539",
      name: "Dev Verma",
      classLevel: "Class 10",
      section: "Section C",
      performance: "89%",
      status: "Enrolled",
    },
    {
      id: "2024-0540",
      name: "Priya Saxena",
      classLevel: "Class 9",
      section: "Section D",
      performance: "77%",
      status: "Enrolled",
    },
  ];

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchSearch =
        student.name.toLowerCase().includes(search.toLowerCase()) ||
        student.id.toLowerCase().includes(search.toLowerCase());

      const matchClass = !classLevel || student.classLevel === classLevel;

      const matchSection = !section || student.section === section;

      return matchSearch && matchClass && matchSection;
    });
  }, [search, classLevel, section]);

  return (
    <div className="min-h-screen">
      <header className="flex justify-between items-center mb-8">
        <div>
          <p className="text-2xl font-bold">My Students</p>
          <p className="text-gray-500">
            Manage student roster and academic details
          </p>
        </div>

        <div className="flex gap-4">
          <button className="px-4 py-2 flex  items-center gap-2 rounded-lg border">
            <MdAnnouncement />
            Add Announcement
          </button>
          <button className="px-4 py-2 flex  items-center gap-2 rounded-lg bg-blue-600 text-white">
            <BiPlus /> Enroll Students
          </button>
        </div>
      </header>

      <section className="grid grid-cols-3 gap-6 mb-8">
        <div className=" p-5 bg-white rounded-2xl shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-sm text-blue-600 font-semibold">
                ACTIVE SEARCH
              </p>
              <p className="text-xl font-bold">Find Student</p>
            </div>
            <BiSearch className="text-4xl text-blue-600 bg-blue-200 px-2 rounded" />
          </div>

          <TextField
            fullWidth
            placeholder="Search by name or ID"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm flex flex-col justify-between">
          <p className="text-sm text-blue-600 font-semibold mb-2 uppercase">
            Select CLASS
          </p>

          <FormControl fullWidth>
            <InputLabel>Class</InputLabel>
            <Select
              value={classLevel}
              onChange={(e) => setClassLevel(e.target.value)}
              label="Class Level"
            >
              <MenuItem value="">All Classes</MenuItem>

              {listOfClassLevels.map((level) => (
                <MenuItem key={level} value={level}>
                  {level}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm flex flex-col justify-between">
          <p className="text-sm text-blue-600 font-semibold mb-2">SECTION</p>

          <FormControl fullWidth>
            <InputLabel>Section</InputLabel>
            <Select
              value={section}
              onChange={(e) => setSection(e.target.value)}
              label="Section"
            >
              <MenuItem value="">All Sections</MenuItem>

              {listOfSections.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </section>

      <section className="bg-white rounded-2xl shadow-sm p-6">
        <p className="text-2xl font-bold mb-1">Roster Overview</p>
        <p className="text-gray-500 mb-6">
          Currently viewing {filteredStudents.length} students
        </p>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Student Identity</TableCell>
                <TableCell>Class</TableCell>
                <TableCell>Section</TableCell>
                <TableCell>Performance</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <div className="flex gap-2 items-center">
                        <img
                          src="https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"
                          alt="student"
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-bold">{student.name}</p>
                          <p className="text-gray-500 text-sm">{student.id}</p>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>{student.classLevel}</TableCell>

                    <TableCell>{student.section}</TableCell>

                    <TableCell>{student.performance}</TableCell>

                    <TableCell>
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          student.status === "Enrolled"
                            ? "bg-blue-100 text-blue-600"
                            : "bg-orange-100 text-orange-600"
                        }`}
                      >
                        {student.status}
                      </span>
                    </TableCell>

                    <TableCell>
                      <button className="text-blue-600">View</button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    <DataNotFound />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </section>
    </div>
  );
};

export default StudentsSheet;
