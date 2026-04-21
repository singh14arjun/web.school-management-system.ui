import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { ErrorMessage, Formik } from "formik";
import React from "react";
import { BiPencil, BiTrash } from "react-icons/bi";
import { FaClipboardList } from "react-icons/fa";
// import { Pencil, Trash2, ClipboardList } from "lucide-react";
import * as Yup from "yup";
import { toast } from "react-toastify";
const Card = ({ status, title, desc, progress, date, completed }) => {
  const percent =
    (parseInt(progress.split("/")[0]) / parseInt(progress.split("/")[1])) * 100;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 w-full">
      <div className="flex justify-between items-center mb-4">
        <span
          className={`text-xs px-3 py-1 rounded-full font-semibold ${
            status === "ACTIVE"
              ? "bg-orange-100 text-orange-600"
              : "bg-blue-100 text-blue-600"
          }`}
        >
          {status}
        </span>

        <div className="flex gap-3 text-gray-400">
          <BiPencil size={16} className="cursor-pointer" />
          <BiTrash size={16} className="cursor-pointer" />
        </div>
      </div>

      <h3
        className={`text-lg font-semibold mb-2 ${status !== "ACTIVE" && "text-blue-600"}`}
      >
        {title}
      </h3>

      <p className="text-gray-500 text-sm mb-4">{desc}</p>

      <hr className="mb-4" />

      <div className="flex justify-between text-sm font-medium mb-2">
        <span className="text-gray-500">SUBMISSIONS</span>
        <span className="text-blue-600">{progress}</span>
      </div>

      <div className="w-full bg-gray-200 h-2 rounded-full mb-4">
        <div
          className="bg-blue-600 h-2 rounded-full"
          style={{ width: `${percent}%` }}
        ></div>
      </div>

      <div className="flex items-center text-sm text-gray-500 gap-2">
        <FaClipboardList size={16} />
        <span>{completed ? `Completed: ${date}` : `Due: ${date}`}</span>
      </div>
    </div>
  );
};

