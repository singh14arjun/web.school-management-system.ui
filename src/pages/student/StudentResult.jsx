import { BiDownArrowAlt } from "react-icons/bi";
import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  Button,
} from "@mui/material";
import { BiDownArrow } from "react-icons/bi";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const StudentResult = () => {
  const [examType, setExamType] = useState("All");
  const [year, setYear] = useState("2026");
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [selectedDate, setSelectedDate] = useState("");
  const subjects = ["Maths", "Science", "English", "Computer", "Hindi"];

  const results = [
    {
      id: 1,
      exam: "Term 1",
      year: 2026,
      marks: {
        Maths: 80,
        Science: 75,
        English: 85,
        Computer: 90,
        Hindi: 70,
      },
    },
    {
      id: 2,
      exam: "Term 2",
      year: 2026,
      marks: {
        Maths: 60,
        Science: 55,
        English: 65,
        Computer: 70,
        Hindi: 50,
      },
    },
  ];

  const classTestData = [
    {
      exam: "Class Test",
      subject: "Maths",
      totalMarks: 70,
      obtainedMarks: 50,
    },
    {
      exam: "Class Test",
      subject: "Science",
      totalMarks: 70,
      obtainedMarks: 58,
    },
    {
      exam: "Class Test",
      subject: "English",
      totalMarks: 70,
      obtainedMarks: 62,
    },
    {
      exam: "Class Test",
      subject: "Computer",
      totalMarks: 70,
      obtainedMarks: 65,
    },
    {
      exam: "Class Test",
      subject: "Hindi",
      totalMarks: 70,
      obtainedMarks: 45,
    },
    {
      exam: "Class Test",
      subject: "Maths",
      totalMarks: 70,
      obtainedMarks: 16,
    },
    {
      exam: "Class Test",
      subject: "Science",
      totalMarks: 70,
      obtainedMarks: 49,
    },
    {
      exam: "Class Test",
      subject: "English",
      totalMarks: 70,
      obtainedMarks: 55,
    },
    {
      exam: "Class Test",
      subject: "Computer",
      totalMarks: 70,
      obtainedMarks: 68,
    },
    {
      exam: "Class Test",
      subject: "Hindi",
      totalMarks: 70,
      obtainedMarks: 60,
    },
  ];
  const filteredResults = results.filter((r) => {
    const matchExam = examType === "All" || r.exam === examType;

    const matchYear = r.year.toString() === year;

    const matchSubject =
      selectedSubject === "All" || r.marks[selectedSubject] !== undefined;

    const matchDate = !selectedDate || true;

    return matchExam && matchYear && matchSubject && matchDate;
  });

  const calculateTotal = (marks) =>
    Object.values(marks).reduce((acc, val) => acc + val, 0);

  const calculatePercentage = (marks) => {
    const total = calculateTotal(marks);
    return ((total / (subjects.length * 100)) * 100).toFixed(1);
  };

  const getResultStatus = (marks) => {
    const failed = Object.values(marks).some((m) => m < 33);
    return failed ? "Fail" : "Pass";
  };

  const getPercentage = (obtained, total) =>
    ((obtained / total) * 100).toFixed(1);

  const getStatus = (obtained, total) =>
    obtained >= total * 0.33 ? "Pass" : "Fail";
  const filteredClassTestData =
    selectedSubject === "All"
      ? classTestData
      : classTestData.filter((item) => item.subject === selectedSubject);

  const ClassTestCard = ({ item }) => {
    const percentage = getPercentage(item.obtainedMarks, item.totalMarks);
    const status = getStatus(item.obtainedMarks, item.totalMarks);

    return (
      <div
        className={`bg-gray-100 rounded-2xl shadow p-4 space-y-2 border-l-8 ${status == "Pass" ? "border-green-600" : "border-red-600"} hover:shadow-lg transition`}
      >
        <div className="flex justify-between items-center">
          <p className="font-semibold text-lg">{item.subject}</p>

          <span
            className={`text-sm font-semibold px-2 py-1 rounded-full ${
              status === "Pass"
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
            }`}
          >
            {status}
          </span>
        </div>

        <p className="text-sm text-gray-600">
          Name: <span className="font-medium">Arjun Singh</span>
        </p>

        <p className="text-sm text-gray-600">
          Date: <span>{item.date || "N/A"}</span>
        </p>

        <div className="flex justify-between text-sm">
          <p>Total: {item.totalMarks}</p>
          <p>Obtained: {item.obtainedMarks}</p>
        </div>

        {/* Percentage Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full"
            style={{ width: `${percentage}%` }}
          />
        </div>

        <p className="text-sm font-medium text-gray-700">
          Percentage: {percentage}%
        </p>

        <Button variant="contained" color="success" onClick={generateStyledPDF}>
          Download Report Card
        </Button>
      </div>
    );
  };

  const getGrade = (percentage) => {
    if (percentage >= 91) return "A1";
    if (percentage >= 81) return "A2";
    if (percentage >= 71) return "B1";
    if (percentage >= 61) return "B2";
    if (percentage >= 51) return "C1";
    if (percentage >= 41) return "C2";
    if (percentage >= 33) return "D";
    return "F";
  };

  const generateStyledPDF = () => {
    const doc = new jsPDF();

    // 🔷 School Header
    doc.setFontSize(18);
    doc.setTextColor(40, 40, 40);
    doc.text("ABC PUBLIC SCHOOL", 105, 15, null, null, "center");

    doc.setFontSize(12);
    doc.text("CBSE Report Card", 105, 22, null, null, "center");

    // 🔷 Border
    doc.rect(5, 5, 200, 287);

    // 🔷 Student Info
    doc.setFontSize(11);
    doc.text("Name: Arjun Singh", 10, 35);
    doc.text("Class: 10-A", 10, 42);
    doc.text("Roll No: 23", 10, 49);

    doc.text(`Subject : ${selectedSubject}`, 140, 35);
    doc.text(`Date: ${selectedDate || "N/A"}`, 140, 42);

    const data =
      selectedSubject === "All"
        ? classTestData
        : classTestData.filter((item) => item.subject === selectedSubject);

    let grandTotal = 0;
    let grandObtained = 0;

    const tableData = data.map((item) => {
      const percentage = ((item.obtainedMarks / item.totalMarks) * 100).toFixed(
        1,
      );

      const grade = getGrade(percentage);
      const status =
        item.obtainedMarks >= item.totalMarks * 0.33 ? "Pass" : "Fail";

      grandTotal += item.totalMarks;
      grandObtained += item.obtainedMarks;

      return [
        item.subject,
        item.totalMarks,
        item.obtainedMarks,
        `${percentage}%`,
        grade,
        status,
      ];
    });

    // 🔷 Table
    autoTable(doc, {
      startY: 60,
      head: [["Subject", "Total", "Obtained", "Percentage", "Grade", "Result"]],
      body: tableData,
      styles: { halign: "center" },
      headStyles: { fillColor: [41, 128, 185] },
    });

    // 🔷 Summary
    const finalY = doc.lastAutoTable.finalY + 10;

    const overallPercentage = ((grandObtained / grandTotal) * 100).toFixed(1);

    const overallGrade = getGrade(overallPercentage);

    doc.setFontSize(12);
    doc.text(`Grand Total: ${grandObtained} / ${grandTotal}`, 10, finalY);
    doc.text(`Overall %: ${overallPercentage}%`, 10, finalY + 7);
    doc.text(`Overall Grade: ${overallGrade}`, 10, finalY + 14);

    // 🔷 Result Status
    const finalStatus = overallPercentage >= 33 ? "PASS" : "FAIL";

    doc.setTextColor(
      finalStatus === "PASS" ? 0 : 255,
      finalStatus === "PASS" ? 128 : 0,
      0,
    );
    doc.text(`Final Result: ${finalStatus}`, 140, finalY + 7);

    // 🔷 Signature Section
    doc.text("SGVM", 150, 260);
    doc.setTextColor(0, 0, 0);
    doc.line(20, 260, 80, 260);
    doc.text("Class Teacher", 30, 265);

    doc.line(130, 260, 190, 260);
    doc.text("Principal", 150, 265);

    // 🔷 Save
    doc.save("CBSE_Report_Card.pdf");
  };

  const ResultCard = ({ result, subjects }) => {
    const calculateTotal = (marks) =>
      Object.values(marks).reduce((a, b) => a + b, 0);

    const calculatePercentage = (marks) =>
      ((calculateTotal(marks) / (subjects.length * 100)) * 100).toFixed(1);

    const getResultStatus = (marks) =>
      Object.values(marks).some((m) => m < 33) ? "Fail" : "Pass";

    const total = calculateTotal(result.marks);
    const percentage = calculatePercentage(result.marks);
    const status = getResultStatus(result.marks);

    // 🔥 PDF Download (per exam)
    const handleDownload = () => {
      const doc = new jsPDF();

      doc.text("Student Result", 14, 15);
      doc.text(`Exam: ${result.exam} (${result.year})`, 14, 25);

      const tableData = subjects.map((sub) => [sub, result.marks[sub]]);

      autoTable(doc, {
        startY: 35,
        head: [["Subject", "Marks"]],
        body: tableData,
      });

      doc.text(`Total: ${total}`, 14, doc.lastAutoTable.finalY + 10);
      doc.text(`Percentage: ${percentage}%`, 14, doc.lastAutoTable.finalY + 18);
      doc.text(`Result: ${status}`, 14, doc.lastAutoTable.finalY + 26);

      doc.save(`${result.exam}-${result.year}.pdf`);
    };

    return (
      <div className="bg-white rounded-2xl shadow p-4 space-y-3 hover:shadow-lg transition">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-lg text-blue-600">
            {result.exam} ({result.year})
          </h2>

          <span
            className={`px-3 py-1 text-sm rounded-full font-semibold ${
              status === "Pass"
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
            }`}
          >
            {status}
          </span>
        </div>

        {/* Subjects */}
        <div className="grid grid-cols-2 gap-2">
          {subjects.map((sub, i) => (
            <div
              key={i}
              className="flex justify-between bg-gray-100 px-3 py-2 rounded-lg text-sm"
            >
              <span>{sub}</span>
              <span className="font-semibold">{result.marks[sub]}</span>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="flex justify-between text-sm font-medium">
          <span>Total: {total}</span>
          <span>{percentage}%</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 h-2 rounded-full">
          <div
            className="bg-blue-500 h-2 rounded-full"
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* Download */}
        <button
          onClick={handleDownload}
          className="w-full flex items-center justify-center gap-2 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
        >
          <BiDownArrowAlt /> Download
        </button>
      </div>
    );
  };
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Student Results</h1>

      <div className="flex gap-4">
        <select
          value={examType}
          onChange={(e) => setExamType(e.target.value)}
          className="p-2 border rounded bg-blue-600 text-white"
        >
          <option>All</option>
          <option>Term 1</option>
          <option>Term 2</option>
          <option>Class Test</option>
        </select>

        {examType === "Class Test" ? (
          <div className="flex gap-4">
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="p-2 border rounded bg-blue-600 text-white"
            >
              <option value="All">All Subjects</option>
              {subjects.map((sub, i) => (
                <option key={i} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="p-2 border rounded"
            />
          </div>
        ) : null}

        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="p-2 border rounded bg-blue-600 text-white"
        >
          <option>2026</option>
          <option>2025</option>
        </select>
        {(examType !== "All" || year !== "2026") && (
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              setExamType("All");
              setYear("2026");
              setSelectedSubject("All");
              setSelectedDate("");
            }}
          >
            Clear
          </Button>
        )}
      </div>

      <div className="bg-white p-4 rounded-2xl shadow">
        <h2 className="text-lg font-bold mb-3">Result History</h2>

        {examType === "Class Test" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filteredClassTestData.map((item, index) => (
              <ClassTestCard key={index} item={item} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredResults.map((r) => (
              <ResultCard key={r.id} result={r} subjects={subjects} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentResult;
