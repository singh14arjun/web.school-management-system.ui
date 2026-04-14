import React, { useEffect, useState } from 'react'
import axios from 'axios'

const School = () => {
  const [schools, setSchools] = useState([])
  useEffect(() => {
    axios.get('http://localhost:3000/schools')
      .then(response => {
        setSchools(response.data)
      })
      .catch(error => {
        console.error('Error fetching schools:', error)
      })
  }, [])

  const getBorderColor = (type) => {
    switch (type) {
      case 'Primary': return 'border-blue-500';
      case 'Secondary': return 'border-emerald-500';
      case 'Higher Secondary': return 'border-red-500';
      case 'K-12': return 'border-amber-500';
      default: return 'border-violet-500';
    }
  };

  const getBgColor = (type) => {
    switch (type) {
      case 'Primary': return 'bg-blue-50/50';
      case 'Secondary': return 'bg-emerald-50/50';
      case 'Higher Secondary': return 'bg-red-50/50';
      case 'K-12': return 'bg-amber-50/50';
      default: return 'bg-violet-50/50';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Schools</h1>
        <p className="text-sm text-slate-500">{schools.length} registered schools</p>
      </div>

      <div className="grid grid-cols-3 gap-5">
        {schools.map((school, i) => (
          <div
            key={school.id}
            className={`bg-white rounded-xl border-l-4 border border-slate-100 shadow-sm card-hover p-5 animate-slide-up ${getBorderColor(school.type)}`}
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                className="w-14 h-14 rounded-xl object-cover border border-slate-200 shadow-sm"
                src={school.schoolLogo || "https://via.placeholder.com/80"}
                alt="logo"
              />
              <div>
                <h3 className="text-base font-bold text-slate-800">{school.schoolName}</h3>
                <p className="text-xs text-slate-400 font-mono">{school.schoolCode}</p>
              </div>
            </div>

            <p className="text-sm text-slate-500 mb-3">
              {school.address?.city || 'N/A'}, {school.address?.state || ''}
            </p>

            <div className={`grid grid-cols-2 gap-2 text-sm p-3 rounded-xl mb-3 ${getBgColor(school.type)}`}>
              <div><span className="text-slate-500">Type:</span> <span className="font-medium">{school.type}</span></div>
              <div><span className="text-slate-500">Medium:</span> <span className="font-medium">{school.medium}</span></div>
              <div><span className="text-slate-500">Students:</span> <span className="font-medium">{school.totalStudents || 0}</span></div>
              <div><span className="text-slate-500">Teachers:</span> <span className="font-medium">{school.totalTeachers || 0}</span></div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-100">
              <span>{school.schoolPhone}</span>
              <span className={`font-semibold px-2 py-0.5 rounded-full ${school.isActive ? 'text-emerald-600 bg-emerald-50' : 'text-red-500 bg-red-50'}`}>
                {school.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>

            {school.schoolImages?.length > 0 && (
              <div className="flex gap-2 overflow-x-auto mt-3 pt-3 border-t border-slate-100">
                {school.schoolImages.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt="school"
                    className="w-16 h-16 rounded-lg object-cover border border-slate-200"
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {schools.length === 0 && (
        <div className="text-center py-16">
          <p className="text-slate-400">No schools found. Start by adding one.</p>
        </div>
      )}
    </div>
  )
}

export default School