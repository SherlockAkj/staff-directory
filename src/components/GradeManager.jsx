import { useState } from 'react';
import { useEmployeeStore } from '../store/useEmployeeStore';

export const GradeManager = ({ grades, onDelete }) => {
  const [newGrade, setNewGrade] = useState('');
  const { addGrade } = useEmployeeStore();

  const handleAdd = () => {
    if (newGrade && !grades.includes(newGrade)) {
      addGrade(newGrade);
      setNewGrade('');
    }
  };

  return (
    <div className="mt-4">
      <h2 className="text-lg font-medium text-gray-700 mb-2">Manage Grade Levels</h2>
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          value={newGrade}
          onChange={(e) => setNewGrade(e.target.value)}
          placeholder="New grade level"
          className="border rounded p-2 w-full"
        />
        <button
          onClick={handleAdd}
          className="bg-green-600 text-white px-4 rounded"
        >Add</button>
      </div>
      <div className="flex flex-wrap gap-2">
        {grades.map((grade, idx) => (
          <div key={idx} className="bg-gray-100 px-3 py-1 rounded-full flex items-center gap-2">
            <span>{grade}</span>
            <button onClick={() => onDelete(grade)} className="text-red-500">✕</button>
          </div>
        ))}
      </div>
    </div>
  );
};
