import { useNavigate, useParams } from "react-router-dom";

const DeleteStaff = () => {
    const { staffId } = useParams();
    // const staff = staffData.find((s) => s.id === staffId);
    return (
        <div>DeleteStaff</div>
    )
}

export default DeleteStaff