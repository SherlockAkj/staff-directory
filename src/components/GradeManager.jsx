import React, { useState } from 'react';
import styled from 'styled-components';

const Section = styled.div`
  margin-top: 2rem;
`;

const Title = styled.h2`
  font-size: 1.25rem;
  margin-bottom: 1rem;
`;

const GradeList = styled.ul`
  list-style: none;
  padding-left: 0;
`;

const GradeItem = styled.li`
  background: #f1f1f1;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DeleteButton = styled.button`
  background: #dc3545;
  color: white;
  border: none;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #b52b3d;
  }
`;

const NewGradeForm = styled.form`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const GradeInput = styled.input`
  flex: 1;
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid #ccc;
`;

const AddButton = styled.button`
  background: #28a745;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background: #218838;
  }
`;

export const GradeManager = ({ grades, onDelete }) => {
  const [newGrade, setNewGrade] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    if (newGrade.trim() && !grades.includes(newGrade.trim())) {
      grades.push(newGrade.trim());
      setNewGrade('');
    }
  };

  return (
    <Section>
      <Title>Manage Grades</Title>
      <GradeList>
        {grades.map((grade, index) => (
          <GradeItem key={index}>
            <span>{grade}</span>
            <DeleteButton onClick={() => onDelete(grade)}>Delete</DeleteButton>
          </GradeItem>
        ))}
      </GradeList>

      <NewGradeForm onSubmit={handleAdd}>
        <GradeInput
          value={newGrade}
          onChange={(e) => setNewGrade(e.target.value)}
          placeholder="Add new grade..."
        />
        <AddButton type="submit">Add</AddButton>
      </NewGradeForm>
    </Section>
  );
};
