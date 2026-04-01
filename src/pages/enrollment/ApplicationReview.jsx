import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdArrowBack, MdCheckCircle, MdCancel, MdPending } from "react-icons/md";
import { toast } from "react-toastify";
import { applications } from "../../data/enrollment";

const ApplicationReview = () => {
  const navigate = useNavigate();
  const { applicationId } = useParams();
  const application = applications.find((a) => a.id === applicationId);
  const [status, setStatus] = useState(application?.status || "Under Review");

  if (!application) {
    return (
      <div className="text-center py-16">
        <p className="text-slate-500">Application not found.</p>
        <button onClick={() => navigate("/enrollment")} className="mt-4 text-blue-600 font-semibold hover:underline cursor-pointer">
          Back to Enrollment
        </button>
      </div>
    );
  }

  const docsUploaded = application.documents.filter((d) => d.uploaded).length;
  const totalDocs = application.documents.length;

  const handleApprove = () => {
    setStatus("Approved");
    toast.success(`Application ${application.id} approved! Student ID will be generated.`);
  };

  const handleReject = () => {
    setStatus("Rejected");
    toast.error(`Application ${application.id} rejected.`);
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/enrollment")} className="p-2 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer">
            <MdArrowBack className="text-xl text-slate-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Application Review</h1>
            <p className="text-sm text-slate-500">{application.id} &bull; {application.studentName}</p>
          </div>
        </div>

        <div className={`px-4 py-2 rounded-xl text-sm font-bold ${
          status === "Approved" ? "bg-emerald-50 text-emerald-600 border border-emerald-200" :
          status === "Rejected" ? "bg-red-50 text-red-600 border border-red-200" :
          "bg-blue-50 text-blue-600 border border-blue-200"
        }`}>
          {status}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Left: Student Info */}
        <div className="col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5 card-hover animate-slide-up delay-1">
            <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4">Student Information</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-slate-500">Full Name</span>
                <p className="font-semibold text-slate-800">{application.studentName}</p>
              </div>
              <div>
                <span className="text-slate-500">Date of Birth</span>
                <p className="font-semibold text-slate-800">{new Date(application.dob).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>
              </div>
              <div>
                <span className="text-slate-500">Gender</span>
                <p className="font-semibold text-slate-800">{application.gender}</p>
              </div>
              <div>
                <span className="text-slate-500">Class Applied</span>
                <p className="font-semibold text-slate-800">{application.classApplied}</p>
              </div>
              <div>
                <span className="text-slate-500">Previous School</span>
                <p className="font-semibold text-slate-800">{application.previousSchool}</p>
              </div>
              <div>
                <span className="text-slate-500">Application Date</span>
                <p className="font-semibold text-slate-800">
                  {new Date(application.applicationDate).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5 card-hover animate-slide-up delay-2">
            <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4">Parent / Guardian</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-slate-500">Parent Name</span>
                <p className="font-semibold text-slate-800">{application.parentName}</p>
              </div>
              <div>
                <span className="text-slate-500">Phone</span>
                <p className="font-semibold text-slate-800">{application.phone}</p>
              </div>
              <div>
                <span className="text-slate-500">Email</span>
                <p className="font-semibold text-slate-800">{application.email}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5 card-hover animate-slide-up delay-3">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Documents</h3>
              <span className="text-xs text-slate-500">{docsUploaded}/{totalDocs} uploaded</span>
            </div>
            <div className="space-y-2">
              {application.documents.map((doc) => (
                <div key={doc.name} className={`flex items-center justify-between p-3 rounded-xl ${doc.uploaded ? "bg-emerald-50/50 border border-emerald-100" : "bg-red-50/50 border border-red-100"}`}>
                  <div className="flex items-center gap-2">
                    {doc.uploaded ? (
                      <MdCheckCircle className="text-emerald-500" />
                    ) : (
                      <MdCancel className="text-red-400" />
                    )}
                    <span className="text-sm font-medium text-slate-700">{doc.name}</span>
                  </div>
                  <span className={`text-xs font-semibold ${doc.uploaded ? "text-emerald-600" : "text-red-500"}`}>
                    {doc.uploaded ? "Uploaded" : "Missing"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5 card-hover animate-slide-up delay-4">
            <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-3">Remarks</h3>
            <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-xl">{application.remarks}</p>
          </div>
        </div>

        {/* Right: Scores + Actions */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5 card-hover animate-slide-right delay-1">
            <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4">Assessment Scores</h3>
            {application.testScore ? (
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-500">Admission Test</span>
                    <span className="font-bold text-slate-800">{application.testScore}/100</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2.5">
                    <div className={`h-2.5 rounded-full transition-all duration-1000 ${application.testScore >= 70 ? "bg-emerald-500" : application.testScore >= 50 ? "bg-amber-500" : "bg-red-500"}`}
                      style={{ width: `${application.testScore}%` }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-500">Interview</span>
                    <span className="font-bold text-slate-800">{application.interviewScore}/100</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2.5">
                    <div className={`h-2.5 rounded-full transition-all duration-1000 ${application.interviewScore >= 70 ? "bg-emerald-500" : application.interviewScore >= 50 ? "bg-amber-500" : "bg-red-500"}`}
                      style={{ width: `${application.interviewScore}%` }}></div>
                  </div>
                </div>
                <div className="pt-3 border-t border-slate-100">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500 font-medium">Average Score</span>
                    <span className="text-lg font-bold text-blue-600">
                      {((application.testScore + application.interviewScore) / 2).toFixed(0)}%
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-6">
                <MdPending className="text-4xl text-slate-300 mx-auto mb-2" />
                <p className="text-sm text-slate-400">Assessment pending</p>
              </div>
            )}
          </div>

          {application.interviewDate && (
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5 card-hover animate-slide-right delay-2">
              <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-3">Interview</h3>
              <div className="text-sm space-y-2">
                <p><span className="text-slate-500">Date:</span> <span className="font-medium">{new Date(application.interviewDate).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</span></p>
                <p><span className="text-slate-500">Status:</span> <span className="font-medium text-emerald-600">Completed</span></p>
              </div>
            </div>
          )}

          {status === "Under Review" && (
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5 space-y-3 animate-slide-right delay-3">
              <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-2">Decision</h3>
              <button
                onClick={handleApprove}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 cursor-pointer"
              >
                <MdCheckCircle className="text-xl" />
                Approve & Admit
              </button>
              <button
                onClick={handleReject}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white text-red-500 font-semibold rounded-xl border border-red-200 hover:bg-red-50 hover:shadow-sm transition-all duration-300 cursor-pointer"
              >
                <MdCancel className="text-xl" />
                Reject Application
              </button>
            </div>
          )}

          {status === "Approved" && (
            <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-5 text-center animate-scale-in">
              <MdCheckCircle className="text-4xl text-emerald-500 mx-auto mb-2" />
              <p className="text-sm font-bold text-emerald-700">Application Approved</p>
              <p className="text-xs text-emerald-600 mt-1">Student ID will be generated after fee payment.</p>
            </div>
          )}

          {status === "Rejected" && (
            <div className="bg-red-50 rounded-xl border border-red-200 p-5 text-center animate-scale-in">
              <MdCancel className="text-4xl text-red-400 mx-auto mb-2" />
              <p className="text-sm font-bold text-red-700">Application Rejected</p>
              <p className="text-xs text-red-600 mt-1">Parent has been notified.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicationReview;