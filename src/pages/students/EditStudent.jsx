import { useNavigate, useParams } from "react-router-dom";
import { students } from "../../data/students";
import StudentForm from "./StudentForm";

const EditStudent = () => {
  const navigate = useNavigate();
  const { studentId } = useParams();
  const student = students.find((s) => s.id === studentId);

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

  return <StudentForm initialData={student} isEdit />;
};

export default EditStudent;
