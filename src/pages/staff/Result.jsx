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
} from "@mui/material";
import { Formik } from "formik";

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
      name: "Rahul",
      marks: {
        Math: { obtained: "", max: 100 },
      },
    },
  ]);

  useEffect(() => {
    if (examData) {
      setActiveStep(1);
    }
  }, []);

  const handleAddStudent = () => {
    setStudents([
      ...students,
      {
        name: "",
        rollNo: students.length + 1,
        marks: createEmptyMarks(),
      },
    ]);
  };

  const role = "subject"; // "subject" | "class"

  const [subjectName, setSubjectName] = useState(""); // only for subject teacher
  const [selectedSubject, setSelectedSubject] = useState("Maths");
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
                label="Exam Term"
                name="term"
                value={values.term}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Year"
                name="year"
                value={values.year}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Class"
                name="class"
                value={values.class}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Section"
                name="section"
                value={values.section}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />

              <Button type="submit" variant="contained">
                Save & Continue
              </Button>
            </form>
          )}
        </Formik>
      )}
      {role === "subject" ? (
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
                <TextField
                  select
                  label="Select Subject"
                  value={subjectName}
                  onChange={(e) => setSubjectName(e.target.value)}
                  SelectProps={{ native: true }}
                  sx={{ mb: 2, minWidth: 200 }}
                >
                  <option value="">Select Subject</option>
                  {subjects.map((sub) => (
                    <option key={sub} value={sub}>
                      {sub}
                    </option>
                  ))}
                </TextField>
              </TableRow>
            </TableHead>

            <TableBody>
              {students.map((student, rowIndex) => (
                <TableRow key={rowIndex}>
                  <TableCell>{student.rollNo}</TableCell>
                  <TableCell>{student.name}</TableCell>

                  <TableCell>
                    <TextField
                      type="number"
                      variant="standard"
                      value={student.marks?.[subjectName]?.obtained || ""}
                      onChange={(e) => {
                        const value = e.target.value;

                        // ❗ validation (optional but important)
                        if (maxMarks && Number(value) > Number(maxMarks)) {
                          return;
                        }

                        const updated = [...students];

                        // ✅ initialize subject if not exists
                        if (!updated[rowIndex].marks) {
                          updated[rowIndex].marks = {};
                        }

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
                        style: {
                          textAlign: "center",
                          width: "60px",
                        },
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : null}

      {/* 🟩 STEP 2 */}
      {activeStep === 1 && (
        <>
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
                    {/* Roll No */}
                    <TableCell>
                      <TextField
                        variant="standard"
                        value={student.rollNo}
                        onChange={(e) => {
                          const updated = [...students];
                          updated[rowIndex].rollNo = e.target.value;
                          setStudents(updated);
                        }}
                        inputProps={{ style: { width: "50px" } }}
                      />
                    </TableCell>

                    {/* Name */}
                    <TableCell>
                      <TextField
                        variant="standard"
                        value={student.name}
                        onChange={(e) => {
                          const updated = [...students];
                          updated[rowIndex].name = e.target.value;
                          setStudents(updated);
                        }}
                      />
                    </TableCell>

                    {/* Subjects */}
                    {subjects.map((sub, colIndex) => (
                      <TableCell key={colIndex}>
                        <TextField
                          variant="standard"
                          value={student.marks[sub]}
                          onChange={(e) => {
                            const updated = [...students];
                            updated[rowIndex].marks[sub] = e.target.value;
                            setStudents(updated);
                          }}
                          inputProps={{
                            style: {
                              textAlign: "center",
                              width: "50px",
                            },
                          }}
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* ➕ Add Student */}
          <Button variant="outlined" sx={{ mt: 2 }} onClick={handleAddStudent}>
            Add Student
          </Button>

          {/* ✅ Submit */}
          <Button
            variant="contained"
            sx={{ mt: 2, ml: 2 }}
            onClick={() => {
              const finalData = {
                exam: examData,
                students: students,
              };

              console.log("FINAL DATA 👉", finalData);
            }}
          >
            Submit Results
          </Button>
        </>
      )}
    </div>
  );
};

export default Result;
