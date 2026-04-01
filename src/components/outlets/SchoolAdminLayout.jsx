import React from 'react'
import { Outlet } from 'react-router-dom'

const SchoolAdminLayout = () => {
    return (
        <div className='flex h-screen'>
            <Outlet />
        </div>
    )
}

export default SchoolAdminLayout