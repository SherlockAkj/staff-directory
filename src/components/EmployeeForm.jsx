import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { fetchCities } from '../services/fetchCities';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  width: 100%;
`;

const Select = styled.select`
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  width: 100%;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

const SubmitButton = styled.button`
  background: #007bff;
  color: white;
  padding: 0.5rem 1.2rem;
  border-radius: 6px;
  border: none;
  cursor: pointer;
`;

const CancelButton = styled.button`
  background: #ccc;
  color: black;
  padding: 0.5rem 1.2rem;
  border-radius: 6px;
  border: none;
  cursor: pointer;
`;

export const EmployeeForm = ({ initialData = {}, onSave, onClose }) => {
  // Fallback if initialData is null or undefined
  initialData = initialData || {};

  const [formData, setFormData] = useState({
    name: initialData.name || '',
    country: initialData.country || '',
    state: initialData.state || '',
    address: initialData.address || '',
    role: initialData.role || '',
    department: initialData.department || '',
    grade: initialData.grade || ''
  });

  const [countries, setCountries] = useState([]);
  const [statesByCountry, setStatesByCountry] = useState({});

  useEffect(() => {
    fetchCities().then(({ countries, statesByCountry }) => {
      setCountries(countries);
      setStatesByCountry(statesByCountry);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...initialData, ...formData });
    onClose();
  };

  const stateOptions = statesByCountry[formData.country] || [];

  return (
    <Form onSubmit={handleSubmit}>
      <Input name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
      <Select name="country" value={formData.country} onChange={handleChange}>
        <option value="">Select Country</option>
        {countries.map((c, i) => <option key={i} value={c}>{c}</option>)}
      </Select>
      <Select name="state" value={formData.state} onChange={handleChange}>
        <option value="">Select State</option>
        {stateOptions.map((s, i) => <option key={i} value={s}>{s}</option>)}
      </Select>
      <Input name="address" value={formData.address} onChange={handleChange} placeholder="Address" />
      <Input name="role" value={formData.role} onChange={handleChange} placeholder="Role" />
      <Input name="department" value={formData.department} onChange={handleChange} placeholder="Department" />
      <Input name="grade" value={formData.grade} onChange={handleChange} placeholder="Grade" />

      <ButtonGroup>
        <SubmitButton type="submit">Save</SubmitButton>
        <CancelButton type="button" onClick={onClose}>Cancel</CancelButton>
      </ButtonGroup>
    </Form>
  );
};
