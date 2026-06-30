import React, { useContext, useState } from 'react'
import Home from './components/Home/Home'
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard'
import AdminDashboard from './components/Dashboard/AdminDashboard'
import { AuthContext } from './context/AuthContext'

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(() => JSON.parse(localStorage.getItem('loggedInUser')))
  const [chats, setChats] = useState(() => JSON.parse(localStorage.getItem('chats')) || [])
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

        const isActive = status === 'active'

        return {
          ...task,
          active: isActive,
          newTask: false,
          completed: status === 'completed',
          failed: status === 'failed',
          activeSince: isActive ? task.activeSince || new Date().toISOString() : task.activeSince,
          completedAt: status === 'completed' ? new Date().toISOString() : task.completedAt,
          failedAt: status === 'failed' ? new Date().toISOString() : task.failedAt,
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

  const handleSendMessage = (employeeId, sender, text) => {
    const message = {
      id: `${Date.now()}-${employeeId}-${sender}`,
      employeeId: Number(employeeId),
      sender,
      text: text.trim(),
      createdAt: new Date().toISOString(),
    }

    if (!message.text) return

    const nextChats = [...chats, message]
    localStorage.setItem('chats', JSON.stringify(nextChats))
    setChats(nextChats)
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
          chats={chats}
          handleCreateTask={handleCreateTask}
          handleSendMessage={handleSendMessage}
          handleLogout={handleLogout}
        />
      )}
      {user === 'employee' && (
        <EmployeeDashboard
          employee={loggedInUserData}
          chats={chats}
          handleSendMessage={handleSendMessage}
          handleUpdateTaskStatus={handleUpdateTaskStatus}
          handleLogout={handleLogout}
        />
      )}
    </div>
  )
}

export default App
