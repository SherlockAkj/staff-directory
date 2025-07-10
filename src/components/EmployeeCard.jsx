import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  background: white;
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 8px;
  min-width: 250px;
  max-width: 350px;
  flex: 1 1 250px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Name = styled.h2`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const Info = styled.p`
  margin: 0.25rem 0;
  color: #555;
`;

const Actions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const Button = styled.button`
  background: ${({ color }) => color || '#007bff'};
  color: white;
  padding: 0.4rem 0.8rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.95rem;

  &:hover {
    background: ${({ hover }) => hover || '#0056b3'};
  }
`;

function EmployeeCard({ employee, onView, onEdit, onDelete }) {
  return (
    <Card>
      <div>
        <Name>{employee.name}</Name>
        <Info>Role: {employee.role}</Info>
        <Info>Department: {employee.department}</Info>
        <Info>Grade: {employee.grade}</Info>
      </div>
      <Actions>
        <Button onClick={() => onView(employee)}>View</Button>
        <Button color="#eab308" hover="#b98c00" onClick={() => onEdit(employee)}>Edit</Button>
        <Button color="#dc2626" hover="#a61b1b" onClick={() => onDelete(employee.id)}>Delete</Button>
      </Actions>
    </Card>
  );
}

export default EmployeeCard;
