import { useState, useEffect } from 'react';
import { useEmployeeStore } from '../store/useEmployeeStore';
import { EmployeeCard } from '../components/EmployeeCard';
import { ModalWrapper } from '../components/ModalWrapper';
import { EmployeeForm } from '../components/EmployeeForm';
import { Filters } from '../components/Filters';
import { GradeManager } from '../components/GradeManager';
import { EmployeeProfile } from './EmployeeProfile';

export const Home = () => {
  const {
    employees,
    grades,
    addEmployee,
    editEmployee,
    deleteEmployee,
    deleteGrade,
    addGrade
  } = useEmployeeStore();

  const [search, setSearch] = useState('');
  const [filterGrade, setFilterGrade] = useState('');
  const [selected, setSelected] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const savedEmployees = JSON.parse(localStorage.getItem('employees') || '[]');
    const savedGrades = JSON.parse(localStorage.getItem('grades') || '[]');
    savedEmployees.forEach(emp => addEmployee(emp));
    savedGrades.forEach(grade => addGrade(grade));
  }, []);

  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employees));
  }, [employees]);

  useEffect(() => {
    localStorage.setItem('grades', JSON.stringify(grades));
  }, [grades]);

  const handleSave = (data) => {
    if (data.id) {
      editEmployee(data.id, data);
    } else {
      addEmployee({ ...data, id: Date.now() });
    }
  };

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(search.toLowerCase()) &&
    (filterGrade ? emp.grade === filterGrade : true)
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-gray-800">Staff Directory</h1>
        <button
          onClick={() => { setSelected(null); setModalOpen(true); }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >+ Add Employee</button>
      </div>

      <Filters
        searchQuery={search}
        onSearch={setSearch}
        gradeList={grades}
        onGradeChange={setFilterGrade}
      />

      <GradeManager grades={grades} onDelete={deleteGrade} />

      <div className="flex flex-wrap gap-4 mt-4">
        {filteredEmployees.map(emp => (
          <EmployeeCard
            key={emp.id}
            employee={emp}
            onView={(emp) => setProfile(emp)}
            onEdit={(emp) => { setSelected(emp); setModalOpen(true); }}
            onDelete={deleteEmployee}
          />
        ))}
        {filteredEmployees.length === 0 && (
          <p className="text-gray-500">No matching employees found.</p>
        )}
      </div>

      <ModalWrapper
        isOpen={isModalOpen}
        title={selected ? 'Edit Employee' : 'Add Employee'}
        onClose={() => setModalOpen(false)}
      >
        <EmployeeForm
          initialData={selected}
          onSave={handleSave}
          onClose={() => setModalOpen(false)}
        />
      </ModalWrapper>

      <ModalWrapper
        isOpen={!!profile}
        title="Employee Profile"
        onClose={() => setProfile(null)}
      >
        <EmployeeProfile employee={profile} />
      </ModalWrapper>
    </div>
  );
};

useEffect(() => {
  if (employees.length === 0) {
    const savedEmployees = JSON.parse(localStorage.getItem('employees') || '[]');
    savedEmployees.forEach(emp => addEmployee(emp));
  }
  if (grades.length === 0) {
    const savedGrades = JSON.parse(localStorage.getItem('grades') || '[]');
    savedGrades.forEach(grade => addGrade(grade));
  }
  // eslint-disable-next-line
}, []);