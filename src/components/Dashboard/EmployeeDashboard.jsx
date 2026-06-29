import React from 'react'
import Header from '../other/Header'
import TaskListNumber from '../other/TaskListNumber'
import TaskList from '../TaskList/TaskList'

const getEmployeeAvatar = (employeeId) => {
  const backgroundColors = ['#166534', '#1d4ed8', '#7c3aed', '#be123c', '#0f766e']
  const color = backgroundColors[(employeeId - 1) % backgroundColors.length]
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160">
      <rect width="160" height="160" rx="80" fill="${color}"/>
      <circle cx="80" cy="62" r="28" fill="#f8fafc"/>
      <path d="M35 137c8-31 25-46 45-46s37 15 45 46" fill="#f8fafc"/>
      <text x="80" y="151" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" font-weight="700" fill="#ffffff">E${employeeId}</text>
    </svg>
  `

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

const EmployeeDashboard = ({ employee, handleUpdateTaskStatus, handleLogout }) => {
  if (!employee) {
    return <div className='min-h-screen bg-[#1C1C1C] p-10 text-white'>Loading employee...</div>
  }

  const ongoingTasks = employee.tasks.filter((task) => task.active || task.newTask)

  return (
    <div className='min-h-screen bg-[#1C1C1C] p-6 text-white md:p-10'>
        <Header name={`Employee ${employee.id}`} handleLogout={handleLogout} />

        <section className='mt-8 grid gap-5 lg:grid-cols-[0.85fr_1.15fr]'>
          <div className='flex items-center gap-5 rounded-lg bg-[#111] p-5'>
            <img
              src={getEmployeeAvatar(employee.id)}
              alt={`Employee ${employee.id}`}
              className='h-24 w-24 rounded-full border-4 border-emerald-500/40 object-cover'
            />
            <div>
              <p className='text-sm font-semibold uppercase tracking-[0.18em] text-emerald-400'>Employee Profile</p>
              <h2 className='mt-2 text-3xl font-bold'>Employee {employee.id}</h2>
              <p className='mt-1 text-gray-300'>{employee.email}</p>
            </div>
          </div>

          <div className='rounded-lg bg-[#111] p-5'>
            <div className='flex items-center justify-between gap-4'>
              <div>
                <p className='text-sm font-semibold uppercase tracking-[0.18em] text-blue-300'>Ongoing Work</p>
                <h2 className='mt-2 text-3xl font-bold'>{ongoingTasks.length}</h2>
              </div>
              <span className='rounded-full bg-blue-500/20 px-4 py-2 text-sm font-semibold text-blue-200'>
                In progress
              </span>
            </div>

            <div className='mt-4 grid gap-2 sm:grid-cols-2'>
              {ongoingTasks.length > 0 ? ongoingTasks.slice(0, 4).map((task, index) => (
                <div key={`${task.taskTitle}-${index}`} className='rounded border border-white/10 bg-white/5 p-3'>
                  <p className='font-semibold'>{task.taskTitle}</p>
                  <p className='mt-1 text-sm text-gray-400'>{task.taskDate}</p>
                </div>
              )) : (
                <p className='text-sm text-gray-400'>No ongoing work right now.</p>
              )}
            </div>
          </div>
        </section>

        <TaskListNumber tasks={employee.tasks} />
        <TaskList
          employeeId={employee.id}
          tasks={employee.tasks}
          handleUpdateTaskStatus={handleUpdateTaskStatus}
        />
    </div>
  )
}

export default EmployeeDashboard
