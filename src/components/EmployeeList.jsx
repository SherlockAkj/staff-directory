import React from 'react';
import styled from 'styled-components';
import EmployeeCard from './EmployeeCard';

// Example: You may need to fetch employees from props or context/store
// For now, let's assume you pass employees as a prop

const ListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-top: 2rem;
`;

function EmployeeList({ employees = [], onView, onEdit, onDelete }) {
  if (!employees.length) {
    return <p>No employees found.</p>;
  }

  return (
    <ListWrapper>
      {employees.map(emp => (
        <EmployeeCard
          key={emp.id}
          employee={emp}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ListWrapper>
  );
}

export default EmployeeList;