import React, { useState } from 'react'
import { schools } from '../../data/schools'
import NoDataFound from '../NoDataFound'
import { PiPlusBold } from 'react-icons/pi'
import TableListSchool from './TableListSchool'

import GridSchoolList from './GridSchoolList'

const School = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [view, setView] = useState('grid');
  const [isActive, setIsActive] = useState(false);




  const getBorderColor = (type) => {
    switch (type) {
      case 'Primary': return 'border-blue-500';
      case 'Secondary': return 'border-emerald-500';
      case 'Higher Secondary': return 'border-violet-500';
      case 'Senior Secondary': return 'border-gray-800';
      case 'K-12': return 'border-amber-500';
      default: return 'border-violet-500';
    }
  };

  const getBorderColorTable = (type) => {
    switch (type) {
      case 'Primary': return '#3b82f6';
      case 'Secondary': return '#10b981';
      case 'Higher Secondary': return '#8b5cf6';
      case 'Senior Secondary': return '#1f2937';
      case 'K-12': return '#f59e0b';
      default: return '#8b5cf6';
    }
  };

  const getBgColor = (type) => {
    switch (type) {
      case 'Primary': return 'bg-blue-50/50';
      case 'Secondary': return 'bg-emerald-50/50';
      case 'Higher Secondary': return 'bg-violet-50/50';
      case 'Senior Secondary': return 'bg-gray-50/50';
      case 'K-12': return 'bg-amber-50/50';
      default: return 'bg-violet-50/50';
    }
  };

  const filteredSchools = schools.filter((school) => {
    const matchesSearch =
      school.schoolName.toLowerCase().includes(search.toLowerCase()) ||
      school.schoolCode.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'active' && school.isActive) ||
      (statusFilter === 'inactive' && !school.isActive);

    const matchesType =
      typeFilter === 'all' || school.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  const showClear =
    search !== '' || statusFilter !== 'all' || typeFilter !== 'all';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Schools</h1>
        <p className="text-sm text-gray-500">
          {filteredSchools.length} schools
        </p>
      </div>

      <div className="flex justify-between">
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-4 py-2 rounded w-100"
        />

        <div className="flex gap-2">
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="border px-3 py-2 rounded">
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="border px-3 py-2 rounded">
            <option value="all">All</option>
            <option value="Primary">Primary</option>
            <option value="Secondary">Secondary</option>
            <option value="Higher Secondary">Higher Secondary</option>
            <option value="Senior Secondary">Senior Secondary</option>
            <option value="K-12">K-12</option>
          </select>

          {showClear && (
            <button
              onClick={() => {
                setSearch('');
                setStatusFilter('all');
                setTypeFilter('all');
              }}
              className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 cursor-pointer"
            >
              Clear
            </button>
          )}

          <button onClick={() => setView('grid')} className={`px-4 py-2 rounded transition-all duration-200 ${view === 'grid' ? 'bg-blue-500 text-white' : 'bg-gray-200'} hover:bg-blue-600 hover:text-white cursor-pointer`}>Grid View </button>
          <button onClick={() => setView('table')} className={`px-4 py-2 rounded transition-all duration-200 ${view === 'table' ? 'bg-blue-500 text-white' : 'bg-gray-200'} hover:bg-blue-600 hover:text-white cursor-pointer`}>Table View</button>
          <button className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-green-700 hover:text-white cursor-pointer">
            <PiPlusBold /> Add School
          </button>
        </div>
      </div>



      {filteredSchools.length === 0 ? (
        <NoDataFound />
      ) : view === 'grid' ? (
        <GridSchoolList
          schools={filteredSchools}
          getBgColor={getBgColor}
          getBorderColor={getBorderColor}
        />
      ) : (
        <TableListSchool
          schools={filteredSchools}
          getBgColor={getBgColor}
          getBorderColorTable={getBorderColorTable} />
      )}
    </div>
  );
};

export default School;