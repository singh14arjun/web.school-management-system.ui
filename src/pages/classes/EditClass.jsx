import { useNavigate, useParams } from "react-router-dom";
import { classes } from "../../data/classes";
import AddClass from "./AddClass";

const EditClass = () => {
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

  return <AddClass initialData={cls} isEdit />;
};

export default EditClass;
