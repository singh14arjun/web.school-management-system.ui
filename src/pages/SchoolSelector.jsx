import { useNavigate } from "react-router-dom";
import { schools } from "../data/schools";
import { IoSchool, IoLocation } from "react-icons/io5";
import { PiStudent } from "react-icons/pi";
import { FaChalkboardTeacher, FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";

const SchoolSelector = () => {
  const navigate = useNavigate();

  const handleSelectSchool = (school) => {
    localStorage.setItem("selectedSchool", JSON.stringify(school));
    toast.success(`Welcome to ${school.schoolName}`);
    navigate("/dashboard");
  };

  const handleAddNewSchool = () => {
    navigate("/setup");
  };
  const colorSchemes = [
    { bg: "from-blue-500 to-blue-700", light: "bg-blue-50", text: "text-blue-600", border: "border-blue-200", badge: "bg-blue-100 text-blue-700" },
    { bg: "from-emerald-500 to-emerald-700", light: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-200", badge: "bg-emerald-100 text-emerald-700" },
    { bg: "from-violet-500 to-violet-700", light: "bg-violet-50", text: "text-violet-600", border: "border-violet-200", badge: "bg-violet-100 text-violet-700" },
    { bg: "from-amber-500 to-amber-700", light: "bg-amber-50", text: "text-amber-600", border: "border-amber-200", badge: "bg-amber-100 text-amber-700" },
    { bg: "from-rose-500 to-rose-700", light: "bg-rose-50", text: "text-rose-600", border: "border-rose-200", badge: "bg-rose-100 text-rose-700" },
    { bg: "from-cyan-500 to-cyan-700", light: "bg-cyan-50", text: "text-cyan-600", border: "border-cyan-200", badge: "bg-cyan-100 text-cyan-700" },
  ];

  const AddNewSchool = () => {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm cursor-pointer overflow-hidden group hover:shadow-xl hover:shadow-slate-200/60 hover:-translate-y-2 transition-all duration-400">
        <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
          <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
          <div className="relative z-10">
            <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
              <IoSchool className="text-3xl text-white" />
            </div>
            <h3 className="text-xl font-bold text-white group-hover:tracking-wide transition-all duration-300">Add New School</h3>
            <p className="text-white/70 text-sm mt-1">Create a new school</p>
            <div className="absolute bottom-0 right-0 w-20 h-20 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
              <FaPlus className="text-4xl text-white" onClick={handleAddNewSchool} />
            </div>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="min-h-screen bg-[#f0f4ff] relative overflow-hidden">
      {/* Animated background decorations */}
      <div className="absolute top-[-80px] left-[-80px] w-72 h-72 bg-blue-200/30 rounded-full blur-3xl" style={{ animation: "float 6s ease-in-out infinite" }} />
      <div className="absolute top-[30%] right-[-60px] w-60 h-60 bg-violet-200/25 rounded-full blur-3xl" style={{ animation: "float 8s ease-in-out 1s infinite" }} />
      <div className="absolute bottom-[-60px] left-[40%] w-80 h-80 bg-emerald-200/20 rounded-full blur-3xl" style={{ animation: "float 7s ease-in-out 2s infinite" }} />

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-8 py-14">
        {/* Page Title */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-xl shadow-blue-500/30 mb-5" style={{ animation: "scaleIn 0.5s ease-out" }}>
            <IoSchool className="text-3xl text-white" />
          </div>
          <h2 className="text-3xl font-bold text-slate-800 animate-slide-up">Your Schools {schools.length > 0 ? schools.length : "0"}</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mx-auto mt-3" style={{ animation: "scaleIn 0.6s ease-out 0.3s both" }} />
        </div>

        {/* School Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schools.map((school, index) => {
            const colors = colorSchemes[index % colorSchemes.length];
            return (
              <div
                key={school.id}
                onClick={() => handleSelectSchool(school)}
                className={`bg-white rounded-2xl border ${colors.border} shadow-sm cursor-pointer overflow-hidden group
                  hover:shadow-xl hover:shadow-slate-200/60 hover:-translate-y-2 transition-all duration-400`}
                style={{
                  animation: `slideInUp 0.5s ease-out ${index * 0.1}s both`,
                }}
              >
                {/* Card Header with gradient */}
                <div className={`bg-gradient-to-r ${colors.bg} p-5 relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
                  <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
                  <div className="relative z-10">
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                      <IoSchool className="text-3xl text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:tracking-wide transition-all duration-300">{school.schoolName}</h3>
                    <p className="text-white/70 text-sm mt-1">{school.schoolCode}</p>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5">
                  {/* Location */}
                  <div className="flex items-center gap-2 text-slate-500 text-sm mb-4">
                    <IoLocation className={`${colors.text} group-hover:animate-bounce`} />
                    <span>
                      {school.address.city}, {school.address.state}
                    </span>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className={`${colors.light} rounded-xl p-3 text-center group-hover:scale-105 transition-transform duration-300`}>
                      <PiStudent className={`text-2xl ${colors.text} mx-auto mb-1`} />
                      <p className="text-lg font-bold text-slate-800">
                        {school.totalStudents}
                      </p>
                      <p className="text-xs text-slate-500">Students</p>
                    </div>
                    <div className={`${colors.light} rounded-xl p-3 text-center group-hover:scale-105 transition-transform duration-300 delay-75`}>
                      <FaChalkboardTeacher className={`text-xl ${colors.text} mx-auto mb-1`} />
                      <p className="text-lg font-bold text-slate-800">
                        {school.totalTeachers}
                      </p>
                      <p className="text-xs text-slate-500">Teachers</p>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${colors.badge}`}>
                      {school.label}
                    </span>
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${colors.badge}`}>
                      {school.medium}
                    </span>
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${colors.badge}`}>
                      {school.type}
                    </span>
                  </div>

                  {/* Status */}
                  <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className={`w-2 h-2 rounded-full ${school.isActive ? "bg-emerald-500 animate-pulse" : "bg-red-500"}`} />
                      <span className={`text-xs font-medium ${school.isActive ? "text-emerald-600" : "text-red-600"}`}>
                        {school.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>
                    <span className={`text-sm font-semibold ${colors.text} group-hover:translate-x-1.5 transition-transform duration-300`}>
                      Open Dashboard →
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
          <AddNewSchool />
        </div>

      </div>
    </div>
  );
};

export default SchoolSelector;
