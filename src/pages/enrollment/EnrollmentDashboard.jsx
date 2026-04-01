import { useState } from "react";
import { Link } from "react-router-dom";
import { MdPersonAdd, MdDescription, MdCheckCircle, MdPending, MdFilterList } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa";
import {
  inquiries,
  applications,
  admissions,
  enrollmentStats,
  inquiryStatuses,
  applicationStatuses,
} from "../../data/enrollment";

const StatusBadge = ({ status }) => {
  const colors = {
    New: "bg-blue-50 text-blue-600 border-blue-200",
    Contacted: "bg-amber-50 text-amber-600 border-amber-200",
    "Interview Scheduled": "bg-violet-50 text-violet-600 border-violet-200",
    Converted: "bg-emerald-50 text-emerald-600 border-emerald-200",
    Closed: "bg-slate-50 text-slate-600 border-slate-200",
    "Documents Pending": "bg-orange-50 text-orange-600 border-orange-200",
    "Under Review": "bg-blue-50 text-blue-600 border-blue-200",
    Approved: "bg-emerald-50 text-emerald-600 border-emerald-200",
    Rejected: "bg-red-50 text-red-600 border-red-200",
    Waitlisted: "bg-amber-50 text-amber-600 border-amber-200",
    "Fee Pending": "bg-orange-50 text-orange-600 border-orange-200",
    Enrolled: "bg-emerald-50 text-emerald-600 border-emerald-200",
  };
  return (
    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${colors[status] || "bg-slate-50 text-slate-600 border-slate-200"}`}>
      {status}
    </span>
  );
};

const EnrollmentDashboard = () => {
  const [activeTab, setActiveTab] = useState("inquiries");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const tabs = [
    { id: "inquiries", label: "Inquiries", count: inquiries.length },
    { id: "applications", label: "Applications", count: applications.length },
    { id: "admissions", label: "Admissions", count: admissions.length },
  ];

  const filteredInquiries = inquiries.filter((i) => {
    const matchSearch = i.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.parentName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = statusFilter === "All" || i.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const filteredApplications = applications.filter((a) => {
    const matchSearch = a.studentName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = statusFilter === "All" || a.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Enrollment Management</h1>
          <p className="text-sm text-slate-500">Manage admissions: Inquiry &rarr; Application &rarr; Admission</p>
        </div>
        <Link
          to="/enrollment/new-inquiry"
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
        >
          <MdPersonAdd className="text-xl" />
          New Inquiry
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-5 gap-4">
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm card-hover animate-slide-up delay-1">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 bg-blue-50 rounded-lg"><MdDescription className="text-blue-500" /></div>
            <span className="text-sm text-slate-500">Inquiries</span>
          </div>
          <p className="text-2xl font-bold text-blue-600">{enrollmentStats.totalInquiries}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm card-hover animate-slide-up delay-2">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 bg-indigo-50 rounded-lg"><MdPersonAdd className="text-indigo-500" /></div>
            <span className="text-sm text-slate-500">Applications</span>
          </div>
          <p className="text-2xl font-bold text-indigo-600">{enrollmentStats.totalApplications}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm card-hover animate-slide-up delay-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 bg-emerald-50 rounded-lg"><MdCheckCircle className="text-emerald-500" /></div>
            <span className="text-sm text-slate-500">Approved</span>
          </div>
          <p className="text-2xl font-bold text-emerald-600">{enrollmentStats.approved}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm card-hover animate-slide-up delay-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 bg-amber-50 rounded-lg"><MdPending className="text-amber-500" /></div>
            <span className="text-sm text-slate-500">Pending</span>
          </div>
          <p className="text-2xl font-bold text-amber-600">{enrollmentStats.pending}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm card-hover animate-slide-up delay-5">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 bg-violet-50 rounded-lg"><MdCheckCircle className="text-violet-500" /></div>
            <span className="text-sm text-slate-500">Conversion</span>
          </div>
          <p className="text-2xl font-bold text-violet-600">{enrollmentStats.conversionRate}</p>
        </div>
      </div>

      {/* Workflow Visual */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5 animate-slide-up delay-3">
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Enrollment Workflow</h3>
        <div className="flex items-center justify-center gap-2">
          {["Inquiry", "Application", "Review", "Admission", "Fee Payment", "Enrolled"].map((step, idx) => (
            <div key={step} className="flex items-center gap-2">
              <div className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-all duration-300 ${idx <= 2 ? "bg-blue-50 text-blue-700 border-blue-200 shadow-sm" : "bg-slate-50 text-slate-500 border-slate-200"}`}>
                {step}
              </div>
              {idx < 5 && <FaArrowRight className="text-slate-300 text-sm" />}
            </div>
          ))}
        </div>
      </div>

      {/* Tabs + Filter + Search */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm animate-slide-up delay-4">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 pt-4">
          <div className="flex gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setStatusFilter("All"); setSearchQuery(""); }}
                className={`px-4 py-2.5 text-sm font-semibold rounded-t-lg transition-all cursor-pointer ${activeTab === tab.id
                  ? "text-blue-600 border-b-2 border-blue-500 bg-blue-50/50"
                  : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                  }`}
              >
                {tab.label}
                <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${activeTab === tab.id ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-500"}`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3 pb-2">
            <div className="relative">
              <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
              />
            </div>
            <div className="relative">
              <MdFilterList className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-9 pr-8 py-2 text-sm border border-slate-200 rounded-lg appearance-none focus:outline-none focus:border-blue-400 bg-white cursor-pointer"
              >
                <option value="All">All Status</option>
                {(activeTab === "inquiries" ? inquiryStatuses : applicationStatuses).map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Inquiries Tab */}
        {activeTab === "inquiries" && (
          <div className="p-5 animate-fade-in">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  <th className="pb-3 pr-4">Inquiry ID</th>
                  <th className="pb-3 pr-4">Student Name</th>
                  <th className="pb-3 pr-4">Parent</th>
                  <th className="pb-3 pr-4">Class</th>
                  <th className="pb-3 pr-4">Source</th>
                  <th className="pb-3 pr-4">Date</th>
                  <th className="pb-3 pr-4">Status</th>
                  <th className="pb-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredInquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-blue-50/30 transition-colors">
                    <td className="py-3 pr-4 text-sm font-mono text-slate-600">{inq.id}</td>
                    <td className="py-3 pr-4">
                      <p className="text-sm font-semibold text-slate-800">{inq.studentName}</p>
                    </td>
                    <td className="py-3 pr-4">
                      <p className="text-sm text-slate-700">{inq.parentName}</p>
                      <p className="text-xs text-slate-400">{inq.phone}</p>
                    </td>
                    <td className="py-3 pr-4 text-sm text-slate-600">{inq.classApplied}</td>
                    <td className="py-3 pr-4">
                      <span className="text-xs px-2 py-1 bg-slate-100 rounded-full text-slate-600">{inq.source}</span>
                    </td>
                    <td className="py-3 pr-4 text-sm text-slate-500">
                      {new Date(inq.inquiryDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                    </td>
                    <td className="py-3 pr-4"><StatusBadge status={inq.status} /></td>
                    <td className="py-3">
                      <Link
                        to={`/enrollment/apply/${inq.id}`}
                        className="text-xs font-semibold text-blue-600 hover:text-blue-800 px-3 py-1.5 bg-blue-50 rounded-lg hover:bg-blue-100 transition-all duration-200"
                      >
                        Convert &rarr;
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredInquiries.length === 0 && (
              <p className="text-center text-slate-400 py-8">No inquiries found.</p>
            )}
          </div>
        )}

        {/* Applications Tab */}
        {activeTab === "applications" && (
          <div className="p-5 animate-fade-in">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  <th className="pb-3 pr-4">App ID</th>
                  <th className="pb-3 pr-4">Student</th>
                  <th className="pb-3 pr-4">Class</th>
                  <th className="pb-3 pr-4">Documents</th>
                  <th className="pb-3 pr-4">Scores</th>
                  <th className="pb-3 pr-4">Date</th>
                  <th className="pb-3 pr-4">Status</th>
                  <th className="pb-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredApplications.map((app) => {
                  const docsUploaded = app.documents.filter((d) => d.uploaded).length;
                  const totalDocs = app.documents.length;
                  return (
                    <tr key={app.id} className="hover:bg-blue-50/30 transition-colors">
                      <td className="py-3 pr-4 text-sm font-mono text-slate-600">{app.id}</td>
                      <td className="py-3 pr-4">
                        <p className="text-sm font-semibold text-slate-800">{app.studentName}</p>
                        <p className="text-xs text-slate-400">{app.parentName}</p>
                      </td>
                      <td className="py-3 pr-4 text-sm text-slate-600">{app.classApplied}</td>
                      <td className="py-3 pr-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-slate-100 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full transition-all duration-500 ${docsUploaded === totalDocs ? "bg-emerald-500" : "bg-amber-400"}`}
                              style={{ width: `${(docsUploaded / totalDocs) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-slate-500">{docsUploaded}/{totalDocs}</span>
                        </div>
                      </td>
                      <td className="py-3 pr-4">
                        {app.testScore ? (
                          <div className="text-xs">
                            <span className="text-slate-500">Test: </span>
                            <span className="font-semibold text-slate-700">{app.testScore}</span>
                            <span className="text-slate-400 mx-1">|</span>
                            <span className="text-slate-500">Int: </span>
                            <span className="font-semibold text-slate-700">{app.interviewScore}</span>
                          </div>
                        ) : (
                          <span className="text-xs text-slate-400">Pending</span>
                        )}
                      </td>
                      <td className="py-3 pr-4 text-sm text-slate-500">
                        {new Date(app.applicationDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                      </td>
                      <td className="py-3 pr-4"><StatusBadge status={app.status} /></td>
                      <td className="py-3">
                        <Link
                          to={`/enrollment/review/${app.id}`}
                          className="text-xs font-semibold text-blue-600 hover:text-blue-800 px-3 py-1.5 bg-blue-50 rounded-lg hover:bg-blue-100 transition-all duration-200"
                        >
                          Review
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Admissions Tab */}
        {activeTab === "admissions" && (
          <div className="p-5 animate-fade-in">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  <th className="pb-3 pr-4">Admission ID</th>
                  <th className="pb-3 pr-4">Student</th>
                  <th className="pb-3 pr-4">Student ID</th>
                  <th className="pb-3 pr-4">Class/Section</th>
                  <th className="pb-3 pr-4">Admission Date</th>
                  <th className="pb-3 pr-4">Fee</th>
                  <th className="pb-3 pr-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {admissions.map((adm) => (
                  <tr key={adm.id} className="hover:bg-blue-50/30 transition-colors">
                    <td className="py-3 pr-4 text-sm font-mono text-slate-600">{adm.id}</td>
                    <td className="py-3 pr-4 text-sm font-semibold text-slate-800">{adm.studentName}</td>
                    <td className="py-3 pr-4 text-sm font-mono text-blue-600">{adm.studentId}</td>
                    <td className="py-3 pr-4 text-sm text-slate-600">{adm.classAdmitted}-{adm.section}</td>
                    <td className="py-3 pr-4 text-sm text-slate-500">
                      {new Date(adm.admissionDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </td>
                    <td className="py-3 pr-4">
                      {adm.feePaid ? (
                        <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1"><MdCheckCircle /> Paid</span>
                      ) : (
                        <span className="text-xs font-semibold text-amber-600 flex items-center gap-1"><MdPending /> Pending</span>
                      )}
                    </td>
                    <td className="py-3 pr-4"><StatusBadge status={adm.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnrollmentDashboard;