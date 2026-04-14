import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { MdArrowBack, MdEdit, MdClass, MdRoom, MdAccessTime, MdPeople } from "react-icons/md";
import { FaChalkboardTeacher } from "react-icons/fa";
import { classes } from "../../data/classes";
import { students } from "../../data/students";

const ClassProfile = () => {
  const navigate = useNavigate();
  const { classId } = useParams();
  const cls = classes.find((c) => c.id === classId);

  if (!cls) {
    return (
      <div className="text-center py-16">
        <p className="text-slate-500">Class not found.</p>
        <button onClick={() => navigate("/classes")} className="mt-4 text-blue-600 font-semibold hover:underline cursor-pointer">
          Back to Classes
        </button>
      </div>
    );
  }

  const classStudents = students.filter(
    (s) => s.academicInfo.currentClass === cls.className && s.academicInfo.section === cls.section && s.status === "Active"
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/classes")} className="p-2 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer">
            <MdArrowBack className="text-xl text-slate-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">{cls.className} - Section {cls.section}</h1>
            <p className="text-sm text-slate-500">{cls.id}</p>
          </div>
        </div>
        <Link
          to={`/classes/edit/${cls.id}`}
          className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-amber-600 bg-amber-50 border border-amber-200 rounded-xl hover:bg-amber-100 transition-all"
        >
          <MdEdit /> Edit Class
        </Link>
      </div>

      {/* Class Info Cards */}
      <div className="grid grid-cols-4 gap-4 animate-slide-up delay-1">
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm card-hover">
          <div className="flex items-center gap-2 mb-2">
            <FaChalkboardTeacher className="text-blue-500" />
            <span className="text-xs text-slate-500 uppercase font-semibold">Class Teacher</span>
          </div>
          <p className="text-sm font-bold text-slate-800">{cls.classTeacher}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm card-hover">
          <div className="flex items-center gap-2 mb-2">
            <MdPeople className="text-emerald-500" />
            <span className="text-xs text-slate-500 uppercase font-semibold">Students</span>
          </div>
          <p className="text-2xl font-bold text-emerald-600">{cls.totalStudents}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm card-hover">
          <div className="flex items-center gap-2 mb-2">
            <MdRoom className="text-violet-500" />
            <span className="text-xs text-slate-500 uppercase font-semibold">Room</span>
          </div>
          <p className="text-sm font-bold text-violet-600">{cls.room}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm card-hover">
          <div className="flex items-center gap-2 mb-2">
            <MdAccessTime className="text-amber-500" />
            <span className="text-xs text-slate-500 uppercase font-semibold">Schedule</span>
          </div>
          <p className="text-sm font-bold text-amber-600">{cls.schedule}</p>
        </div>
      </div>

      {/* Students in this class */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm animate-slide-up delay-2">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-700 flex items-center gap-2">
            <MdClass className="text-blue-500" /> Students in {cls.className} - {cls.section}
          </h3>
          <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">{classStudents.length} students</span>
        </div>
        {classStudents.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider bg-slate-50/80">
                  <th className="px-5 py-3">#</th>
                  <th className="px-5 py-3">Student</th>
                  <th className="px-5 py-3">Roll No</th>
                  <th className="px-5 py-3">Guardian</th>
                  <th className="px-5 py-3">Attendance</th>
                  <th className="px-5 py-3">Fee Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {classStudents.map((student, i) => (
                  <tr key={student.id} className="hover:bg-blue-50/30 transition-colors cursor-pointer" onClick={() => navigate(`/students/${student.id}`)}>
                    <td className="px-5 py-3 text-sm text-slate-400">{i + 1}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-xs">
                          {student.personalInfo.fullName.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <span className="text-sm font-semibold text-slate-800">{student.personalInfo.fullName}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-sm text-slate-600">#{student.academicInfo.rollNumber}</td>
                    <td className="px-5 py-3 text-sm text-slate-600">{student.guardianInfo.father.name}</td>
                    <td className="px-5 py-3">
                      <span className={`text-xs font-bold ${student.attendancePercent >= 90 ? "text-emerald-600" : student.attendancePercent >= 75 ? "text-amber-600" : "text-red-600"}`}>
                        {student.attendancePercent}%
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`px-2 py-0.5 text-xs font-semibold rounded ${
                        student.feeStatus === "Clear" ? "text-emerald-600 bg-emerald-50" : student.feeStatus === "Due" ? "text-amber-600 bg-amber-50" : "text-red-600 bg-red-50"
                      }`}>
                        {student.feeStatus === "Clear" ? "No Dues" : student.feeStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-slate-400 py-8">No students found in this class.</p>
        )}
      </div>
    </div>
  );
};

export default ClassProfile;
