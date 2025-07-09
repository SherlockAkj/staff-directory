export const EmployeeProfile = ({ employee }) => {
  if (!employee) return null;

  return (
    <div className="space-y-2">
      <h2 className="text-2xl font-semibold text-gray-800">{employee.name}</h2>
      <p><strong>Role:</strong> {employee.role}</p>
      <p><strong>Department:</strong> {employee.department}</p>
      <p><strong>Grade:</strong> {employee.grade}</p>
      <p><strong>Country:</strong> {employee.country}</p>
      <p><strong>State:</strong> {employee.state}</p>
      <p><strong>Address:</strong> {employee.address}</p>
    </div>
  );
};