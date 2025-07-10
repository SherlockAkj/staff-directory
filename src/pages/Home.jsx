import React, { useState, useEffect } from 'react';
import { useEmployeeStore } from '../store/useEmployeeStore';
import EmployeeCard from '../components/EmployeeCard';
import ModalWrapper from '../components/ModalWrapper';
import { EmployeeForm } from '../components/EmployeeForm';
import { Filters } from '../components/Filters';
import { GradeManager } from '../components/GradeManager';
import { EmployeeProfile } from './EmployeeProfile';
import styled from 'styled-components';

const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #222;
`;

const AddButton = styled.button`
  background: #007bff;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: none;
  cursor: pointer;
`;

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
    <Container>
      <Header>
        <Title>Staff Directory</Title>
        <AddButton onClick={() => { setSelected(null); setModalOpen(true); }}>
          + Add Employee
        </AddButton>
      </Header>

      <Filters
        searchQuery={search}
        onSearch={setSearch}
        gradeList={grades}
        onGradeChange={setFilterGrade}
      />

      <GradeManager grades={grades} onDelete={deleteGrade} />

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1rem' }}>
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
          <p style={{ color: '#999' }}>No matching employees found.</p>
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
    </Container>
  );
};

export default Home;
