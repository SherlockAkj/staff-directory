// [Previous content above remains unchanged]

import { useEffect, useState } from 'react';
import { fetchCities } from '../services/fetchCities';

// EmployeeForm.jsx (with country/state dropdowns)
export const EmployeeForm = ({ initialData = {}, onSave, onClose }) => {
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="w-full p-2 border rounded" />

      <select name="country" value={formData.country} onChange={handleChange} className="w-full p-2 border rounded">
        <option value="">Select Country</option>
        {countries.map((c, i) => <option key={i} value={c}>{c}</option>)}
      </select>

      <select name="state" value={formData.state} onChange={handleChange} className="w-full p-2 border rounded">
        <option value="">Select State</option>
        {stateOptions.map((s, i) => <option key={i} value={s}>{s}</option>)}
      </select>

      <input name="address" value={formData.address} onChange={handleChange} placeholder="Address" className="w-full p-2 border rounded" />
      <input name="role" value={formData.role} onChange={handleChange} placeholder="Role" className="w-full p-2 border rounded" />
      <input name="department" value={formData.department} onChange={handleChange} placeholder="Department" className="w-full p-2 border rounded" />
      <input name="grade" value={formData.grade} onChange={handleChange} placeholder="Grade" className="w-full p-2 border rounded" />

      <div className="flex justify-end space-x-2">
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg">Save</button>
        <button type="button" onClick={onClose} className="bg-gray-300 px-4 py-2 rounded-lg">Cancel</button>
      </div>
    </form>
  );
};