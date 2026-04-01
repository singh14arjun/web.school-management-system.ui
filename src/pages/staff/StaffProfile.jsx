import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdArrowBack, MdCheckCircle, MdWork, MdAccountBalance, MdDescription, MdEventAvailable } from "react-icons/md";
import { FaUserTie } from "react-icons/fa";
import { IoCall, IoMail } from "react-icons/io5";
import { staff } from "../../data/staff";
import { schools } from "../../data/schools";

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

const StaffProfile = () => {
  const navigate = useNavigate();
  const { staffId } = useParams();
  const member = staff.find((s) => s.id === staffId);
  const [activeTab, setActiveTab] = useState("personal");

  if (!member) {
    return (
      <div className="text-center py-16">
        <p className="text-slate-500">Staff member not found.</p>
        <button onClick={() => navigate("/staff")} className="mt-4 text-blue-600 font-semibold hover:underline cursor-pointer">
          Back to Staff
        </button>
      </div>
    );
  }

  const { personalInfo: pi, professionalInfo: prof, salary, bankDetails: bank, attendance: att } = member;
  const school = schools.find((s) => s.id === member.schoolId);
  const attPercent = ((att.present / att.totalDays) * 100).toFixed(0);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button onClick={() => navigate("/staff")} className="p-2 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer">
          <MdArrowBack className="text-xl text-slate-600" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Staff Profile</h1>
          <p className="text-sm text-slate-500">{member.id}</p>
        </div>
      </div>

      {/* Profile Header */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6 animate-slide-up delay-1">
        <div className="flex items-start gap-6">
          <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-violet-400 to-blue-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
            {pi.fullName.split(" ").map((n) => n[0]).slice(0, 2).join("")}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold text-slate-800">{pi.fullName}</h2>
              <span className={`px-3 py-1 text-xs font-bold rounded-full ${member.status === "Active" ? "bg-emerald-50 text-emerald-600 border border-emerald-200" : "bg-red-50 text-red-500 border border-red-200"}`}>
                {member.status}
              </span>
              <span className="px-3 py-1 text-xs font-bold rounded-full bg-violet-50 text-violet-600 border border-violet-200">
                {member.role}
              </span>
            </div>
            <p className="text-sm text-slate-500 mt-1">{prof.designation} &bull; {prof.department} &bull; {school?.schoolName || "N/A"}</p>

            <div className="flex gap-4 mt-4">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <IoCall className="text-emerald-500" /> {pi.phone}
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <IoMail className="text-blue-500" /> {pi.email}
              </div>
            </div>

            <div className="flex gap-4 mt-4">
              <div className="text-center px-4 py-2 bg-emerald-50 rounded-xl border border-emerald-100">
                <p className="text-lg font-bold text-emerald-600">{attPercent}%</p>
                <p className="text-xs text-slate-500">Attendance</p>
              </div>
              <div className="text-center px-4 py-2 bg-blue-50 rounded-xl border border-blue-100">
                <p className="text-lg font-bold text-blue-600">Rs.{salary.total.toLocaleString()}</p>
                <p className="text-xs text-slate-500">Monthly Salary</p>
              </div>
              <div className="text-center px-4 py-2 bg-indigo-50 rounded-xl border border-indigo-100">
                <p className="text-lg font-bold text-indigo-600">{prof.experience}</p>
                <p className="text-xs text-slate-500">Experience</p>
              </div>
              <div className="text-center px-4 py-2 bg-violet-50 rounded-xl border border-violet-100">
                <p className="text-lg font-bold text-violet-600">{new Date(prof.joiningDate).getFullYear()}</p>
                <p className="text-xs text-slate-500">Joined</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 animate-slide-up delay-2">
        <TabButton active={activeTab === "personal"} label="Personal" onClick={() => setActiveTab("personal")} />
        <TabButton active={activeTab === "professional"} label="Professional" onClick={() => setActiveTab("professional")} />
        <TabButton active={activeTab === "salary"} label="Salary & Bank" onClick={() => setActiveTab("salary")} />
        <TabButton active={activeTab === "attendance"} label="Attendance" onClick={() => setActiveTab("attendance")} />
        <TabButton active={activeTab === "documents"} label="Documents" onClick={() => setActiveTab("documents")} />
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6 animate-slide-up delay-3">
        {activeTab === "personal" && (
          <div className="animate-fade-in">
            <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4 flex items-center gap-2">
              <FaUserTie className="text-violet-500" /> Personal Information
            </h3>
            <div className="grid grid-cols-3 gap-6 text-sm">
              <div><span className="text-slate-500">Full Name</span><p className="font-semibold">{pi.fullName}</p></div>
              <div><span className="text-slate-500">Date of Birth</span><p className="font-semibold">{new Date(pi.dob).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p></div>
              <div><span className="text-slate-500">Gender</span><p className="font-semibold">{pi.gender}</p></div>
              <div><span className="text-slate-500">Blood Group</span><p className="font-semibold">{pi.bloodGroup}</p></div>
              <div><span className="text-slate-500">Phone</span><p className="font-semibold">{pi.phone}</p></div>
              <div><span className="text-slate-500">Email</span><p className="font-semibold">{pi.email}</p></div>
            </div>
          </div>
        )}

        {activeTab === "professional" && (
          <div className="animate-fade-in">
            <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4 flex items-center gap-2">
              <MdWork className="text-violet-500" /> Professional Information
            </h3>
            <div className="grid grid-cols-3 gap-6 text-sm">
              <div><span className="text-slate-500">Designation</span><p className="font-semibold">{prof.designation}</p></div>
              <div><span className="text-slate-500">Department</span><p className="font-semibold">{prof.department}</p></div>
              <div><span className="text-slate-500">System Role</span><p className="font-semibold">{member.role}</p></div>
              <div><span className="text-slate-500">Qualification</span><p className="font-semibold">{prof.qualification}</p></div>
              <div><span className="text-slate-500">Experience</span><p className="font-semibold">{prof.experience}</p></div>
              <div><span className="text-slate-500">Specialization</span><p className="font-semibold">{prof.specialization || "N/A"}</p></div>
              <div><span className="text-slate-500">Joining Date</span><p className="font-semibold">{new Date(prof.joiningDate).toLocaleDateString("en-IN")}</p></div>
              <div><span className="text-slate-500">School</span><p className="font-semibold">{school?.schoolName || "N/A"}</p></div>
            </div>

            <h4 className="text-sm font-bold text-slate-700 mt-6 mb-3">Assigned Roles (RBAC)</h4>
            <div className="flex flex-wrap gap-2">
              {member.roles.map((r) => (
                <span key={r} className="px-3 py-1.5 text-xs font-semibold bg-violet-50 text-violet-600 rounded-full border border-violet-200 flex items-center gap-1">
                  <MdCheckCircle /> {r}
                </span>
              ))}
            </div>
          </div>
        )}

        {activeTab === "salary" && (
          <div className="animate-fade-in">
            <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4 flex items-center gap-2">
              <MdAccountBalance className="text-violet-500" /> Salary & Bank Details
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-slate-600">Salary Breakdown</h4>
                <div className="space-y-2">
                  <div className="flex justify-between p-3 bg-slate-50 rounded-xl">
                    <span className="text-sm text-slate-600">Basic Salary</span>
                    <span className="text-sm font-bold">Rs.{salary.basic.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between p-3 bg-slate-50 rounded-xl">
                    <span className="text-sm text-slate-600">HRA</span>
                    <span className="text-sm font-bold">Rs.{salary.hra.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between p-3 bg-slate-50 rounded-xl">
                    <span className="text-sm text-slate-600">DA</span>
                    <span className="text-sm font-bold">Rs.{salary.da.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between p-3 bg-blue-50 rounded-xl border border-blue-200">
                    <span className="text-sm font-bold text-blue-700">Total</span>
                    <span className="text-sm font-bold text-blue-700">Rs.{salary.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-slate-600">Bank Account</h4>
                <div className="p-4 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl text-white space-y-3">
                  <p className="text-xs text-slate-400 uppercase tracking-wider">Bank Account</p>
                  <p className="text-lg font-bold tracking-wider">{bank.accountNo}</p>
                  <div className="flex justify-between text-sm">
                    <div>
                      <p className="text-xs text-slate-400">Bank</p>
                      <p className="font-semibold">{bank.bankName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">IFSC</p>
                      <p className="font-semibold">{bank.ifsc}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "attendance" && (
          <div className="animate-fade-in">
            <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4 flex items-center gap-2">
              <MdEventAvailable className="text-violet-500" /> Monthly Attendance (Current Month)
            </h3>
            <div className="grid grid-cols-5 gap-4 mb-6">
              <div className="text-center p-4 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-2xl font-bold text-slate-800">{att.totalDays}</p>
                <p className="text-xs text-slate-500 mt-1">Working Days</p>
              </div>
              <div className="text-center p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                <p className="text-2xl font-bold text-emerald-600">{att.present}</p>
                <p className="text-xs text-slate-500 mt-1">Present</p>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-xl border border-red-100">
                <p className="text-2xl font-bold text-red-600">{att.absent}</p>
                <p className="text-xs text-slate-500 mt-1">Absent</p>
              </div>
              <div className="text-center p-4 bg-amber-50 rounded-xl border border-amber-100">
                <p className="text-2xl font-bold text-amber-600">{att.late}</p>
                <p className="text-xs text-slate-500 mt-1">Late</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-100">
                <p className="text-2xl font-bold text-blue-600">{att.leaves}</p>
                <p className="text-xs text-slate-500 mt-1">Leaves</p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-600 font-medium">Attendance Rate</span>
                <span className="font-bold text-slate-800">{attPercent}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-4">
                <div
                  className={`h-4 rounded-full transition-all duration-1000 ${Number(attPercent) >= 90 ? "bg-emerald-500" : Number(attPercent) >= 75 ? "bg-amber-500" : "bg-red-500"}`}
                  style={{ width: `${attPercent}%` }}
                ></div>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                {Number(attPercent) >= 90 ? "Excellent attendance record" : Number(attPercent) >= 75 ? "Good attendance, minor improvement needed" : "Below minimum threshold, action required"}
              </p>
            </div>
          </div>
        )}

        {activeTab === "documents" && (
          <div className="animate-fade-in">
            <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4 flex items-center gap-2">
              <MdDescription className="text-violet-500" /> Documents
            </h3>
            <div className="space-y-2">
              {member.documents.map((doc) => (
                <div key={doc.name} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 hover:bg-blue-50/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <MdDescription className="text-slate-400 text-lg" />
                    <p className="text-sm font-medium text-slate-700">{doc.name}</p>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${doc.status === "Verified" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}>
                    {doc.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StaffProfile;