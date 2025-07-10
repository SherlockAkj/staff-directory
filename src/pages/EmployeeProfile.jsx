import React from 'react';
import styled from 'styled-components';

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Name = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  color: #1f2937;
`;

export const EmployeeProfile = ({ employee }) => {
  if (!employee) return null;

  return (
    <ProfileWrapper>
      <Name>{employee.name}</Name>
      <p><strong>Role:</strong> {employee.role}</p>
      <p><strong>Department:</strong> {employee.department}</p>
      <p><strong>Grade:</strong> {employee.grade}</p>
      <p><strong>Country:</strong> {employee.country}</p>
      <p><strong>State:</strong> {employee.state}</p>
      <p><strong>Address:</strong> {employee.address}</p>
    </ProfileWrapper>
  );
};