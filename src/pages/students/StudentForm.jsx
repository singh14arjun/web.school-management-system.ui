import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdArrowBack, MdPerson, MdHome, MdSchool, MdUploadFile, MdFamilyRestroom, MdCheckCircle } from "react-icons/md";
import { toast } from "react-toastify";

const steps = ["Personal Details", "Contact & Guardian", "Academic Info", "Documents"];

const StudentForm = ({ initialData = null, isEdit = false }) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  const buildInitialForm = () => {
    if (!initialData) {
      return {
        fullName: "", dob: "", gender: "", bloodGroup: "", religion: "", casteCategory: "", nationality: "Indian", motherTongue: "",
        currentAddress: "", permanentAddress: "", sameAddress: false,
        fatherName: "", fatherOccupation: "", fatherMobile: "", fatherEmail: "",
        motherName: "", motherOccupation: "", motherMobile: "", motherEmail: "",
        guardianName: "", guardianRelation: "", guardianMobile: "",
        admissionDate: "", currentClass: "", section: "", rollNumber: "", house: "", academicYear: "2025-26",
        documents: [],
      };
    }
    const s = initialData;
    return {
      fullName: s.personalInfo.fullName,
      dob: s.personalInfo.dob,
      gender: s.personalInfo.gender,
      bloodGroup: s.personalInfo.bloodGroup,
      religion: s.personalInfo.religion,
      casteCategory: s.personalInfo.casteCategory,
      nationality: s.personalInfo.nationality,
      motherTongue: s.personalInfo.motherTongue,
      currentAddress: s.contactInfo.currentAddress,
      permanentAddress: s.contactInfo.permanentAddress,
      sameAddress: s.contactInfo.currentAddress === s.contactInfo.permanentAddress,
      fatherName: s.guardianInfo.father.name,
      fatherOccupation: s.guardianInfo.father.occupation,
      fatherMobile: s.guardianInfo.father.mobile,
      fatherEmail: s.guardianInfo.father.email,
      motherName: s.guardianInfo.mother.name,
      motherOccupation: s.guardianInfo.mother.occupation,
      motherMobile: s.guardianInfo.mother.mobile,
      motherEmail: s.guardianInfo.mother.email || "",
      guardianName: s.guardianInfo.guardian?.name || "",
      guardianRelation: s.guardianInfo.guardian?.relation || "",
      guardianMobile: s.guardianInfo.guardian?.mobile || "",
      admissionDate: s.academicInfo.admissionDate,
      currentClass: s.academicInfo.currentClass,
      section: s.academicInfo.section,
      rollNumber: String(s.academicInfo.rollNumber),
      house: s.academicInfo.house,
      academicYear: s.academicInfo.academicYear,
      documents: s.documents || [],
    };
  };

  const [form, setForm] = useState(buildInitialForm);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "sameAddress" && checked) {
      setForm((p) => ({ ...p, sameAddress: checked, permanentAddress: p.currentAddress }));
    } else {
      setForm((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
    }
  };

  const handleSubmit = () => {
    if (!form.fullName || !form.dob || !form.gender || !form.currentClass) {
      toast.error("Please fill all required fields");
      return;
    }
    toast.success(isEdit ? "Student updated successfully!" : "Student added successfully!");
    navigate("/students");
  };

  const nextStep = () => setCurrentStep((p) => Math.min(p + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((p) => Math.max(p - 1, 0));

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button onClick={() => navigate("/students")} className="p-2 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer">
          <MdArrowBack className="text-xl text-slate-600" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{isEdit ? "Edit Student" : "Add New Student"}</h1>
          <p className="text-sm text-slate-500">
            {isEdit ? `Editing ${form.fullName} — ${initialData?.id}` : "Fill in the student details to create a new admission"}
          </p>
        </div>
      </div>

      {/* Stepper */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5 animate-slide-up delay-1">
        <div className="flex items-center justify-between">
          {steps.map((step, i) => (
            <div key={step} className="flex items-center flex-1">
              <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentStep(i)}>
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  i <= currentStep ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30" : "bg-slate-100 text-slate-400"
                }`}>
                  {i + 1}
                </div>
                <span className={`text-sm font-medium hidden md:block ${i <= currentStep ? "text-blue-600" : "text-slate-400"}`}>
                  {step}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-3 rounded transition-all duration-500 ${i < currentStep ? "bg-blue-500" : "bg-slate-200"}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6 animate-slide-up delay-2">
        {/* Step 1: Personal Details */}
        {currentStep === 0 && (
          <div className="animate-fade-in space-y-6">
            <h3 className="text-lg font-bold text-slate-700 flex items-center gap-2">
              <MdPerson className="text-blue-500" /> Personal Details
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-slate-600 mb-1 block">Full Name *</label>
                <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="Enter full name"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all" />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-600 mb-1 block">Date of Birth *</label>
                <input type="date" name="dob" value={form.dob} onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all" />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-600 mb-1 block">Gender *</label>
                <select name="gender" value={form.gender} onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 bg-white cursor-pointer">
                  <option value="">Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-600 mb-1 block">Blood Group</label>
                <select name="bloodGroup" value={form.bloodGroup} onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 bg-white cursor-pointer">
                  <option value="">Select</option>
                  {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((b) => <option key={b}>{b}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-600 mb-1 block">Religion</label>
                <input name="religion" value={form.religion} onChange={handleChange} placeholder="Enter religion"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all" />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-600 mb-1 block">Category</label>
                <select name="casteCategory" value={form.casteCategory} onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 bg-white cursor-pointer">
                  <option value="">Select</option>
                  <option>General</option>
                  <option>OBC</option>
                  <option>SC</option>
                  <option>ST</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-600 mb-1 block">Nationality</label>
                <input name="nationality" value={form.nationality} onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all" />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-600 mb-1 block">Mother Tongue</label>
                <input name="motherTongue" value={form.motherTongue} onChange={handleChange} placeholder="Enter mother tongue"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all" />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Contact & Guardian */}
        {currentStep === 1 && (
          <div className="animate-fade-in space-y-6">
            <h3 className="text-lg font-bold text-slate-700 flex items-center gap-2">
              <MdHome className="text-blue-500" /> Contact Details
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-slate-600 mb-1 block">Current Address *</label>
                <textarea name="currentAddress" value={form.currentAddress} onChange={handleChange} rows={2} placeholder="Enter current address"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all resize-none" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-sm font-medium text-slate-600">Permanent Address</label>
                  <label className="flex items-center gap-1.5 text-xs text-slate-500 cursor-pointer">
                    <input type="checkbox" name="sameAddress" checked={form.sameAddress} onChange={handleChange} className="accent-blue-600" />
                    Same as current
                  </label>
                </div>
                <textarea name="permanentAddress" value={form.permanentAddress} onChange={handleChange} rows={2} placeholder="Enter permanent address"
                  disabled={form.sameAddress}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all resize-none disabled:bg-slate-50 disabled:text-slate-400" />
              </div>
            </div>

            <h3 className="text-lg font-bold text-slate-700 flex items-center gap-2 pt-4 border-t border-slate-100">
              <MdFamilyRestroom className="text-blue-500" /> Parent / Guardian Information
            </h3>

            {/* Father */}
            <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100">
              <p className="text-xs font-bold text-blue-600 uppercase mb-3">Father's Details</p>
              <div className="grid grid-cols-4 gap-3">
                <div>
                  <label className="text-xs text-slate-500 mb-1 block">Name *</label>
                  <input name="fatherName" value={form.fatherName} onChange={handleChange} placeholder="Father's name"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 transition-all" />
                </div>
                <div>
                  <label className="text-xs text-slate-500 mb-1 block">Occupation</label>
                  <input name="fatherOccupation" value={form.fatherOccupation} onChange={handleChange} placeholder="Occupation"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 transition-all" />
                </div>
                <div>
                  <label className="text-xs text-slate-500 mb-1 block">Mobile *</label>
                  <input name="fatherMobile" value={form.fatherMobile} onChange={handleChange} placeholder="10-digit mobile"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 transition-all" />
                </div>
                <div>
                  <label className="text-xs text-slate-500 mb-1 block">Email</label>
                  <input name="fatherEmail" value={form.fatherEmail} onChange={handleChange} placeholder="Email"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 transition-all" />
                </div>
              </div>
            </div>

            {/* Mother */}
            <div className="p-4 bg-pink-50/50 rounded-xl border border-pink-100">
              <p className="text-xs font-bold text-pink-600 uppercase mb-3">Mother's Details</p>
              <div className="grid grid-cols-4 gap-3">
                <div>
                  <label className="text-xs text-slate-500 mb-1 block">Name *</label>
                  <input name="motherName" value={form.motherName} onChange={handleChange} placeholder="Mother's name"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 transition-all" />
                </div>
                <div>
                  <label className="text-xs text-slate-500 mb-1 block">Occupation</label>
                  <input name="motherOccupation" value={form.motherOccupation} onChange={handleChange} placeholder="Occupation"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 transition-all" />
                </div>
                <div>
                  <label className="text-xs text-slate-500 mb-1 block">Mobile *</label>
                  <input name="motherMobile" value={form.motherMobile} onChange={handleChange} placeholder="10-digit mobile"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 transition-all" />
                </div>
                <div>
                  <label className="text-xs text-slate-500 mb-1 block">Email</label>
                  <input name="motherEmail" value={form.motherEmail} onChange={handleChange} placeholder="Email"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 transition-all" />
                </div>
              </div>
            </div>

            {/* Guardian */}
            <div className="p-4 bg-violet-50/50 rounded-xl border border-violet-100">
              <p className="text-xs font-bold text-violet-600 uppercase mb-3">Guardian (if different from parents)</p>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs text-slate-500 mb-1 block">Name</label>
                  <input name="guardianName" value={form.guardianName} onChange={handleChange} placeholder="Guardian name"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 transition-all" />
                </div>
                <div>
                  <label className="text-xs text-slate-500 mb-1 block">Relation</label>
                  <input name="guardianRelation" value={form.guardianRelation} onChange={handleChange} placeholder="Relation"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 transition-all" />
                </div>
                <div>
                  <label className="text-xs text-slate-500 mb-1 block">Mobile</label>
                  <input name="guardianMobile" value={form.guardianMobile} onChange={handleChange} placeholder="Mobile"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 transition-all" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Academic Info */}
        {currentStep === 2 && (
          <div className="animate-fade-in space-y-6">
            <h3 className="text-lg font-bold text-slate-700 flex items-center gap-2">
              <MdSchool className="text-blue-500" /> Academic Information
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-slate-600 mb-1 block">Admission Date *</label>
                <input type="date" name="admissionDate" value={form.admissionDate} onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all" />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-600 mb-1 block">Class *</label>
                <select name="currentClass" value={form.currentClass} onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 bg-white cursor-pointer">
                  <option value="">Select Class</option>
                  {["Nursery", "LKG", "UKG", ...Array.from({ length: 12 }, (_, i) => `Class ${i + 1}`)].map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-600 mb-1 block">Section *</label>
                <select name="section" value={form.section} onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 bg-white cursor-pointer">
                  <option value="">Select Section</option>
                  {["A", "B", "C", "D"].map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-600 mb-1 block">Roll Number</label>
                <input name="rollNumber" value={form.rollNumber} onChange={handleChange} placeholder="Enter roll number"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all" />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-600 mb-1 block">House</label>
                <select name="house" value={form.house} onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 bg-white cursor-pointer">
                  <option value="">Select House</option>
                  {["Red", "Blue", "Green", "Yellow"].map((h) => <option key={h}>{h}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-600 mb-1 block">Academic Year</label>
                <input name="academicYear" value={form.academicYear} onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all" />
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Documents */}
        {currentStep === 3 && (
          <div className="animate-fade-in space-y-6">
            <h3 className="text-lg font-bold text-slate-700 flex items-center gap-2">
              <MdUploadFile className="text-blue-500" /> Documents
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {["Birth Certificate", "Aadhar Card", "Previous Marksheet", "Transfer Certificate", "Medical Records", "Passport Size Photo"].map((doc) => {
                const existing = form.documents.find((d) => d.name === doc);
                return (
                  <div key={doc} className={`flex items-center justify-between p-4 border-2 rounded-xl transition-all cursor-pointer group ${
                    existing ? "border-emerald-200 bg-emerald-50/30" : "border-dashed border-slate-200 hover:border-blue-300 hover:bg-blue-50/30"
                  }`}>
                    <div className="flex items-center gap-3">
                      {existing ? (
                        <MdCheckCircle className="text-2xl text-emerald-500" />
                      ) : (
                        <MdUploadFile className="text-2xl text-slate-400 group-hover:text-blue-500 transition-colors" />
                      )}
                      <div>
                        <p className="text-sm font-medium text-slate-700">{doc}</p>
                        {existing ? (
                          <p className="text-xs text-emerald-600 font-medium">{existing.status} — {new Date(existing.uploadDate).toLocaleDateString("en-IN")}</p>
                        ) : (
                          <p className="text-xs text-slate-400">PDF, JPG, PNG (max 5MB)</p>
                        )}
                      </div>
                    </div>
                    <span className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${
                      existing ? "text-emerald-600 bg-emerald-100" : "text-blue-600 bg-blue-50 group-hover:bg-blue-100"
                    }`}>
                      {existing ? "Uploaded" : "Upload"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t border-slate-100">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className="px-6 py-2.5 text-sm font-semibold text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          >
            Previous
          </button>
          {currentStep < steps.length - 1 ? (
            <button
              onClick={nextStep}
              className="px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all cursor-pointer"
            >
              Next Step
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-8 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-xl hover:shadow-lg hover:shadow-emerald-500/25 transition-all cursor-pointer"
            >
              {isEdit ? "Save Changes" : "Submit & Add Student"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentForm;
