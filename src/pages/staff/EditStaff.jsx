import React from 'react'
import { useParams } from 'react-router-dom'
import { staff } from '../../data/staff'
import { useNavigate } from 'react-router-dom'
import AddStaff from './AddStaff'

const EditStaff = () => {
    const navigate = useNavigate();
    const { staffId } = useParams();
    const staffData = staff.find((s) => s.id === staffId);

    if (!staffData) {
        return (
            <div>
                <h1>Staff Not Found</h1>
                <button onClick={() => navigate("/staff")} className="mt-4 text-blue-600 font-semibold hover:underline cursor-pointer bg-blue-600 text-white px-4 py-2 rounded">
                    Back to Staff
                </button>
            </div>
        )
    }

    return (
        <AddStaff initialData={staffData} isEdit />
    )
}

export default EditStaff