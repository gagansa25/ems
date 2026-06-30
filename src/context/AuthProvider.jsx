import React, { useState } from 'react';
import { AuthContext } from './AuthContext';
import { getLocalStorage, setLocalStorage } from '../utils/localStorage';

const getDefaultJoiningTime = (employeeId) => {
  const joiningTimes = [
    '2026-01-08T09:00:00.000Z',
    '2026-01-15T10:00:00.000Z',
    '2026-02-01T08:00:00.000Z',
    '2026-02-10T11:00:00.000Z',
    '2026-02-18T09:30:00.000Z',
  ]

  return joiningTimes[(employeeId - 1) % joiningTimes.length]
}

const addMissingEmployeeDetails = (employees) => {
  const now = new Date().toISOString()
  let hasChanges = false

  const nextEmployees = employees.map((employee) => {
    const nextEmployee = employee.joiningAt
      ? employee
      : { ...employee, joiningAt: getDefaultJoiningTime(employee.id) }

    if (!employee.joiningAt) {
      hasChanges = true
    }

    return {
      ...nextEmployee,
      tasks: nextEmployee.tasks.map((task) => {
        if ((task.active || task.newTask) && !task.activeSince) {
          hasChanges = true
          return { ...task, activeSince: now }
        }

        return task
      }),
    }
  })

  return { employees: nextEmployees, hasChanges }
}

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(() => {
    setLocalStorage();
    const storedData = getLocalStorage();
    const { employees, hasChanges } = addMissingEmployeeDetails(storedData.employees)

    if (hasChanges) {
      localStorage.setItem('employees', JSON.stringify(employees))
    }

    return { ...storedData, employees };
  });

  return (
    <AuthContext.Provider value={{ userData, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;    
