import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextField, MenuItem, Button } from "@mui/material";
import { IoSchool } from "react-icons/io5";
import { MdCheckCircle, MdCloudUpload, MdArrowForward, MdArrowBack } from "react-icons/md";
import { FaBuilding, FaMapMarkerAlt, FaImage } from "react-icons/fa";
import { toast } from "react-toastify";

const steps = [
  { label: "School Info", icon: <FaBuilding />, desc: "Basic details about your school" },
  { label: "Address", icon: <FaMapMarkerAlt />, desc: "School location & contact" },
  { label: "Branding", icon: <FaImage />, desc: "Logo and school images" },
];

const labels = ["CBSE", "ICSE", "State Board", "IB", "Cambridge", "Other"];
const mediums = ["English", "Hindi", "English + Hindi", "Regional", "Other"];
const types = ["Primary", "Secondary", "Higher Secondary", "K-12", "Pre-school"];

const validationSchemas = [
  Yup.object({
    schoolName: Yup.string().required("School name is required"),
    schoolCode: Yup.string().required("School code is required"),
    affiliationId: Yup.string().required("Affiliation ID is required"),
    schoolPhone: Yup.string().matches(/^[0-9]{10}$/, "Must be 10 digits").required("Phone is required"),
    schoolEmail: Yup.string().email("Invalid email").required("Email is required"),
    label: Yup.string().required("Board is required"),
    medium: Yup.string().required("Medium is required"),
    type: Yup.string().required("School type is required"),
  }),
  Yup.object({
    street: Yup.string().required("Street is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    pincode: Yup.string().matches(/^[0-9]{6}$/, "Pincode must be 6 digits").required("Pincode is required"),
  }),
  Yup.object({}),
];

const SchoolSetup = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [logoPreview, setLogoPreview] = useState(null);
  const [imagesPreview, setImagesPreview] = useState([]);

  return (
    <div className="min-h-screen bg-[#f0f4ff] flex">
      {/* Left Side — Progress */}
      <div className="hidden lg:flex lg:w-80 bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#0f172a] flex-col p-8">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-12">
          <div className="p-2 rounded-xl bg-blue-500/20 border border-blue-400/30">
            <IoSchool className="text-2xl text-blue-400" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">School<span className="text-blue-400">MS</span></h1>
            <p className="text-[9px] text-blue-300/50 font-medium tracking-widest uppercase">Setup Wizard</p>
          </div>
        </div>

        {/* Steps */}
        <div className="flex-1">
          <p className="text-[10px] font-bold text-blue-300/40 uppercase tracking-widest mb-6">Setup Progress</p>
          {steps.map((step, i) => (
            <div key={i} className="flex gap-4 mb-8">
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-all duration-300 ${i < activeStep ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30" :
                    i === activeStep ? "bg-blue-500 text-white shadow-lg shadow-blue-500/30 animate-pulse-glow" :
                      "bg-white/5 text-slate-500 border border-white/10"
                  }`}>
                  {i < activeStep ? <MdCheckCircle className="text-lg" /> : step.icon}
                </div>
                {i < steps.length - 1 && (
                  <div className={`w-0.5 h-10 mt-2 rounded-full transition-all duration-500 ${i < activeStep ? "bg-emerald-500" : "bg-white/10"}`}></div>
                )}
              </div>
              <div className="pt-1.5">
                <p className={`text-sm font-semibold transition-colors ${i <= activeStep ? "text-white" : "text-slate-500"}`}>{step.label}</p>
                <p className="text-xs text-slate-500 mt-0.5">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Help */}
        <div className="p-4 bg-white/5 rounded-xl border border-white/10">
          <p className="text-xs text-slate-400">Need help setting up?</p>
          <p className="text-xs text-blue-400 font-medium mt-1 cursor-pointer hover:text-blue-300">Contact Support</p>
        </div>
      </div>

      {/* Right Side — Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-2xl animate-fade-in">
          {/* Mobile Steps */}
          <div className="flex items-center justify-center gap-2 mb-8 lg:hidden">
            {steps.map((_, i) => (
              <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === activeStep ? "w-8 bg-blue-500" : i < activeStep ? "w-4 bg-emerald-500" : "w-4 bg-slate-200"}`}></div>
            ))}
          </div>

          {/* Header */}
          <div className="mb-8">
            <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">Step {activeStep + 1} of {steps.length}</p>
            <h2 className="text-2xl font-bold text-slate-800">{steps[activeStep].label}</h2>
            <p className="text-sm text-slate-500 mt-1">{steps[activeStep].desc}</p>
          </div>

          <Formik
            initialValues={{
              schoolName: "", schoolCode: "", affiliationId: "", schoolPhone: "", schoolEmail: "",
              label: "", medium: "", type: "",
              street: "", area: "", city: "", state: "", pincode: "",
            }}
            validationSchema={validationSchemas[activeStep]}
            onSubmit={(values, { setSubmitting }) => {
              if (activeStep < steps.length - 1) {
                setActiveStep((prev) => prev + 1);
                setSubmitting(false);
              } else {
                setTimeout(() => {
                  console.log("School setup:", values);
                  localStorage.setItem("schoolSetupDone", "true");
                  toast.success("School setup complete! Welcome to your dashboard.");
                  setSubmitting(false);
                  navigate("/dashboard");
                }, 600);
              }
            }}
          >
            {({ values, handleChange, errors, touched, isSubmitting, validateForm, setTouched }) => (
              <Form>
                {/* Step 1: School Info */}
                {activeStep === 0 && (
                  <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-1 animate-fade-in">
                    <TextField fullWidth margin="dense" size="small" label="School Name" name="schoolName"
                      value={values.schoolName} onChange={handleChange}
                      error={touched.schoolName && Boolean(errors.schoolName)} helperText={touched.schoolName && errors.schoolName}
                      placeholder="e.g., Green Valley International School" />

                    <div className="grid grid-cols-2 gap-3">
                      <TextField fullWidth margin="dense" size="small" label="School Code" name="schoolCode"
                        value={values.schoolCode} onChange={handleChange}
                        error={touched.schoolCode && Boolean(errors.schoolCode)} helperText={touched.schoolCode && errors.schoolCode}
                        placeholder="e.g., GVI-2026" />
                      <TextField fullWidth margin="dense" size="small" label="Affiliation ID" name="affiliationId"
                        value={values.affiliationId} onChange={handleChange}
                        error={touched.affiliationId && Boolean(errors.affiliationId)} helperText={touched.affiliationId && errors.affiliationId} />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <TextField fullWidth margin="dense" size="small" label="Phone" name="schoolPhone"
                        value={values.schoolPhone}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, "");
                          if (val.length <= 10) handleChange({ target: { name: "schoolPhone", value: val } });
                        }}
                        error={touched.schoolPhone && Boolean(errors.schoolPhone)} helperText={touched.schoolPhone && errors.schoolPhone} />
                      <TextField fullWidth margin="dense" size="small" label="Email" name="schoolEmail"
                        value={values.schoolEmail} onChange={handleChange}
                        error={touched.schoolEmail && Boolean(errors.schoolEmail)} helperText={touched.schoolEmail && errors.schoolEmail} />
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <TextField fullWidth margin="dense" size="small" label="Board / Affiliation" name="label" select
                        value={values.label} onChange={handleChange}
                        error={touched.label && Boolean(errors.label)} helperText={touched.label && errors.label}>
                        {labels.map((l) => <MenuItem key={l} value={l}>{l}</MenuItem>)}
                      </TextField>
                      <TextField fullWidth margin="dense" size="small" label="Medium" name="medium" select
                        value={values.medium} onChange={handleChange}
                        error={touched.medium && Boolean(errors.medium)} helperText={touched.medium && errors.medium}>
                        {mediums.map((m) => <MenuItem key={m} value={m}>{m}</MenuItem>)}
                      </TextField>
                      <TextField fullWidth margin="dense" size="small" label="School Type" name="type" select
                        value={values.type} onChange={handleChange}
                        error={touched.type && Boolean(errors.type)} helperText={touched.type && errors.type}>
                        {types.map((t) => <MenuItem key={t} value={t}>{t}</MenuItem>)}
                      </TextField>
                    </div>
                  </div>
                )}

                {/* Step 2: Address */}
                {activeStep === 1 && (
                  <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-1 animate-fade-in">
                    <TextField fullWidth margin="dense" size="small" label="Pincode" name="pincode"
                      value={values.pincode}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, "");
                        if (val.length <= 6) handleChange({ target: { name: "pincode", value: val } });
                      }}
                      error={touched.pincode && Boolean(errors.pincode)} helperText={touched.pincode && errors.pincode}
                      placeholder="Enter 6-digit pincode" />

                    <TextField fullWidth margin="dense" size="small" label="Street / Locality" name="street"
                      value={values.street} onChange={handleChange}
                      error={touched.street && Boolean(errors.street)} helperText={touched.street && errors.street} />

                    <TextField fullWidth margin="dense" size="small" label="Area" name="area"
                      value={values.area} onChange={handleChange} />

                    <div className="grid grid-cols-2 gap-3">
                      <TextField fullWidth margin="dense" size="small" label="City / District" name="city"
                        value={values.city} onChange={handleChange}
                        error={touched.city && Boolean(errors.city)} helperText={touched.city && errors.city} />
                      <TextField fullWidth margin="dense" size="small" label="State" name="state"
                        value={values.state} onChange={handleChange}
                        error={touched.state && Boolean(errors.state)} helperText={touched.state && errors.state} />
                    </div>
                  </div>
                )}

                {/* Step 3: Branding */}
                {activeStep === 2 && (
                  <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-6 animate-fade-in">
                    {/* Logo Upload */}
                    <div>
                      <p className="text-sm font-semibold text-slate-700 mb-3">School Logo</p>
                      <label className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-200 rounded-xl cursor-pointer hover:border-blue-300 hover:bg-blue-50/30 transition-all duration-200">
                        {logoPreview ? (
                          <img src={logoPreview} alt="logo" className="w-24 h-24 rounded-xl object-cover shadow-md mb-3" />
                        ) : (
                          <div className="w-20 h-20 rounded-xl bg-slate-100 flex items-center justify-center mb-3">
                            <MdCloudUpload className="text-3xl text-slate-400" />
                          </div>
                        )}
                        <p className="text-sm font-medium text-slate-600">{logoPreview ? "Change logo" : "Click to upload logo"}</p>
                        <p className="text-xs text-slate-400 mt-1">PNG, JPG up to 5MB</p>
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) setLogoPreview(URL.createObjectURL(file));
                        }} />
                      </label>
                    </div>

                    {/* School Images */}
                    <div>
                      <p className="text-sm font-semibold text-slate-700 mb-3">School Images</p>
                      <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-200 rounded-xl cursor-pointer hover:border-blue-300 hover:bg-blue-50/30 transition-all duration-200">
                        <MdCloudUpload className="text-2xl text-slate-400 mb-2" />
                        <p className="text-sm font-medium text-slate-600">Upload school images</p>
                        <p className="text-xs text-slate-400 mt-1">Multiple images allowed</p>
                        <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => {
                          const files = Array.from(e.target.files);
                          setImagesPreview(files.map(f => URL.createObjectURL(f)));
                        }} />
                      </label>
                      {imagesPreview.length > 0 && (
                        <div className="flex gap-3 mt-4 overflow-x-auto">
                          {imagesPreview.map((src, i) => (
                            <img key={i} src={src} alt="preview" className="w-20 h-20 rounded-xl object-cover border border-slate-200 shadow-sm" />
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Skip notice */}
                    <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                      <p className="text-xs text-amber-700">You can skip this step and add images later from School Settings.</p>
                    </div>
                  </div>
                )}

                {/* Navigation */}
                <div className="flex justify-between mt-6">
                  {activeStep > 0 ? (
                    <button
                      type="button"
                      onClick={() => setActiveStep((prev) => prev - 1)}
                      className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all cursor-pointer"
                    >
                      <MdArrowBack /> Back
                    </button>
                  ) : <div />}

                  {activeStep < steps.length - 1 ? (
                    <button
                      type="button"
                      onClick={async () => {
                        const errs = await validateForm();
                        const touchFields = {};
                        Object.keys(validationSchemas[activeStep].describe().fields).forEach((f) => { touchFields[f] = true; });
                        setTouched(touchFields);
                        if (Object.keys(errs).length === 0) setActiveStep((prev) => prev + 1);
                      }}
                      className="flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 cursor-pointer"
                    >
                      Continue <MdArrowForward />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 disabled:opacity-50 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Setting up...
                        </span>
                      ) : (
                        <>Complete Setup <MdCheckCircle /></>
                      )}
                    </button>
                  )}
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default SchoolSetup;