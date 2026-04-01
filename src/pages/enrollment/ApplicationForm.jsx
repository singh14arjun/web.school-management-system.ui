import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextField, MenuItem, Button, Stepper, Step, StepLabel } from "@mui/material";
import { MdArrowBack, MdCloudUpload, MdCheckCircle } from "react-icons/md";
import { toast } from "react-toastify";
import { inquiries, requiredDocuments } from "../../data/enrollment";

const steps = ["Student Details", "Parent / Guardian", "Documents Upload", "Review & Submit"];

const classOptions = [
  "Nursery", "KG", "Class 1", "Class 2", "Class 3", "Class 4",
  "Class 5", "Class 6", "Class 7", "Class 8", "Class 9", "Class 10",
  "Class 11", "Class 12",
];

const validationSchemas = [
  Yup.object({
    studentName: Yup.string().required("Required"),
    dob: Yup.string().required("Required"),
    gender: Yup.string().required("Required"),
    classApplied: Yup.string().required("Required"),
    previousSchool: Yup.string(),
  }),
  Yup.object({
    fatherName: Yup.string().required("Required"),
    fatherPhone: Yup.string().matches(/^[0-9]{10}$/, "Must be 10 digits").required("Required"),
    fatherEmail: Yup.string().email("Invalid email").required("Required"),
    fatherOccupation: Yup.string().required("Required"),
    motherName: Yup.string().required("Required"),
    motherPhone: Yup.string().matches(/^[0-9]{10}$/, "Must be 10 digits").required("Required"),
    address: Yup.string().required("Required"),
  }),
  Yup.object({}),
  Yup.object({}),
];

