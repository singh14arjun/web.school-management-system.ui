import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextField, MenuItem, Button, Stepper, Step, StepLabel } from "@mui/material";
import { MdArrowBack } from "react-icons/md";
import { toast } from "react-toastify";
import { staffRoles, departments } from "../../data/staff";

const steps = ["Personal Info", "Professional Details", "Salary & Bank", "Review"];

const validationSchemas = [
  Yup.object({
    fullName: Yup.string().required("Required"),
    dob: Yup.string().required("Required"),
    gender: Yup.string().required("Required"),
    phone: Yup.string().matches(/^[0-9]{10}$/, "Must be 10 digits").required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
  }),
  Yup.object({
    designation: Yup.string().required("Required"),
    department: Yup.string().required("Required"),
    role: Yup.string().required("Required"),
    qualification: Yup.string().required("Required"),
    joiningDate: Yup.string().required("Required"),
  }),
  Yup.object({
    basicSalary: Yup.number().min(1, "Required").required("Required"),
    bankName: Yup.string().required("Required"),
    accountNo: Yup.string().required("Required"),
    ifsc: Yup.string().required("Required"),
  }),
  Yup.object({}),
];

const AddStaff = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate("/staff")} className="p-2 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer">
          <MdArrowBack className="text-xl text-slate-600" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Add New Staff</h1>
          <p className="text-sm text-slate-500">Create a new staff account with role assignment</p>
        </div>
      </div>

      {/* Stepper */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5 mb-6">
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}><StepLabel>{label}</StepLabel></Step>
          ))}
        </Stepper>
      </div>

      {/* Form */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
        <Formik
          initialValues={{
            fullName: "", dob: "", gender: "", bloodGroup: "", phone: "", email: "", address: "",
            designation: "", department: "", role: "", qualification: "", experience: "",
            specialization: "", joiningDate: "",
            basicSalary: "", hra: "", da: "",
            bankName: "", accountNo: "", ifsc: "",
          }}
          validationSchema={validationSchemas[activeStep]}
          onSubmit={(values, { setSubmitting }) => {
            if (activeStep < steps.length - 1) {
              setActiveStep((prev) => prev + 1);
              setSubmitting(false);
            } else {
              setTimeout(() => {
                console.log("Staff created:", values);
                toast.success("Staff member added successfully!");
                setSubmitting(false);
                navigate("/staff");
              }, 500);
            }
          }}
        >
          {({ values, handleChange, errors, touched, isSubmitting, validateForm, setTouched }) => (
            <Form>
              {/* Step 1: Personal */}
              {activeStep === 0 && (
                <div className="space-y-1 animate-fade-in">
                  <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Personal Details</p>
                  <TextField fullWidth margin="dense" size="small" label="Full Name" name="fullName"
                    value={values.fullName} onChange={handleChange}
                    error={touched.fullName && Boolean(errors.fullName)} helperText={touched.fullName && errors.fullName} />
                  <div className="grid grid-cols-3 gap-3">
                    <TextField fullWidth margin="dense" size="small" label="Date of Birth" name="dob" type="date"
                      value={values.dob} onChange={handleChange} InputLabelProps={{ shrink: true }}
                      error={touched.dob && Boolean(errors.dob)} helperText={touched.dob && errors.dob} />
                    <TextField fullWidth margin="dense" size="small" label="Gender" name="gender" select
                      value={values.gender} onChange={handleChange}
                      error={touched.gender && Boolean(errors.gender)} helperText={touched.gender && errors.gender}>
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </TextField>
                    <TextField fullWidth margin="dense" size="small" label="Blood Group" name="bloodGroup" select
                      value={values.bloodGroup} onChange={handleChange}>
                      {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
                        <MenuItem key={bg} value={bg}>{bg}</MenuItem>
                      ))}
                    </TextField>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <TextField fullWidth margin="dense" size="small" label="Phone" name="phone"
                      value={values.phone}
                      onChange={(e) => { const val = e.target.value.replace(/\D/g, ""); if (val.length <= 10) handleChange({ target: { name: "phone", value: val } }); }}
                      error={touched.phone && Boolean(errors.phone)} helperText={touched.phone && errors.phone} />
                    <TextField fullWidth margin="dense" size="small" label="Email" name="email"
                      value={values.email} onChange={handleChange}
                      error={touched.email && Boolean(errors.email)} helperText={touched.email && errors.email} />
                  </div>
                  <TextField fullWidth margin="dense" size="small" label="Address" name="address"
                    value={values.address} onChange={handleChange} multiline rows={2} />
                </div>
              )}

              {/* Step 2: Professional */}
              {activeStep === 1 && (
                <div className="space-y-1 animate-fade-in">
                  <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Professional Information</p>
                  <div className="grid grid-cols-2 gap-3">
                    <TextField fullWidth margin="dense" size="small" label="Designation" name="designation"
                      value={values.designation} onChange={handleChange}
                      error={touched.designation && Boolean(errors.designation)} helperText={touched.designation && errors.designation} />
                    <TextField fullWidth margin="dense" size="small" label="Department" name="department" select
                      value={values.department} onChange={handleChange}
                      error={touched.department && Boolean(errors.department)} helperText={touched.department && errors.department}>
                      {departments.map((d) => (
                        <MenuItem key={d} value={d}>{d}</MenuItem>
                      ))}
                    </TextField>
                  </div>
                  <TextField fullWidth margin="dense" size="small" label="System Role" name="role" select
                    value={values.role} onChange={handleChange}
                    error={touched.role && Boolean(errors.role)} helperText={touched.role && errors.role}>
                    {staffRoles.map((r) => (
                      <MenuItem key={r} value={r}>{r}</MenuItem>
                    ))}
                  </TextField>
                  <p className="text-xs text-slate-400 -mt-1 ml-1">Role determines system access permissions (RBAC)</p>

                  <div className="grid grid-cols-2 gap-3 mt-3">
                    <TextField fullWidth margin="dense" size="small" label="Qualification" name="qualification"
                      value={values.qualification} onChange={handleChange}
                      error={touched.qualification && Boolean(errors.qualification)} helperText={touched.qualification && errors.qualification} />
                    <TextField fullWidth margin="dense" size="small" label="Experience" name="experience"
                      value={values.experience} onChange={handleChange} placeholder="e.g., 5 years" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <TextField fullWidth margin="dense" size="small" label="Subject Specialization" name="specialization"
                      value={values.specialization} onChange={handleChange} placeholder="For teachers only" />
                    <TextField fullWidth margin="dense" size="small" label="Joining Date" name="joiningDate" type="date"
                      value={values.joiningDate} onChange={handleChange} InputLabelProps={{ shrink: true }}
                      error={touched.joiningDate && Boolean(errors.joiningDate)} helperText={touched.joiningDate && errors.joiningDate} />
                  </div>
                </div>
              )}

              {/* Step 3: Salary & Bank */}
              {activeStep === 2 && (
                <div className="space-y-1 animate-fade-in">
                  <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Salary Details</p>
                  <div className="grid grid-cols-3 gap-3">
                    <TextField fullWidth margin="dense" size="small" label="Basic Salary (Rs.)" name="basicSalary" type="number"
                      value={values.basicSalary} onChange={handleChange}
                      error={touched.basicSalary && Boolean(errors.basicSalary)} helperText={touched.basicSalary && errors.basicSalary} />
                    <TextField fullWidth margin="dense" size="small" label="HRA (Rs.)" name="hra" type="number"
                      value={values.hra} onChange={handleChange} />
                    <TextField fullWidth margin="dense" size="small" label="DA (Rs.)" name="da" type="number"
                      value={values.da} onChange={handleChange} />
                  </div>
                  {values.basicSalary && (
                    <div className="mt-2 p-3 bg-blue-50 rounded-xl border border-blue-100">
                      <p className="text-sm text-slate-600">Total Salary: <span className="font-bold text-blue-700">
                        Rs.{(Number(values.basicSalary || 0) + Number(values.hra || 0) + Number(values.da || 0)).toLocaleString()}
                      </span></p>
                    </div>
                  )}

                  <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mt-5 mb-3">Bank Account</p>
                  <div className="grid grid-cols-3 gap-3">
                    <TextField fullWidth margin="dense" size="small" label="Bank Name" name="bankName"
                      value={values.bankName} onChange={handleChange}
                      error={touched.bankName && Boolean(errors.bankName)} helperText={touched.bankName && errors.bankName} />
                    <TextField fullWidth margin="dense" size="small" label="Account Number" name="accountNo"
                      value={values.accountNo} onChange={handleChange}
                      error={touched.accountNo && Boolean(errors.accountNo)} helperText={touched.accountNo && errors.accountNo} />
                    <TextField fullWidth margin="dense" size="small" label="IFSC Code" name="ifsc"
                      value={values.ifsc} onChange={handleChange}
                      error={touched.ifsc && Boolean(errors.ifsc)} helperText={touched.ifsc && errors.ifsc} />
                  </div>
                </div>
              )}

              {/* Step 4: Review */}
              {activeStep === 3 && (
                <div className="space-y-5 animate-fade-in">
                  <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Review Staff Details</p>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="text-sm font-bold text-slate-700 border-b border-slate-200 pb-1">Personal</h4>
                      <div className="space-y-1.5 text-sm">
                        <p><span className="text-slate-500">Name:</span> <span className="font-medium">{values.fullName}</span></p>
                        <p><span className="text-slate-500">DOB:</span> <span className="font-medium">{values.dob}</span></p>
                        <p><span className="text-slate-500">Gender:</span> <span className="font-medium">{values.gender}</span></p>
                        <p><span className="text-slate-500">Phone:</span> <span className="font-medium">{values.phone}</span></p>
                        <p><span className="text-slate-500">Email:</span> <span className="font-medium">{values.email}</span></p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h4 className="text-sm font-bold text-slate-700 border-b border-slate-200 pb-1">Professional</h4>
                      <div className="space-y-1.5 text-sm">
                        <p><span className="text-slate-500">Role:</span> <span className="font-medium">{values.role}</span></p>
                        <p><span className="text-slate-500">Designation:</span> <span className="font-medium">{values.designation}</span></p>
                        <p><span className="text-slate-500">Department:</span> <span className="font-medium">{values.department}</span></p>
                        <p><span className="text-slate-500">Qualification:</span> <span className="font-medium">{values.qualification}</span></p>
                        <p><span className="text-slate-500">Joining:</span> <span className="font-medium">{values.joiningDate}</span></p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-700 border-b border-slate-200 pb-1 mb-2">Salary</h4>
                    <p className="text-sm">
                      Basic: Rs.{Number(values.basicSalary || 0).toLocaleString()} + HRA: Rs.{Number(values.hra || 0).toLocaleString()} + DA: Rs.{Number(values.da || 0).toLocaleString()}
                      = <span className="font-bold text-blue-600">Rs.{(Number(values.basicSalary || 0) + Number(values.hra || 0) + Number(values.da || 0)).toLocaleString()}</span>
                    </p>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between pt-6 mt-6 border-t border-slate-100">
                <Button variant="outlined" disabled={activeStep === 0} onClick={() => setActiveStep((prev) => prev - 1)}
                  sx={{ borderColor: "#cbd5e1", color: "#475569", "&:hover": { borderColor: "#94a3b8", bgcolor: "#f8fafc" } }}>
                  Back
                </Button>
                {activeStep < steps.length - 1 ? (
                  <Button variant="contained" sx={{ bgcolor: "#2563eb", "&:hover": { bgcolor: "#1d4ed8" } }}
                    onClick={async () => {
                      const errs = await validateForm();
                      const touchFields = {};
                      Object.keys(validationSchemas[activeStep].describe().fields).forEach((f) => { touchFields[f] = true; });
                      setTouched(touchFields);
                      if (Object.keys(errs).length === 0) setActiveStep((prev) => prev + 1);
                    }}>
                    Next
                  </Button>
                ) : (
                  <Button type="submit" variant="contained" disabled={isSubmitting}
                    sx={{ bgcolor: "#16a34a", "&:hover": { bgcolor: "#15803d" } }}>
                    {isSubmitting ? "Creating..." : "Create Staff Account"}
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

export default AddStaff;