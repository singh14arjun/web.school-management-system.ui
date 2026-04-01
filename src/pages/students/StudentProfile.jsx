import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdArrowBack, MdCheckCircle, MdSchool, MdLocalHospital, MdDescription, MdFamilyRestroom } from "react-icons/md";
import { FaUserGraduate } from "react-icons/fa";
import { IoCall, IoMail } from "react-icons/io5";
import { students } from "../../data/students";

const TabButton = ({ active, label, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer ${active
      ? "text-blue-600 bg-blue-50 border border-blue-200 shadow-sm"
      : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
      }`}
  >
    {label}
  </button>
);

const StudentProfile = () => {
  const navigate = useNavigate();
  const { studentId } = useParams();
  const student = students.find((s) => s.id === studentId);
  const [activeTab, setActiveTab] = useState("personal");

  const siblingData = student?.siblings?.map((sid) => students.find((s) => s.id === sid)).filter(Boolean) || [];

  if (!student) {
    return (
      <div className="text-center py-16">
        <p className="text-slate-500">Student not found.</p>
        <button onClick={() => navigate("/students")} className="mt-4 text-blue-600 font-semibold hover:underline cursor-pointer">
          Back to Students
        </button>
      </div>
    );
  }

  const { personalInfo: pi, contactInfo: ci, guardianInfo: gi, academicInfo: ai, healthInfo: hi } = student;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button onClick={() => navigate("/students")} className="p-2 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer">
          <MdArrowBack className="text-xl text-slate-600" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Student Profile</h1>
          <p className="text-sm text-slate-500">{student.id}</p>
        </div>
      </div>

      {/* Profile Header Card */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6 animate-slide-up delay-1">
        <div className="flex items-start gap-6">
          <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
            {pi.fullName.split(" ").map((n) => n[0]).join("")}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold text-slate-800">{pi.fullName}</h2>
              <span className={`px-3 py-1 text-xs font-bold rounded-full ${student.status === "Active" ? "bg-emerald-50 text-emerald-600 border border-emerald-200" : "bg-slate-100 text-slate-500"}`}>
                {student.status}
              </span>
            </div>
            <div className="flex items-center gap-6 mt-2 text-sm text-slate-500">
              <span>{ai.currentClass} - {ai.section}</span>
              <span>Roll #{ai.rollNumber}</span>
              <span>House: {ai.house}</span>
              <span>{pi.gender} &bull; {pi.bloodGroup}</span>
            </div>
            <div className="flex gap-4 mt-4">
              <div className="text-center px-4 py-2 bg-blue-50 rounded-xl border border-blue-100">
                <p className="text-lg font-bold text-blue-600">{student.attendancePercent}%</p>
                <p className="text-xs text-slate-500">Attendance</p>
              </div>
              <div className={`text-center px-4 py-2 rounded-xl border ${student.feeStatus === "Clear" ? "bg-emerald-50 border-emerald-100" : student.feeStatus === "Due" ? "bg-amber-50 border-amber-100" : "bg-red-50 border-red-100"}`}>
                <p className={`text-lg font-bold ${student.feeStatus === "Clear" ? "text-emerald-600" : student.feeStatus === "Due" ? "text-amber-600" : "text-red-600"}`}>{student.feeStatus}</p>
                <p className="text-xs text-slate-500">Fee Status</p>
              </div>
              <div className="text-center px-4 py-2 bg-indigo-50 rounded-xl border border-indigo-100">
                <p className="text-lg font-bold text-indigo-600">{ai.academicYear}</p>
                <p className="text-xs text-slate-500">Academic Year</p>
              </div>
              <div className="text-center px-4 py-2 bg-violet-50 rounded-xl border border-violet-100">
                <p className="text-lg font-bold text-violet-600">{new Date(student.enrollmentDate).getFullYear()}</p>
                <p className="text-xs text-slate-500">Enrolled Since</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 animate-slide-up delay-2">
        <TabButton active={activeTab === "personal"} label="Personal" onClick={() => setActiveTab("personal")} />
        <TabButton active={activeTab === "academic"} label="Academic" onClick={() => setActiveTab("academic")} />
        <TabButton active={activeTab === "guardian"} label="Guardian" onClick={() => setActiveTab("guardian")} />
        <TabButton active={activeTab === "health"} label="Health" onClick={() => setActiveTab("health")} />
        <TabButton active={activeTab === "documents"} label="Documents" onClick={() => setActiveTab("documents")} />
        {siblingData.length > 0 && (
          <TabButton active={activeTab === "siblings"} label="Siblings" onClick={() => setActiveTab("siblings")} />
        )}
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6 animate-slide-up delay-3">
        {activeTab === "personal" && (
          <div className="animate-fade-in">
            <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4 flex items-center gap-2">
              <FaUserGraduate className="text-blue-500" /> Personal Information
            </h3>
            <div className="grid grid-cols-3 gap-6 text-sm">
              <div><span className="text-slate-500">Full Name</span><p className="font-semibold">{pi.fullName}</p></div>
              <div><span className="text-slate-500">Date of Birth</span><p className="font-semibold">{new Date(pi.dob).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p></div>
              <div><span className="text-slate-500">Gender</span><p className="font-semibold">{pi.gender}</p></div>
              <div><span className="text-slate-500">Blood Group</span><p className="font-semibold">{pi.bloodGroup}</p></div>
              <div><span className="text-slate-500">Religion</span><p className="font-semibold">{pi.religion}</p></div>
              <div><span className="text-slate-500">Category</span><p className="font-semibold">{pi.casteCategory}</p></div>
              <div><span className="text-slate-500">Nationality</span><p className="font-semibold">{pi.nationality}</p></div>
              <div><span className="text-slate-500">Mother Tongue</span><p className="font-semibold">{pi.motherTongue}</p></div>
            </div>

            <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mt-8 mb-4">Address</h3>
            <div className="grid grid-cols-2 gap-6 text-sm">
              <div><span className="text-slate-500">Current Address</span><p className="font-semibold">{ci.currentAddress}</p></div>
              <div><span className="text-slate-500">Permanent Address</span><p className="font-semibold">{ci.permanentAddress}</p></div>
            </div>
          </div>
        )}

        {activeTab === "academic" && (
          <div className="animate-fade-in">
            <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4 flex items-center gap-2">
              <MdSchool className="text-blue-500" /> Academic Information
            </h3>
            <div className="grid grid-cols-3 gap-6 text-sm">
              <div><span className="text-slate-500">Admission Date</span><p className="font-semibold">{new Date(ai.admissionDate).toLocaleDateString("en-IN")}</p></div>
              <div><span className="text-slate-500">Admission Class</span><p className="font-semibold">{ai.admissionClass}</p></div>
              <div><span className="text-slate-500">Current Class</span><p className="font-semibold">{ai.currentClass} - {ai.section}</p></div>
              <div><span className="text-slate-500">Roll Number</span><p className="font-semibold">{ai.rollNumber}</p></div>
              <div><span className="text-slate-500">House</span><p className="font-semibold">{ai.house}</p></div>
              <div><span className="text-slate-500">Academic Year</span><p className="font-semibold">{ai.academicYear}</p></div>
            </div>
          </div>
        )}

        {activeTab === "guardian" && (
          <div className="animate-fade-in">
            <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4 flex items-center gap-2">
              <MdFamilyRestroom className="text-blue-500" /> Guardian Information
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-100">
                <p className="text-xs font-bold text-blue-600 uppercase mb-3">Father</p>
                <div className="space-y-2 text-sm">
                  <p className="font-semibold text-slate-800">{gi.father.name}</p>
                  <p className="text-slate-500">{gi.father.occupation}</p>
                  <div className="flex items-center gap-2 text-slate-600"><IoCall className="text-emerald-500" /> {gi.father.mobile}</div>
                  <div className="flex items-center gap-2 text-slate-600"><IoMail className="text-blue-500" /> {gi.father.email}</div>
                </div>
              </div>
              <div className="p-4 bg-pink-50/60 rounded-xl border border-pink-100">
                <p className="text-xs font-bold text-pink-600 uppercase mb-3">Mother</p>
                <div className="space-y-2 text-sm">
                  <p className="font-semibold text-slate-800">{gi.mother.name}</p>
                  <p className="text-slate-500">{gi.mother.occupation}</p>
                  <div className="flex items-center gap-2 text-slate-600"><IoCall className="text-emerald-500" /> {gi.mother.mobile}</div>
                  {gi.mother.email && <div className="flex items-center gap-2 text-slate-600"><IoMail className="text-blue-500" /> {gi.mother.email}</div>}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "health" && (
          <div className="animate-fade-in">
            <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4 flex items-center gap-2">
              <MdLocalHospital className="text-blue-500" /> Health Information
            </h3>
            <div className="grid grid-cols-2 gap-6 text-sm">
              <div><span className="text-slate-500">Known Allergies</span><p className="font-semibold">{hi.allergies}</p></div>
              <div><span className="text-slate-500">Medical Conditions</span><p className="font-semibold">{hi.medicalConditions}</p></div>
              <div><span className="text-slate-500">Doctor</span><p className="font-semibold">{hi.doctorName}</p></div>
              <div><span className="text-slate-500">Doctor Contact</span><p className="font-semibold">{hi.doctorContact}</p></div>
            </div>
            <h4 className="text-sm font-bold text-slate-700 mt-6 mb-3">Vaccinations</h4>
            <div className="flex flex-wrap gap-2">
              {hi.vaccinations.map((v) => (
                <span key={v} className="px-3 py-1.5 text-xs font-semibold bg-emerald-50 text-emerald-600 rounded-full border border-emerald-200 flex items-center gap-1">
                  <MdCheckCircle /> {v}
                </span>
              ))}
            </div>
          </div>
        )}

        {activeTab === "documents" && (
          <div className="animate-fade-in">
            <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4 flex items-center gap-2">
              <MdDescription className="text-blue-500" /> Documents
            </h3>
            <div className="space-y-2">
              {student.documents.map((doc) => (
                <div key={doc.name} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 hover:bg-blue-50/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <MdDescription className="text-slate-400 text-lg" />
                    <div>
                      <p className="text-sm font-medium text-slate-700">{doc.name}</p>
                      <p className="text-xs text-slate-400">Uploaded: {new Date(doc.uploadDate).toLocaleDateString("en-IN")}</p>
                    </div>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${doc.status === "Verified" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}>
                    {doc.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "siblings" && (
          <div className="animate-fade-in">
            <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4 flex items-center gap-2">
              <MdFamilyRestroom className="text-blue-500" /> Linked Siblings
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {siblingData.map((sib) => (
                <div key={sib.id} className="p-4 bg-violet-50/60 rounded-xl border border-violet-100 cursor-pointer card-hover"
                  onClick={() => navigate(`/students/${sib.id}`)}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-400 to-violet-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                      {sib.personalInfo.fullName.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">{sib.personalInfo.fullName}</p>
                      <p className="text-xs text-slate-500">{sib.id} &bull; {sib.academicInfo.currentClass}-{sib.academicInfo.section}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentProfile;