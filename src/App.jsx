import React, { useContext, useState } from 'react'
import Home from './components/Home/Home'
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard'
import AdminDashboard from './components/Dashboard/AdminDashboard'
import { AuthContext } from './context/AuthContext'

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(() => JSON.parse(localStorage.getItem('loggedInUser')))
  const authContext = useContext(AuthContext)
  const authData = authContext?.userData
  const setUserData = authContext?.setUserData
  const user = loggedInUser?.role || null
  const loggedInUserData = authData?.employees.find((employee) => employee.id === loggedInUser?.id) || null

  const handleAdminLogin = (email, password) => {
    if (email !== authData.admin.email || password !== authData.admin.password) {
      alert('Invalid admin credentials')
      return false
    }

    const nextUser = { role: 'admin' }
    setLoggedInUser(nextUser)
    localStorage.setItem('loggedInUser', JSON.stringify(nextUser))
    return true
  }

  const handleEmployeeLogin = (email, password) => {
    const employee = authData.employees.find((employee) => employee.email === email && employee.password === password)

    if (!employee) {
      alert('Invalid employee credentials')
      return false
    }

    const nextUser = { role: 'employee', id: employee.id }
    setLoggedInUser(nextUser)
    localStorage.setItem('loggedInUser', JSON.stringify(nextUser))
    return true
  }

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser')
    setLoggedInUser(null)
  }

  const handleCreateTask = (employeeId, task) => {
    const nextEmployees = authData.employees.map((employee) => {
      if (employee.id !== Number(employeeId)) return employee

      return {
        ...employee,
        tasks: [...employee.tasks, task],
      }
    })

    const nextData = { ...authData, employees: nextEmployees }
    localStorage.setItem('employees', JSON.stringify(nextEmployees))
    setUserData(nextData)
  }

  const handleUpdateTaskStatus = (employeeId, taskIndex, status) => {
    const nextEmployees = authData.employees.map((employee) => {
      if (employee.id !== Number(employeeId)) return employee

      const nextTasks = employee.tasks.map((task, index) => {
        if (index !== taskIndex) return task

        return {
          ...task,
          active: status === 'active',
          newTask: false,
          completed: status === 'completed',
          failed: status === 'failed',
        }
      })

      return {
        ...employee,
        tasks: nextTasks,
      }
    })

    const nextData = { ...authData, employees: nextEmployees }
    localStorage.setItem('employees', JSON.stringify(nextEmployees))
    setUserData(nextData)
  }

  if (!authData) {
    return <div className='min-h-screen bg-[#111] p-10 text-white'>Loading EMS...</div>
  }

  return (
    <div>
      {!user && (
        <Home
          employees={authData.employees}
          handleAdminLogin={handleAdminLogin}
          handleEmployeeLogin={handleEmployeeLogin}
        />
      )}
      {user === 'admin' && (
        <AdminDashboard
          employees={authData.employees}
          handleCreateTask={handleCreateTask}
          handleLogout={handleLogout}
        />
      )}
      {user === 'employee' && (
        <EmployeeDashboard
          employee={loggedInUserData}
          handleUpdateTaskStatus={handleUpdateTaskStatus}
          handleLogout={handleLogout}
        />
      )}
    </div>
  )
}

export default App
