export const Filters = ({ onSearch, onGradeChange, searchQuery, gradeList }) => (
  <div className="flex flex-col md:flex-row justify-between gap-4 py-4">
    <input
      type="text"
      placeholder="Search by name..."
      value={searchQuery}
      onChange={(e) => onSearch(e.target.value)}
      className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring w-full md:w-1/2"
    />
    <select
      onChange={(e) => onGradeChange(e.target.value)}
      className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring w-full md:w-1/3"
    >
      <option value="">All Grades</option>
      {gradeList.map((grade, idx) => (
        <option key={idx} value={grade}>{grade}</option>
      ))}
    </select>
  </div>
);
