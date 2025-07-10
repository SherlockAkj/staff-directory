import React from 'react';
import styled from 'styled-components';

const FiltersWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const SearchInput = styled.input`
  padding: 0.5rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  width: 200px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const GradeSelect = styled.select`
  padding: 0.5rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  width: 160px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

export function Filters({ searchQuery, onSearch, gradeList = [], selectedGrade, onGradeChange }) {
  return (
    <FiltersWrapper>
      <SearchInput
        type="text"
        placeholder="Search by name..."
        value={searchQuery}
        onChange={e => onSearch(e.target.value)}
      />
      <GradeSelect
        value={selectedGrade}
        onChange={e => onGradeChange(e.target.value)}
      >
        <option value="">All Grades</option>
        {gradeList.map((grade, idx) => (
          <option key={idx} value={grade}>{grade}</option>
        ))}
      </GradeSelect>
    </FiltersWrapper>
  );
}
