import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdArrowBack, MdClass, MdPeople, MdRoom, MdAccessTime } from "react-icons/md";
import { FaChalkboardTeacher } from "react-icons/fa";
import { toast } from "react-toastify";

const AddClass = ({ initialData = null, isEdit = false }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    className: initialData?.className || "",
    section: initialData?.section || "",
    classTeacher: initialData?.classTeacher || "",
    totalStudents: initialData?.totalStudents || "",
    room: initialData?.room || "",
    schedule: initialData?.schedule || "",
    status: initialData?.status || "Active",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.className || !form.section) {
      toast.error("Please fill Class and Section");
      return;
    }
    toast.success(isEdit ? "Class updated successfully!" : "Class created successfully!");
    navigate("/classes");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button onClick={() => navigate("/classes")} className="p-2 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer">
          <MdArrowBack className="text-xl text-slate-600" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{isEdit ? "Edit Class" : "Add New Class"}</h1>
          <p className="text-sm text-slate-500">
            {isEdit ? `Editing ${initialData?.className} - ${initialData?.section}` : "Create a new class with section details"}
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-100 shadow-sm p-6 animate-slide-up delay-1">
        <div className="grid grid-cols-2 gap-6">
          {/* Class Name */}
          <div>
            <label className="text-sm font-medium text-slate-600 mb-1.5 flex items-center gap-1.5">
              <MdClass className="text-blue-500" /> Class Name *
            </label>
            <select name="className" value={form.className} onChange={handleChange}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 bg-white cursor-pointer">
              <option value="">Select Class</option>
              {["Nursery", "LKG", "UKG", ...Array.from({ length: 12 }, (_, i) => `Class ${i + 1}`)].map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Section */}
          <div>
            <label className="text-sm font-medium text-slate-600 mb-1.5 flex items-center gap-1.5">
              <MdClass className="text-blue-500" /> Section *
            </label>
            <select name="section" value={form.section} onChange={handleChange}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 bg-white cursor-pointer">
              <option value="">Select Section</option>
              {["A", "B", "C", "D", "E"].map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>

          {/* Class Teacher */}
          <div>
            <label className="text-sm font-medium text-slate-600 mb-1.5 flex items-center gap-1.5">
              <FaChalkboardTeacher className="text-blue-500" /> Class Teacher
            </label>
            <input name="classTeacher" value={form.classTeacher} onChange={handleChange} placeholder="Enter teacher name"
              className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all" />
          </div>

          {/* Max Students */}
          <div>
            <label className="text-sm font-medium text-slate-600 mb-1.5 flex items-center gap-1.5">
              <MdPeople className="text-blue-500" /> Max Students
            </label>
            <input type="number" name="totalStudents" value={form.totalStudents} onChange={handleChange} placeholder="e.g. 40"
              className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all" />
          </div>

          {/* Room Number */}
          <div>
            <label className="text-sm font-medium text-slate-600 mb-1.5 flex items-center gap-1.5">
              <MdRoom className="text-blue-500" /> Room Number
            </label>
            <input name="room" value={form.room} onChange={handleChange} placeholder="e.g. 101"
              className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all" />
          </div>

          {/* Schedule */}
          <div>
            <label className="text-sm font-medium text-slate-600 mb-1.5 flex items-center gap-1.5">
              <MdAccessTime className="text-blue-500" /> Schedule
            </label>
            <input name="schedule" value={form.schedule} onChange={handleChange} placeholder="e.g. 8:00 AM - 2:00 PM"
              className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all" />
          </div>

          {/* Status */}
          <div>
            <label className="text-sm font-medium text-slate-600 mb-1.5 block">Status</label>
            <select name="status" value={form.status} onChange={handleChange}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 bg-white cursor-pointer">
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-slate-100">
          <button type="button" onClick={() => navigate("/classes")}
            className="px-6 py-2.5 text-sm font-semibold text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all cursor-pointer">
            Cancel
          </button>
          <button type="submit"
            className="px-8 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all cursor-pointer">
            {isEdit ? "Save Changes" : "Create Class"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddClass;