const Assignment = () => {
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    classLevel: Yup.string().required("Class level is required"),
    section: Yup.string().required("Section is required"),
    subject: Yup.string().required("Subject is required"),
    dueDate: Yup.date().required("Due date is required"),
    description: Yup.string().required("Description is required"),
  });

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
    "Class 11 Arts",
    "Class 11 Math",
    "Class 12 Commerce",
    "Class 12 Science",
    "Class 12 Arts",
    "Class 12 Math",
  ];
  const listOfSections = ["Section A", "Section B", "Section C", "Section D"];
  const listOfSubjects = [
    "Mathematics",
    "Science",
    "Social Studies",
    "Computer Science",
    "English",
    "Physical Education",
    "Art",
    "Music",
    "Foreign Language",
    "Health Education",
    "Biology",
    "Chemistry",
    "Physics",
    "History",
    "Geography",
  ];
  return (
    <div>
      <header className="mb-10 flex flex-col gap-3">
        <p className="text-blue-600 text-2xl font-semibold">
          Academic Workflow
        </p>
        <p className="text-4xl font-bold">Assignments & Curations</p>
        <p className="text-lg ">
          Design and distribute new learning modules for your cohorts. Track
          submission velocity and maintain curriculum standards through
          real-time oversight.
        </p>
      </header>
      <section className="flex flex-col md:flex-row gap-5">
        <div className="w-full md:w-2/3 p-4 bg-white rounded-xl shadow">
          <div>
            <div className="text-lg font-bold text-blue-600">
              Add New Assignment
            </div>
            <Formik
              initialValues={{
                title: "",
                classLevel: "",
                section: "",
                subject: "",
                dueDate: "",
                description: "",
                files: [],
              }}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                setSubmitting(true);
                console.log("Submitted Data:", values);

                setTimeout(() => {
                  setSubmitting(false);
                  resetForm();
                  toast.success("Assignment created successfully!");
                }, 1000);
              }}
            >
              {({
                values,
                handleChange,
                setFieldValue,
                isSubmitting,
                handleBlur,
                handleSubmit,
              }) => (
                <form
                  onSubmit={handleSubmit}
                  className="mt-4 flex flex-col gap-2"
                >
                  <TextField
                    label="Assignment Title"
                    name="title"
                    fullWidth
                    margin="normal"
                    value={values.title}
                    onChange={handleChange}
                    handleBlur={handleBlur}
                  />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="text-red-500 text-sm"
                  />

                  <div className="flex gap-2 mt-2">
                    <FormControl fullWidth>
                      <InputLabel>Class Level</InputLabel>
                      <Select
                        name="classLevel"
                        value={values.classLevel}
                        onChange={handleChange}
                        label="Class Level"
                        MenuProps={{
                          PaperProps: {
                            style: {
                              maxHeight: 200,
                              overflowY: "auto",
                            },
                          },
                        }}
                      >
                        {listOfClassLevels.map((level, index) => (
                          <MenuItem key={index} value={level}>
                            {level}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <ErrorMessage
                      name="classLevel"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                    <FormControl fullWidth>
                      <InputLabel>Section</InputLabel>
                      <Select
                        name="section"
                        value={values.section}
                        onChange={handleChange}
                        label="Section"
                      >
                        {listOfSections.map((section, index) => (
                          <MenuItem key={index} value={section}>
                            {section}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <ErrorMessage
                      name="section"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div className="flex gap-2 items-center">
                    <FormControl fullWidth>
                      <InputLabel>Subject</InputLabel>
                      <Select
                        name="subject"
                        value={values.subject}
                        onChange={handleChange}
                        label="Subject"
                        MenuProps={{
                          PaperProps: {
                            style: {
                              maxHeight: 200,
                              overflowY: "auto",
                            },
                          },
                        }}
                      >
                        {listOfSubjects.map((subject, index) => (
                          <MenuItem key={index} value={subject}>
                            {subject}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <ErrorMessage
                      name="subject"
                      component="div"
                      className="text-red-500 text-sm"
                    />

                    <TextField
                      label="Due Date"
                      name="dueDate"
                      type="date"
                      fullWidth
                      margin="normal"
                      InputLabelProps={{ shrink: true }}
                      value={values.dueDate}
                      onChange={handleChange}
                    />
                    <ErrorMessage
                      name="dueDate"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <TextField
                    label="Description"
                    name="description"
                    fullWidth
                    margin="normal"
                    multiline
                    rows={4}
                    value={values.description}
                    onChange={handleChange}
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="text-red-500 text-sm"
                  />

                  <div className="mt-4">
                    <label className="block mb-2 font-medium ">
                      Upload Files (Optional)
                    </label>

                    <input
                      type="file"
                      multiple
                      onChange={(event) => {
                        const newFiles = Array.from(event.currentTarget.files);

                        setFieldValue("files", [...values.files, ...newFiles]);
                      }}
                      className="cursor-pointer"
                    />
                  </div>

                  {/* ✅ File List with Remove */}
                  {values.files.length > 0 && (
                    <div className="mt-3 bg-gray-50 p-3 rounded">
                      <p className="font-medium mb-2">Selected Files:</p>

                      {values.files.map((file, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center bg-white p-2 mb-2 rounded shadow-sm"
                        >
                          <span className="text-sm">{file.name}</span>

                          <button
                            type="button"
                            className="text-red-500 text-sm cursor-pointer"
                            onClick={() => {
                              const updatedFiles = values.files.filter(
                                (_, i) => i !== index,
                              );
                              setFieldValue("files", updatedFiles);
                            }}
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Buttons */}
                  <div className="mt-4">
                    <Button variant="outlined" color="error" sx={{ mr: 2 }}>
                      Cancel
                    </Button>

                    <Button variant="contained" color="primary" type="submit">
                      {isSubmitting ? "Creating..." : "Create Assignment"}
                    </Button>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
        <div className="w-full md:w-1/3">
          <div className="bg-blue-600 p-5 rounded-xl flex flex-col gap-4 relative pb-40">
            <p className="text-xl font-bold text-white ">Curator's Tip</p>
            <p className="text-lg text-white/50">
              Assignments with clear, bulleted descriptions see a 14% higher
              engagement rate. Consider attaching a rubric for faster grading.
            </p>
            <div className="flex gap-2">
              <button className="bg-white text-blue-600 hover:bg-gray-200 font-bold py-1 px-4 rounded">
                Active Learning
              </button>
              <button className="bg-white text-blue-600 hover:bg-gray-200 font-bold py-1 px-4 rounded">
                Digital Learning
              </button>
              <div className="w-20 h-20 border-14 border-slate-400 rounded-full absolute bottom-1 right-1 opacity-50"></div>
              <div></div>
            </div>
          </div>
        </div>
      </section>
      <div className="p-4 bg-gray-100 min-h-screen">
        <div className="flex flex-col gap-5 md:flex-row justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">Recent Assignments</h2>
            <p className="text-gray-500 text-sm">
              Review status and performance across your classes
            </p>
          </div>

          <div className="flex w-100 md:w-full bg-gray-200 rounded-xl p-1">
            <button className="px-4 py-1 bg-white rounded-lg text-blue-600 font-medium">
              All Assignments
            </button>
            <button className="px-4 py-1 text-gray-600">Drafts</button>
            <button className="px-4 py-1 text-gray-600">Archived</button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Card
            status="ACTIVE"
            title="Quantum Decoherence Study"
            desc="Exploring the transition from quantum to classical mechanics through interactive simulations."
            progress="24 / 32"
            date="Oct 24, 2023"
          />

          <Card
            status="PENDING REVIEW"
            title="Electromagnetic Field Analysis"
            desc="Calculate the flux through irregular surfaces using Maxwell's integral equations."
            progress="32 / 32"
            date="Oct 18, 2023"
            completed
          />
          <Card
            status="PENDING REVIEW"
            title="Electromagnetic Field Analysis"
            desc="Calculate the flux through irregular surfaces using Maxwell's integral equations."
            progress="30 / 32"
            date="Oct 18, 2023"
            completed
          />

          <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-2xl text-gray-400">
            <div className="bg-gray-200 p-4 rounded-full mb-3">
              <FaClipboardList size={24} />
            </div>
            <h3 className="font-medium">New Curriculum Block</h3>
            <p className="text-xs">QUICK DRAFT</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assignment;
