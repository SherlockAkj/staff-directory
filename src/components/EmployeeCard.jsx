export const EmployeeCard = ({ employee, onView, onEdit, onDelete }) => (
  <div className="bg-white shadow-lg rounded-2xl p-4 w-full md:w-1/2 lg:w-1/3">
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-xl font-bold text-gray-800">{employee.name}</h2>
        <p className="text-sm text-gray-500">{employee.role} | {employee.department}</p>
      </div>
      <div className="space-x-2">
        <button className="text-blue-600" onClick={() => onView(employee)}>View </button>
        <button className="text-yellow-600" onClick={() => onEdit(employee)}>Edit</button>
        <button className="text-red-600" onClick={() => onDelete(employee.id)}>Delete</button>
      </div>
    </div>
  </div>
);
