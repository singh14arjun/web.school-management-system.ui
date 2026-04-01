import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextField, MenuItem, Button, Box } from "@mui/material";
import { MdArrowBack } from "react-icons/md";
import { toast } from "react-toastify";
import { inquirySources } from "../../data/enrollment";

const classOptions = [
  "Nursery", "KG", "Class 1", "Class 2", "Class 3", "Class 4",
  "Class 5", "Class 6", "Class 7", "Class 8", "Class 9", "Class 10",
  "Class 11", "Class 12",
];

const validationSchema = Yup.object({
  studentName: Yup.string().required("Student name is required"),
  parentName: Yup.string().required("Parent name is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
    .required("Phone is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  classApplied: Yup.string().required("Class is required"),
  source: Yup.string().required("Source is required"),
});

const NewInquiry = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto mt-16 text-center animate-scale-in">
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-8">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-float">
            <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">Inquiry Submitted!</h2>
          <p className="text-slate-500 mb-6">The inquiry has been recorded. You can convert it to an application from the Enrollment dashboard.</p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => setSubmitted(false)}
              className="px-5 py-2.5 text-sm font-semibold bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-all duration-200 cursor-pointer"
            >
              Add Another
            </button>
            <button
              onClick={() => navigate("/enrollment")}
              className="px-5 py-2.5 text-sm font-semibold bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200 cursor-pointer"
            >
              Go to Enrollment
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate("/enrollment")}
          className="p-2 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer"
        >
          <MdArrowBack className="text-xl text-slate-600" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">New Admission Inquiry</h1>
          <p className="text-sm text-slate-500">Step 1 of the enrollment process</p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
        <Formik
          initialValues={{
            studentName: "",
            parentName: "",
            phone: "",
            email: "",
            classApplied: "",
            previousSchool: "",
            source: "",
            notes: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              console.log("Inquiry submitted:", values);
              toast.success("Inquiry submitted successfully!");
              setSubmitting(false);
              setSubmitted(true);
            }, 500);
          }}
        >
          {({ values, handleChange, errors, touched, isSubmitting }) => (
            <Form className="space-y-1">
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Student Information</p>

              <TextField
                fullWidth margin="dense" label="Student Full Name" name="studentName"
                value={values.studentName} onChange={handleChange}
                error={touched.studentName && Boolean(errors.studentName)}
                helperText={touched.studentName && errors.studentName}
                size="small"
              />

              <div className="grid grid-cols-2 gap-3">
                <TextField
                  fullWidth margin="dense" label="Class Applied For" name="classApplied"
                  value={values.classApplied} onChange={handleChange} select
                  error={touched.classApplied && Boolean(errors.classApplied)}
                  helperText={touched.classApplied && errors.classApplied}
                  size="small"
                >
                  {classOptions.map((cls) => (
                    <MenuItem key={cls} value={cls}>{cls}</MenuItem>
                  ))}
                </TextField>

                <TextField
                  fullWidth margin="dense" label="Previous School" name="previousSchool"
                  value={values.previousSchool} onChange={handleChange}
                  size="small" placeholder="Leave blank if first school"
                />
              </div>

              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mt-5 mb-3">Parent / Guardian</p>

              <TextField
                fullWidth margin="dense" label="Parent / Guardian Name" name="parentName"
                value={values.parentName} onChange={handleChange}
                error={touched.parentName && Boolean(errors.parentName)}
                helperText={touched.parentName && errors.parentName}
                size="small"
              />

              <div className="grid grid-cols-2 gap-3">
                <TextField
                  fullWidth margin="dense" label="Phone Number" name="phone"
                  value={values.phone}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "");
                    if (val.length <= 10) handleChange({ target: { name: "phone", value: val } });
                  }}
                  error={touched.phone && Boolean(errors.phone)}
                  helperText={touched.phone && errors.phone}
                  size="small"
                />
                <TextField
                  fullWidth margin="dense" label="Email Address" name="email"
                  value={values.email} onChange={handleChange}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  size="small"
                />
              </div>

              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mt-5 mb-3">Inquiry Details</p>

              <div className="grid grid-cols-2 gap-3">
                <TextField
                  fullWidth margin="dense" label="Inquiry Source" name="source"
                  value={values.source} onChange={handleChange} select
                  error={touched.source && Boolean(errors.source)}
                  helperText={touched.source && errors.source}
                  size="small"
                >
                  {inquirySources.map((s) => (
                    <MenuItem key={s} value={s}>{s}</MenuItem>
                  ))}
                </TextField>
              </div>

              <TextField
                fullWidth margin="dense" label="Notes / Remarks" name="notes"
                value={values.notes} onChange={handleChange}
                multiline rows={3} size="small"
                placeholder="Any special requirements or notes..."
              />

              <Box className="flex gap-3 pt-4">
                <Button
                  variant="outlined"
                  onClick={() => navigate("/enrollment")}
                  className="flex-1"
                  sx={{ borderColor: "#cbd5e1", color: "#475569", "&:hover": { borderColor: "#94a3b8", bgcolor: "#f8fafc" } }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting}
                  className="flex-1"
                  sx={{ bgcolor: "#2563eb", "&:hover": { bgcolor: "#1d4ed8" } }}
                >
                  {isSubmitting ? "Submitting..." : "Submit Inquiry"}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default NewInquiry;