import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  MenuItem,
} from "@mui/material";
import { Formik } from "formik";
import { toast } from "react-toastify";

const Result = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [examData, setExamData] = useState(() => {
    return JSON.parse(localStorage.getItem("examData")) || null;
  });

  const subjects = [
    "Math",
    "Science",
    "History",
    "English",
    "Computer Science",
  ];

  const createEmptyMarks = () => {
    const obj = {};
    subjects.forEach((sub) => {
      obj[sub] = "";
    });
    return obj;
  };

  const [students, setStudents] = useState([
    {
      rollNo: 1,
      name: "Rahul Sharma",
      marks: {
        Math: "",
        Science: "",
        History: "",
        English: "",
        "Computer Science": "",
      },
    },
    {
      rollNo: 2,
      name: "Amit Verma",
      marks: createEmptyMarks(),
    },
    {
      rollNo: 3,
      name: "Priya Singh",
      marks: createEmptyMarks(),
    },
  ]);

  useEffect(() => {
    if (examData) {
      setActiveStep(1);
    }
  }, []);

  const handleSubmitResult = () => {
    toast.success("Result Updated Successfully");
    console.log({ examData, students });
  };

  // const handleAddStudent = () => {
  //   setStudents([
  //     ...students,
  //     {
  //       name: "",
  //       rollNo: students.length + 1,
  //       marks: createEmptyMarks(),
  //     },
  //   ]);
  // };

  const finalData = {
    exam: examData,
    results: students.map((s) => ({
      rollNo: s.rollNo,
      name: s.name,
      marks: s.marks,
    })),
  };
  const role = "subject"; // "subject" | "class"

  const [subjectName, setSubjectName] = useState(""); // only for subject teacher
  const [selectedSubject, setSelectedSubject] = useState();
  const [maxMarks, setMaxMarks] = useState("");
  return (
    <div style={{ padding: "20px" }}>
      <h1 className="text-3xl font-bold mb-6">Results</h1>

      {/* ✅ Stepper */}
      <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
        <Step>
          <StepLabel>Exam Details</StepLabel>
        </Step>
        <Step>
          <StepLabel>Student Results</StepLabel>
        </Step>
      </Stepper>

      {/* ✅ Step 1 Button */}
      {examData && (
        <Paper style={{ padding: "10px", marginBottom: "15px" }}>
          <b>
            {examData.term} | {examData.year} | Class {examData.class}-
            {examData.section}
          </b>

          <Button
            size="small"
            onClick={() => setActiveStep(0)}
            style={{ marginLeft: "10px" }}
          >
            Fill Step 1
          </Button>
        </Paper>
      )}

      {activeStep === 0 && (
        <Formik
          initialValues={{
            examType: "",
            term: "",
            year: "",
            class: "",
            section: "",
          }}
          onSubmit={(values) => {
            setExamData(values);
            localStorage.setItem("examData", JSON.stringify(values));
            setActiveStep(1);
          }}
        >
          {({ values, handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <TextField
                select
                label="Exam Type"
                name="examType"
                value={values.examType}
                onChange={handleChange}
                fullWidth
                margin="normal"
              >
                <MenuItem value="Class Test Written">
                  Class Test Written
                </MenuItem>
                <MenuItem value="Class Test Oral">Class Test Oral</MenuItem>
                <MenuItem value="Term Exam">Term Exam</MenuItem>
              </TextField>

              {values.examType === "Term Exam" && (
                <TextField
                  select
                  label="Exam Term"
                  name="term"
                  value={values.term}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                >
                  <MenuItem value="Unit Test 1">Unit Test 1</MenuItem>
                  <MenuItem value="Unit Test 2">Unit Test 2</MenuItem>
                  <MenuItem value="Mid Term">Mid Term</MenuItem>
                  <MenuItem value="Final Exam">Final Exam</MenuItem>
                </TextField>
              )}

              <TextField
                select
                label="Year"
                name="year"
                value={values.year}
                onChange={handleChange}
                fullWidth
                margin="normal"
              >
                <MenuItem value="2024">2024</MenuItem>
                <MenuItem value="2025">2025</MenuItem>
                <MenuItem value="2026">2026</MenuItem>
              </TextField>

              <TextField
                select
                label="Class"
                name="class"
                value={values.class}
                onChange={handleChange}
                fullWidth
                margin="normal"
              >
                {[
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
                  "Class 11",
                  "Class 12",
                ].map((cls) => (
                  <MenuItem key={cls} value={cls}>
                    {cls}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                select
                label="Section"
                name="section"
                value={values.section}
                onChange={handleChange}
                fullWidth
                margin="normal"
              >
                {["A", "B", "C", "D"].map((sec) => (
                  <MenuItem key={sec} value={sec}>
                    Section {sec}
                  </MenuItem>
                ))}
              </TextField>

              <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                Save & Continue
              </Button>
            </form>
          )}
        </Formik>
      )}

      {activeStep === 1 &&
        (examData?.examType === "Term Exam" ? (
          /* 🔹 TERM EXAM UI */
          <>
            <Paper sx={{ p: 2, mb: 2 }}>
              <b>
                {examData.examType} | {examData.term || "-"} | {examData.year}
              </b>
              <br />
              Class: {examData.class} - {examData.section}
            </Paper>

            <TableContainer component={Paper} sx={{ mt: 3 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <b>Roll No</b>
                    </TableCell>
                    <TableCell>
                      <b>Name</b>
                    </TableCell>

                    {subjects.map((sub) => (
                      <TableCell key={sub} align="center">
                        <b>{sub}</b>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {students.map((student, rowIndex) => (
                    <TableRow key={rowIndex}>
                      <TableCell>
                        <b>{student.rollNo}</b>
                      </TableCell>
                      <TableCell>
                        <b>{student.name}</b>
                      </TableCell>

                      {subjects.map((sub, colIndex) => (
                        <TableCell key={colIndex} align="center">
                          <TextField
                            size="small"
                            value={student.marks[sub]}
                            onChange={(e) => {
                              const updated = [...students];
                              updated[rowIndex].marks[sub] = e.target.value;
                              setStudents(updated);
                            }}
                            inputProps={{
                              style: { textAlign: "center", width: 60 },
                            }}
                          />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Button
              variant="contained"
              sx={{ mt: 2 }}
              onClick={handleSubmitResult}
            >
              Submit Results
            </Button>
          </>
        ) : (
          /* 🔹 CLASS TEST / ORAL UI */
          <>
            <div className="flex gap-4 mb-4">
              <TextField
                select
                label="Select Subject"
                value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
                sx={{ minWidth: 200 }}
              >
                {subjects.map((sub) => (
                  <MenuItem key={sub} value={sub}>
                    {sub}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                label="Max Marks"
                type="number"
                value={maxMarks}
                onChange={(e) => setMaxMarks(e.target.value)}
              />
            </div>

            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <b>Roll No</b>
                    </TableCell>
                    <TableCell>
                      <b>Name</b>
                    </TableCell>
                    <TableCell align="center">
                      <b>{subjectName || "Marks"}</b>
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {students.map((student, rowIndex) => (
                    <TableRow key={rowIndex}>
                      <TableCell>{student.rollNo}</TableCell>
                      <TableCell>{student.name}</TableCell>

                      <TableCell align="center">
                        <TextField
                          type="number"
                          size="small"
                          value={student.marks?.[subjectName]?.obtained || ""}
                          onChange={(e) => {
                            const value = e.target.value;

                            if (maxMarks && Number(value) > Number(maxMarks))
                              return;

                            const updated = [...students];

                            if (!updated[rowIndex].marks[subjectName]) {
                              updated[rowIndex].marks[subjectName] = {
                                obtained: "",
                                max: maxMarks,
                              };
                            }

                            updated[rowIndex].marks[subjectName] = {
                              obtained: value,
                              max: maxMarks,
                            };

                            setStudents(updated);
                          }}
                          inputProps={{
                            style: { textAlign: "center", width: 60 },
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Button
              variant="contained"
              sx={{ mt: 2 }}
              onClick={handleSubmitResult}
            >
              Submit Results
            </Button>
          </>
        ))}
    </div>
  );
};

export default Result;
