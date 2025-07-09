import { create } from 'zustand';

export const useEmployeeStore = create((set) => ({
  employees: [],
  grades: [],
  addEmployee: (employee) => set((state) => ({
    employees: [...state.employees, employee]
  })),
  editEmployee: (id, updatedData) => set((state) => ({
    employees: state.employees.map(emp => emp.id === id ? { ...emp, ...updatedData } : emp)
  })),
  deleteEmployee: (id) => set((state) => ({
    employees: state.employees.filter(emp => emp.id !== id)
  })),
  addGrade: (grade) => set((state) => ({
    grades: [...state.grades, grade]
  })),
  deleteGrade: (grade) => set((state) => ({
    grades: state.grades.filter(g => g !== grade)
  })),
  assignGrade: (employeeId, grade) => set((state) => ({
    employees: state.employees.map(emp => emp.id === employeeId ? { ...emp, grade } : emp)
  })),
}));