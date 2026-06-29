import React from 'react'
import Header from '../other/Header'
import CreateTask from '../other/CreateTask'
import AllTask from '../other/AllTask'

const AdminDashboard = ({ employees, handleCreateTask, handleLogout }) => {
  const totalTasks = employees.reduce((total, employee) => total + employee.tasks.length, 0)
  const completedTasks = employees.reduce(
    (total, employee) => total + employee.tasks.filter((task) => task.completed).length,
    0,
  )
  const activeTasks = employees.reduce(
    (total, employee) => total + employee.tasks.filter((task) => task.active || task.newTask).length,
    0,
  )

  return (
    <div className='min-h-screen w-full bg-[#111] p-6 text-white md:p-10'>
      <Header name='Admin' handleLogout={handleLogout} />

      <div className='mt-8 grid gap-4 md:grid-cols-3'>
        <div className='rounded-lg bg-[#1C1C1C] p-5'>
          <h2 className='text-3xl font-bold'>{employees.length}</h2>
          <p className='text-sm text-gray-300'>Total Employees</p>
        </div>
        <div className='rounded-lg bg-[#1C1C1C] p-5'>
          <h2 className='text-3xl font-bold'>{totalTasks}</h2>
          <p className='text-sm text-gray-300'>All Tasks</p>
        </div>
        <div className='rounded-lg bg-[#1C1C1C] p-5'>
          <h2 className='text-3xl font-bold'>{activeTasks}</h2>
          <p className='text-sm text-gray-300'>Active Tasks</p>
        </div>
      </div>

      <CreateTask employees={employees} handleCreateTask={handleCreateTask} />
      <AllTask employees={employees} completedTasks={completedTasks} />
    </div>
  )
}

export default AdminDashboard
