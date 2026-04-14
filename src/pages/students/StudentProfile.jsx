import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdArrowBack, MdCheckCircle, MdSchool, MdLocalHospital, MdDescription, MdFamilyRestroom, MdTrendingUp, MdTrendingDown } from "react-icons/md";
import { FaUserGraduate } from "react-icons/fa";
import { IoCall, IoMail } from "react-icons/io5";
import { HiCurrencyRupee } from "react-icons/hi2";
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
        <TabButton active={activeTab === "attendance"} label="Attendance" onClick={() => setActiveTab("attendance")} />
        <TabButton active={activeTab === "fees"} label="Fee History" onClick={() => setActiveTab("fees")} />
        <TabButton active={activeTab === "exams"} label="Exam Results" onClick={() => setActiveTab("exams")} />
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

        {activeTab === "attendance" && (
          <div className="animate-fade-in">
            <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4 flex items-center gap-2">
              <MdCheckCircle className="text-blue-500" /> Attendance Record
            </h3>
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="text-center p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                <p className="text-2xl font-bold text-emerald-600">{student.attendancePercent}%</p>
                <p className="text-xs text-slate-500 mt-1">Overall</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-100">
                <p className="text-2xl font-bold text-blue-600">{Math.round(220 * student.attendancePercent / 100)}</p>
                <p className="text-xs text-slate-500 mt-1">Days Present</p>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-xl border border-red-100">
                <p className="text-2xl font-bold text-red-600">{220 - Math.round(220 * student.attendancePercent / 100)}</p>
                <p className="text-xs text-slate-500 mt-1">Days Absent</p>
              </div>
              <div className="text-center p-4 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-2xl font-bold text-slate-600">220</p>
                <p className="text-xs text-slate-500 mt-1">Total Working Days</p>
              </div>
            </div>
            <h4 className="text-sm font-semibold text-slate-600 mb-3">Monthly Breakdown</h4>
            <div className="space-y-2">
              {[
                { month: "Apr", present: 22, total: 24 }, { month: "May", present: 20, total: 23 },
                { month: "Jun", present: 18, total: 20 }, { month: "Jul", present: 21, total: 24 },
                { month: "Aug", present: 23, total: 25 }, { month: "Sep", present: 19, total: 22 },
                { month: "Oct", present: 20, total: 22 }, { month: "Nov", present: 21, total: 23 },
                { month: "Dec", present: 17, total: 19 }, { month: "Jan", present: 22, total: 24 },
                { month: "Feb", present: 18, total: 20 },
              ].map((m) => (
                <div key={m.month} className="flex items-center gap-3 group">
                  <span className="text-xs text-slate-500 w-8 font-medium">{m.month}</span>
                  <div className="flex-1 bg-slate-100 rounded-full h-4 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${(m.present / m.total) * 100 >= 90 ? "bg-emerald-500" : (m.present / m.total) * 100 >= 75 ? "bg-amber-500" : "bg-red-500"}`}
                      style={{ width: `${(m.present / m.total) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs font-semibold text-slate-600 w-16 text-right">{m.present}/{m.total} ({Math.round((m.present / m.total) * 100)}%)</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "fees" && (
          <div className="animate-fade-in">
            <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4 flex items-center gap-2">
              <HiCurrencyRupee className="text-blue-500" /> Fee History
            </h3>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                <p className="text-xl font-bold text-emerald-600">Rs.48,000</p>
                <p className="text-xs text-slate-500 mt-1">Total Paid</p>
              </div>
              <div className={`text-center p-4 rounded-xl border ${student.feeStatus === "Clear" ? "bg-emerald-50 border-emerald-100" : student.feeStatus === "Due" ? "bg-amber-50 border-amber-100" : "bg-red-50 border-red-100"}`}>
                <p className={`text-xl font-bold ${student.feeStatus === "Clear" ? "text-emerald-600" : student.feeStatus === "Due" ? "text-amber-600" : "text-red-600"}`}>
                  {student.feeStatus === "Clear" ? "Rs.0" : student.feeStatus === "Due" ? "Rs.12,000" : "Rs.24,000"}
                </p>
                <p className="text-xs text-slate-500 mt-1">Outstanding</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-100">
                <p className="text-xl font-bold text-blue-600">Rs.60,000</p>
                <p className="text-xs text-slate-500 mt-1">Annual Fee</p>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider bg-slate-50/80">
                    <th className="px-4 py-2.5">Receipt #</th>
                    <th className="px-4 py-2.5">Date</th>
                    <th className="px-4 py-2.5">Type</th>
                    <th className="px-4 py-2.5">Amount</th>
                    <th className="px-4 py-2.5">Mode</th>
                    <th className="px-4 py-2.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {[
                    { id: "RCP-001", date: "2025-04-10", type: "Tuition Fee", amount: 12000, mode: "Online", status: "Paid" },
                    { id: "RCP-002", date: "2025-07-05", type: "Tuition Fee", amount: 12000, mode: "Cash", status: "Paid" },
                    { id: "RCP-003", date: "2025-08-15", type: "Exam Fee", amount: 2000, mode: "Online", status: "Paid" },
                    { id: "RCP-004", date: "2025-10-01", type: "Tuition Fee", amount: 12000, mode: "Cheque", status: "Paid" },
                    { id: "RCP-005", date: "2026-01-10", type: "Tuition Fee", amount: 12000, mode: "Online", status: student.feeStatus === "Clear" ? "Paid" : "Pending" },
                  ].map((fee) => (
                    <tr key={fee.id} className="hover:bg-blue-50/30 transition-colors">
                      <td className="px-4 py-2.5 text-sm font-mono text-blue-600">{fee.id}</td>
                      <td className="px-4 py-2.5 text-sm text-slate-600">{new Date(fee.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</td>
                      <td className="px-4 py-2.5 text-sm text-slate-700 font-medium">{fee.type}</td>
                      <td className="px-4 py-2.5 text-sm font-semibold text-slate-800">Rs.{fee.amount.toLocaleString()}</td>
                      <td className="px-4 py-2.5 text-sm text-slate-600">{fee.mode}</td>
                      <td className="px-4 py-2.5">
                        <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${fee.status === "Paid" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}>
                          {fee.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "exams" && (
          <div className="animate-fade-in">
            <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4 flex items-center gap-2">
              <MdSchool className="text-blue-500" /> Exam Results
            </h3>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-100">
                <p className="text-2xl font-bold text-blue-600">82.4%</p>
                <p className="text-xs text-slate-500 mt-1">Overall Average</p>
              </div>
              <div className="text-center p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                <p className="text-2xl font-bold text-emerald-600">A</p>
                <p className="text-xs text-slate-500 mt-1">Grade</p>
              </div>
              <div className="text-center p-4 bg-violet-50 rounded-xl border border-violet-100">
                <p className="text-2xl font-bold text-violet-600">5th</p>
                <p className="text-xs text-slate-500 mt-1">Class Rank</p>
              </div>
            </div>

            {/* Exam-wise results */}
            {[
              {
                exam: "Mid-Term (Oct 2025)", subjects: [
                  { name: "Mathematics", marks: 85, total: 100 }, { name: "Science", marks: 78, total: 100 },
                  { name: "English", marks: 88, total: 100 }, { name: "Hindi", marks: 72, total: 100 },
                  { name: "Social Studies", marks: 80, total: 100 }, { name: "Computer", marks: 92, total: 100 },
                ],
              },
              {
                exam: "Unit Test 1 (Jul 2025)", subjects: [
                  { name: "Mathematics", marks: 42, total: 50 }, { name: "Science", marks: 38, total: 50 },
                  { name: "English", marks: 45, total: 50 }, { name: "Hindi", marks: 35, total: 50 },
                  { name: "Social Studies", marks: 40, total: 50 }, { name: "Computer", marks: 48, total: 50 },
                ],
              },
            ].map((exam) => {
              const totalMarks = exam.subjects.reduce((a, s) => a + s.marks, 0);
              const totalMax = exam.subjects.reduce((a, s) => a + s.total, 0);
              const percent = ((totalMarks / totalMax) * 100).toFixed(1);
              return (
                <div key={exam.exam} className="mb-6 p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-sm font-bold text-slate-700">{exam.exam}</h4>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-blue-600">{totalMarks}/{totalMax}</span>
                      <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${parseFloat(percent) >= 80 ? "bg-emerald-100 text-emerald-700" : parseFloat(percent) >= 60 ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"}`}>
                        {percent}%
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {exam.subjects.map((sub) => {
                      const pct = (sub.marks / sub.total) * 100;
                      return (
                        <div key={sub.name} className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-slate-100">
                          <div>
                            <p className="text-xs text-slate-500">{sub.name}</p>
                            <p className="text-sm font-bold text-slate-800">{sub.marks}/{sub.total}</p>
                          </div>
                          <div className="flex items-center gap-1">
                            {pct >= 80 ? <MdTrendingUp className="text-emerald-500 text-sm" /> : pct >= 60 ? null : <MdTrendingDown className="text-red-500 text-sm" />}
                            <span className={`text-xs font-bold ${pct >= 80 ? "text-emerald-600" : pct >= 60 ? "text-amber-600" : "text-red-600"}`}>
                              {pct.toFixed(0)}%
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
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