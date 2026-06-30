import React, { useState } from 'react'
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

const formatDateTime = (dateValue) => {
  if (!dateValue) return 'Not available'

  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateValue))
}

const EmployeeDashboard = ({ employee, chats, handleSendMessage, handleUpdateTaskStatus, handleLogout }) => {
  const [messageText, setMessageText] = useState('')

  if (!employee) {
    return <div className='min-h-screen bg-[#1C1C1C] p-10 text-white'>Loading employee...</div>
  }

  const ongoingTasks = employee.tasks.filter((task) => task.active || task.newTask)
  const employeeMessages = chats.filter((message) => message.employeeId === employee.id)

  const submitMessage = (event) => {
    event.preventDefault()
    handleSendMessage(employee.id, 'employee', messageText)
    setMessageText('')
  }

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
              <p className='mt-2 text-sm text-gray-400'>Joined {formatDateTime(employee.joiningAt)}</p>
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

        <section className='mt-8 rounded-lg bg-[#111] p-5'>
          <div className='mb-5 flex flex-col justify-between gap-2 md:flex-row md:items-end'>
            <div>
              <p className='text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300'>Direct Chat</p>
              <h2 className='mt-2 text-2xl font-semibold'>Admin Messages</h2>
            </div>
            <p className='text-sm text-gray-300'>{employeeMessages.length} messages</p>
          </div>

          <div className='flex max-h-80 min-h-52 flex-col gap-3 overflow-y-auto rounded border border-white/10 bg-white/5 p-4'>
            {employeeMessages.length > 0 ? employeeMessages.map((message) => (
              <div
                key={message.id}
                className={`max-w-[85%] rounded-lg p-3 ${message.sender === 'employee' ? 'self-end bg-cyan-600' : 'self-start bg-white/10'}`}
              >
                <p className='text-xs font-semibold uppercase tracking-[0.12em] text-white/70'>
                  {message.sender === 'employee' ? 'You' : 'Admin'}
                </p>
                <p className='mt-1 text-sm leading-5'>{message.text}</p>
                <p className='mt-2 text-xs text-white/60'>{formatDateTime(message.createdAt)}</p>
              </div>
            )) : (
              <p className='rounded border border-dashed border-white/15 p-4 text-sm text-gray-400'>
                No direct messages yet.
              </p>
            )}
          </div>

          <form onSubmit={submitMessage} className='mt-4 flex flex-col gap-3 sm:flex-row'>
            <input
              value={messageText}
              onChange={(event) => setMessageText(event.target.value)}
              placeholder='Reply to admin...'
              className='min-w-0 flex-1 rounded border border-white/10 bg-[#1C1C1C] px-4 py-3 outline-none focus:border-cyan-500'
            />
            <button
              disabled={!messageText.trim()}
              className='rounded bg-cyan-600 px-5 py-3 font-semibold text-white hover:bg-cyan-700 disabled:cursor-not-allowed disabled:bg-gray-700'
            >
              Send
            </button>
          </form>
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