const ApplicationForm = () => {
  const navigate = useNavigate();
  const { inquiryId } = useParams();
  const [activeStep, setActiveStep] = useState(0);
  const [uploadedDocs, setUploadedDocs] = useState({});

  const inquiry = inquiryId ? inquiries.find((i) => i.id === inquiryId) : null;

  const initialValues = {
    studentName: inquiry?.studentName || "",
    dob: "",
    gender: "",
    bloodGroup: "",
    religion: "",
    casteCategory: "General",
    classApplied: inquiry?.classApplied || "",
    previousSchool: inquiry?.previousSchool || "",
    fatherName: inquiry?.parentName || "",
    fatherPhone: inquiry?.phone || "",
    fatherEmail: inquiry?.email || "",
    fatherOccupation: "",
    motherName: "",
    motherPhone: "",
    motherEmail: "",
    motherOccupation: "",
    guardianName: "",
    guardianRelation: "",
    guardianPhone: "",
    address: "",
    permanentAddress: "",
    allergies: "",
    medicalConditions: "",
  };

  const handleDocUpload = (docName) => {
    setUploadedDocs((prev) => ({ ...prev, [docName]: true }));
    toast.success(`${docName} uploaded`);
  };

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate("/enrollment")} className="p-2 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer">
          <MdArrowBack className="text-xl text-slate-600" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Admission Application</h1>
          <p className="text-sm text-slate-500">
            {inquiry ? `Converting inquiry: ${inquiry.studentName}` : "New direct application"}
          </p>
        </div>
      </div>

      {/* Stepper */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5 mb-6">
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>

      {/* Form */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchemas[activeStep]}
          onSubmit={(values, { setSubmitting }) => {
            if (activeStep < steps.length - 1) {
              setActiveStep((prev) => prev + 1);
              setSubmitting(false);
            } else {
              setTimeout(() => {
                console.log("Application submitted:", { ...values, documents: uploadedDocs });
                toast.success("Application submitted successfully! Under review.");
                setSubmitting(false);
                navigate("/enrollment");
              }, 500);
            }
          }}
        >
          {({ values, handleChange, errors, touched, isSubmitting, validateForm, setTouched }) => (
            <Form>
              {/* Step 1: Student Details */}
              {activeStep === 0 && (
                <div className="space-y-1 animate-fade-in">
                  <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Personal Information</p>
                  <TextField
                    fullWidth margin="dense" size="small" label="Student Full Name" name="studentName"
                    value={values.studentName} onChange={handleChange}
                    error={touched.studentName && Boolean(errors.studentName)}
                    helperText={touched.studentName && errors.studentName}
                  />
                  <div className="grid grid-cols-3 gap-3">
                    <TextField
                      fullWidth margin="dense" size="small" label="Date of Birth" name="dob" type="date"
                      value={values.dob} onChange={handleChange} InputLabelProps={{ shrink: true }}
                      error={touched.dob && Boolean(errors.dob)}
                      helperText={touched.dob && errors.dob}
                    />
                    <TextField
                      fullWidth margin="dense" size="small" label="Gender" name="gender" select
                      value={values.gender} onChange={handleChange}
                      error={touched.gender && Boolean(errors.gender)}
                      helperText={touched.gender && errors.gender}
                    >
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </TextField>
                    <TextField
                      fullWidth margin="dense" size="small" label="Blood Group" name="bloodGroup" select
                      value={values.bloodGroup} onChange={handleChange}
                    >
                      {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
                        <MenuItem key={bg} value={bg}>{bg}</MenuItem>
                      ))}
                    </TextField>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <TextField
                      fullWidth margin="dense" size="small" label="Religion" name="religion"
                      value={values.religion} onChange={handleChange}
                    />
                    <TextField
                      fullWidth margin="dense" size="small" label="Category" name="casteCategory" select
                      value={values.casteCategory} onChange={handleChange}
                    >
                      {["General", "SC", "ST", "OBC", "EWS"].map((c) => (
                        <MenuItem key={c} value={c}>{c}</MenuItem>
                      ))}
                    </TextField>
                    <TextField
                      fullWidth margin="dense" size="small" label="Class Applied" name="classApplied" select
                      value={values.classApplied} onChange={handleChange}
                      error={touched.classApplied && Boolean(errors.classApplied)}
                      helperText={touched.classApplied && errors.classApplied}
                    >
                      {classOptions.map((cls) => (
                        <MenuItem key={cls} value={cls}>{cls}</MenuItem>
                      ))}
                    </TextField>
                  </div>
                  <TextField
                    fullWidth margin="dense" size="small" label="Previous School" name="previousSchool"
                    value={values.previousSchool} onChange={handleChange}
                    placeholder="Leave blank if first admission"
                  />

                  <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mt-5 mb-3">Health Information</p>
                  <div className="grid grid-cols-2 gap-3">
                    <TextField
                      fullWidth margin="dense" size="small" label="Known Allergies" name="allergies"
                      value={values.allergies} onChange={handleChange} placeholder="None"
                    />
                    <TextField
                      fullWidth margin="dense" size="small" label="Medical Conditions" name="medicalConditions"
                      value={values.medicalConditions} onChange={handleChange} placeholder="None"
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Parent / Guardian */}
              {activeStep === 1 && (
                <div className="space-y-1 animate-fade-in">
                  <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Father&apos;s Details</p>
                  <div className="grid grid-cols-2 gap-3">
                    <TextField
                      fullWidth margin="dense" size="small" label="Father's Name" name="fatherName"
                      value={values.fatherName} onChange={handleChange}
                      error={touched.fatherName && Boolean(errors.fatherName)}
                      helperText={touched.fatherName && errors.fatherName}
                    />
                    <TextField
                      fullWidth margin="dense" size="small" label="Occupation" name="fatherOccupation"
                      value={values.fatherOccupation} onChange={handleChange}
                      error={touched.fatherOccupation && Boolean(errors.fatherOccupation)}
                      helperText={touched.fatherOccupation && errors.fatherOccupation}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <TextField
                      fullWidth margin="dense" size="small" label="Phone" name="fatherPhone"
                      value={values.fatherPhone}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, "");
                        if (val.length <= 10) handleChange({ target: { name: "fatherPhone", value: val } });
                      }}
                      error={touched.fatherPhone && Boolean(errors.fatherPhone)}
                      helperText={touched.fatherPhone && errors.fatherPhone}
                    />
                    <TextField
                      fullWidth margin="dense" size="small" label="Email" name="fatherEmail"
                      value={values.fatherEmail} onChange={handleChange}
                      error={touched.fatherEmail && Boolean(errors.fatherEmail)}
                      helperText={touched.fatherEmail && errors.fatherEmail}
                    />
                  </div>

                  <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mt-5 mb-3">Mother&apos;s Details</p>
                  <div className="grid grid-cols-2 gap-3">
                    <TextField
                      fullWidth margin="dense" size="small" label="Mother's Name" name="motherName"
                      value={values.motherName} onChange={handleChange}
                      error={touched.motherName && Boolean(errors.motherName)}
                      helperText={touched.motherName && errors.motherName}
                    />
                    <TextField
                      fullWidth margin="dense" size="small" label="Occupation" name="motherOccupation"
                      value={values.motherOccupation} onChange={handleChange}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <TextField
                      fullWidth margin="dense" size="small" label="Phone" name="motherPhone"
                      value={values.motherPhone}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, "");
                        if (val.length <= 10) handleChange({ target: { name: "motherPhone", value: val } });
                      }}
                      error={touched.motherPhone && Boolean(errors.motherPhone)}
                      helperText={touched.motherPhone && errors.motherPhone}
                    />
                    <TextField
                      fullWidth margin="dense" size="small" label="Email" name="motherEmail"
                      value={values.motherEmail} onChange={handleChange}
                    />
                  </div>

                  <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mt-5 mb-3">Guardian (if different)</p>
                  <div className="grid grid-cols-3 gap-3">
                    <TextField fullWidth margin="dense" size="small" label="Guardian Name" name="guardianName" value={values.guardianName} onChange={handleChange} />
                    <TextField fullWidth margin="dense" size="small" label="Relation" name="guardianRelation" value={values.guardianRelation} onChange={handleChange} />
                    <TextField fullWidth margin="dense" size="small" label="Phone" name="guardianPhone" value={values.guardianPhone} onChange={handleChange} />
                  </div>

                  <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mt-5 mb-3">Address</p>
                  <TextField
                    fullWidth margin="dense" size="small" label="Current Address" name="address"
                    value={values.address} onChange={handleChange} multiline rows={2}
                    error={touched.address && Boolean(errors.address)}
                    helperText={touched.address && errors.address}
                  />
                  <TextField
                    fullWidth margin="dense" size="small" label="Permanent Address (if different)" name="permanentAddress"
                    value={values.permanentAddress} onChange={handleChange} multiline rows={2}
                  />
                </div>
              )}

              {/* Step 3: Documents */}
              {activeStep === 2 && (
                <div className="space-y-4 animate-fade-in">
                  <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Required Documents</p>
                  <p className="text-xs text-slate-400 mb-4">Upload all required documents. Accepted formats: PDF, JPG, PNG (Max 5MB each)</p>

                  <div className="space-y-3">
                    {requiredDocuments.map((doc, i) => (
                      <div key={doc} className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-300 animate-slide-up ${uploadedDocs[doc] ? "border-emerald-200 bg-emerald-50/50" : "border-slate-200 bg-slate-50/50"}`} style={{ animationDelay: `${i * 0.05}s` }}>
                        <div className="flex items-center gap-3">
                          {uploadedDocs[doc] ? (
                            <MdCheckCircle className="text-xl text-emerald-500" />
                          ) : (
                            <div className="w-5 h-5 rounded-full border-2 border-slate-300"></div>
                          )}
                          <span className={`text-sm font-medium ${uploadedDocs[doc] ? "text-emerald-700" : "text-slate-700"}`}>
                            {doc}
                          </span>
                        </div>
                        {uploadedDocs[doc] ? (
                          <span className="text-xs text-emerald-600 font-semibold">Uploaded</span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleDocUpload(doc)}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-all duration-200 cursor-pointer"
                          >
                            <MdCloudUpload className="text-base" />
                            Upload
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 p-3 bg-amber-50 rounded-xl border border-amber-200 mt-4">
                    <span className="text-amber-600 text-sm">
                      {Object.keys(uploadedDocs).length}/{requiredDocuments.length} documents uploaded.
                      {Object.keys(uploadedDocs).length < requiredDocuments.length && " You can still submit and upload remaining later."}
                    </span>
                  </div>
                </div>
              )}

              {/* Step 4: Review */}
              {activeStep === 3 && (
                <div className="space-y-5 animate-fade-in">
                  <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Review Application</p>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="text-sm font-bold text-slate-700 border-b border-slate-200 pb-1">Student Details</h4>
                      <div className="space-y-1.5 text-sm">
                        <p><span className="text-slate-500">Name:</span> <span className="font-medium">{values.studentName || "\u2014"}</span></p>
                        <p><span className="text-slate-500">DOB:</span> <span className="font-medium">{values.dob || "\u2014"}</span></p>
                        <p><span className="text-slate-500">Gender:</span> <span className="font-medium">{values.gender || "\u2014"}</span></p>
                        <p><span className="text-slate-500">Class:</span> <span className="font-medium">{values.classApplied || "\u2014"}</span></p>
                        <p><span className="text-slate-500">Previous School:</span> <span className="font-medium">{values.previousSchool || "N/A"}</span></p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-sm font-bold text-slate-700 border-b border-slate-200 pb-1">Parent Details</h4>
                      <div className="space-y-1.5 text-sm">
                        <p><span className="text-slate-500">Father:</span> <span className="font-medium">{values.fatherName || "\u2014"}</span></p>
                        <p><span className="text-slate-500">Phone:</span> <span className="font-medium">{values.fatherPhone || "\u2014"}</span></p>
                        <p><span className="text-slate-500">Mother:</span> <span className="font-medium">{values.motherName || "\u2014"}</span></p>
                        <p><span className="text-slate-500">Address:</span> <span className="font-medium">{values.address || "\u2014"}</span></p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-slate-700 border-b border-slate-200 pb-1 mb-2">Documents</h4>
                    <div className="flex flex-wrap gap-2">
                      {requiredDocuments.map((doc) => (
                        <span
                          key={doc}
                          className={`text-xs px-3 py-1.5 rounded-full font-medium ${uploadedDocs[doc]
                            ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                            : "bg-red-50 text-red-500 border border-red-200"
                            }`}
                        >
                          {uploadedDocs[doc] ? "+" : "x"} {doc}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between pt-6 mt-6 border-t border-slate-100">
                <Button
                  variant="outlined"
                  disabled={activeStep === 0}
                  onClick={() => setActiveStep((prev) => prev - 1)}
                  sx={{ borderColor: "#cbd5e1", color: "#475569", "&:hover": { borderColor: "#94a3b8", bgcolor: "#f8fafc" } }}
                >
                  Back
                </Button>

                {activeStep < steps.length - 1 ? (
                  <Button
                    variant="contained"
                    sx={{ bgcolor: "#2563eb", "&:hover": { bgcolor: "#1d4ed8" } }}
                    onClick={async () => {
                      const errs = await validateForm();
                      if (activeStep === 0) {
                        setTouched({ studentName: true, dob: true, gender: true, classApplied: true });
                      } else if (activeStep === 1) {
                        setTouched({ fatherName: true, fatherPhone: true, fatherEmail: true, fatherOccupation: true, motherName: true, motherPhone: true, address: true });
                      }
                      if (Object.keys(errs).length === 0) {
                        setActiveStep((prev) => prev + 1);
                      }
                    }}
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting}
                    sx={{ bgcolor: "#16a34a", "&:hover": { bgcolor: "#15803d" } }}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </Button>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ApplicationForm;