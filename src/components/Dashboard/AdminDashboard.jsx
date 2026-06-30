import React, { useEffect, useState } from 'react'
import Header from '../other/Header'
import CreateTask from '../other/CreateTask'
import AllTask from '../other/AllTask'

const getEmployeeWorkTime = (employeeId) => {
  const shifts = [
    '09:00 AM - 06:00 PM',
    '10:00 AM - 07:00 PM',
    '08:00 AM - 05:00 PM',
    '11:00 AM - 08:00 PM',
    '09:30 AM - 06:30 PM',
  ]

  return shifts[(employeeId - 1) % shifts.length]
}

const getEmployeeStatus = (tasks) => {
  const hasFailedTask = tasks.some((task) => task.failed)
  const hasActiveTask = tasks.some((task) => task.active)
  const hasNewTask = tasks.some((task) => task.newTask)
  const allTasksCompleted = tasks.length > 0 && tasks.every((task) => task.completed)

  if (hasActiveTask) {
    return {
      label: 'Working',
      detail: 'Handling active tasks',
      className: 'border-emerald-400/40 bg-emerald-500/15 text-emerald-200',
      dotClassName: 'bg-emerald-300',
    }
  }

  if (hasNewTask) {
    return {
      label: 'Available',
      detail: 'Ready to accept work',
      className: 'border-cyan-400/40 bg-cyan-500/15 text-cyan-200',
      dotClassName: 'bg-cyan-300',
    }
  }

  if (hasFailedTask) {
    return {
      label: 'Needs Review',
      detail: 'Blocked by failed task',
      className: 'border-rose-400/40 bg-rose-500/15 text-rose-200',
      dotClassName: 'bg-rose-300',
    }
  }

  if (allTasksCompleted) {
    return {
      label: 'Completed',
      detail: 'All tasks finished',
      className: 'border-blue-400/40 bg-blue-500/15 text-blue-200',
      dotClassName: 'bg-blue-300',
    }
  }

  return {
    label: 'Idle',
    detail: 'No assigned task',
    className: 'border-white/20 bg-white/10 text-gray-200',
    dotClassName: 'bg-gray-300',
  }
}

const formatDuration = (milliseconds) => {
  if (milliseconds <= 0) return '00h 00m 00s'

  const totalSeconds = Math.floor(milliseconds / 1000)
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0')
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0')
  const seconds = String(totalSeconds % 60).padStart(2, '0')

  return `${hours}h ${minutes}m ${seconds}s`
}

const getActiveSince = (tasks) => {
  const activeTimes = tasks
    .filter((task) => (task.active || task.newTask) && task.activeSince)
    .map((task) => new Date(task.activeSince).getTime())
    .filter((time) => !Number.isNaN(time))

  if (activeTimes.length === 0) return null

  return Math.min(...activeTimes)
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

const AdminDashboard = ({ employees, chats, handleCreateTask, handleSendMessage, handleLogout }) => {
  const [currentTime, setCurrentTime] = useState(Date.now())
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(employees[0]?.id || '')
  const [messageText, setMessageText] = useState('')
  const totalTasks = employees.reduce((total, employee) => total + employee.tasks.length, 0)
  const completedTasks = employees.reduce(
    (total, employee) => total + employee.tasks.filter((task) => task.completed).length,
    0,
  )
  const activeTasks = employees.reduce(
    (total, employee) => total + employee.tasks.filter((task) => task.active || task.newTask).length,
    0,
  )

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(Date.now())
    }, 1000)

    return () => clearInterval(timerId)
  }, [])

  const selectedEmployee = employees.find((employee) => employee.id === Number(selectedEmployeeId))
  const selectedMessages = chats.filter((message) => message.employeeId === Number(selectedEmployeeId))

  const submitMessage = (event) => {
    event.preventDefault()
    handleSendMessage(selectedEmployeeId, 'admin', messageText)
    setMessageText('')
  }

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

      <section className='mt-8 rounded-lg bg-[#1C1C1C] p-5'>
        <div className='mb-5 flex flex-col justify-between gap-2 md:flex-row md:items-end'>
          <div>
            <h2 className='text-2xl font-semibold'>Employee Status</h2>
            <p className='mt-1 text-sm text-gray-300'>Current employee availability and working time.</p>
          </div>
          <p className='text-sm text-gray-300'>{activeTasks} active tasks in progress</p>
        </div>

        <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-5'>
          {employees.map((employee) => {
            const employeeStatus = getEmployeeStatus(employee.tasks)
            const activeCount = employee.tasks.filter((task) => task.active || task.newTask).length
            const completedCount = employee.tasks.filter((task) => task.completed).length
            const activeSince = getActiveSince(employee.tasks)
            const activeDuration = activeSince ? formatDuration(currentTime - activeSince) : 'Not active'
            const progress = employee.tasks.length > 0 ? Math.round((completedCount / employee.tasks.length) * 100) : 0

            return (
              <article key={employee.id} className='rounded-lg border border-white/10 bg-[#111] p-4'>
                <div className='flex items-center justify-between gap-3'>
                  <div className='flex h-11 w-11 items-center justify-center rounded bg-emerald-500 text-base font-bold text-[#111]'>
                    E{employee.id}
                  </div>
                  <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${employeeStatus.className}`}>
                    <span className={`h-2 w-2 rounded-full ${employeeStatus.dotClassName}`}></span>
                    {employeeStatus.label}
                  </span>
                </div>

                <h3 className='mt-4 text-lg font-bold'>Employee {employee.id}</h3>
                <p className='mt-1 break-all text-sm text-gray-400'>{employee.email}</p>

                <div className='mt-4 grid gap-3'>
                  <div className='rounded border border-white/10 bg-white/5 p-3'>
                    <p className='text-xs font-semibold uppercase tracking-[0.16em] text-gray-500'>Current Status</p>
                    <p className='mt-2 text-sm font-semibold'>{employeeStatus.detail}</p>
                  </div>
                  <div className='rounded border border-white/10 bg-white/5 p-3'>
                    <p className='text-xs font-semibold uppercase tracking-[0.16em] text-gray-500'>Working Time</p>
                    <p className='mt-2 text-sm font-semibold text-emerald-100'>{getEmployeeWorkTime(employee.id)}</p>
                  </div>
                  <div className='rounded border border-white/10 bg-white/5 p-3'>
                    <p className='text-xs font-semibold uppercase tracking-[0.16em] text-gray-500'>Joining Time</p>
                    <p className='mt-2 text-sm font-semibold text-amber-100'>{formatDateTime(employee.joiningAt)}</p>
                  </div>
                  <div className='rounded border border-white/10 bg-white/5 p-3'>
                    <p className='text-xs font-semibold uppercase tracking-[0.16em] text-gray-500'>Active For</p>
                    <p className='mt-2 text-sm font-semibold text-cyan-100'>{activeDuration}</p>
                  </div>
                  <div className='rounded border border-white/10 bg-white/5 p-3'>
                    <div className='flex items-center justify-between gap-3'>
                      <p className='text-xs font-semibold uppercase tracking-[0.16em] text-gray-500'>Work Progress</p>
                      <p className='text-sm font-bold text-white'>{progress}%</p>
                    </div>
                    <div className='mt-3 h-2 overflow-hidden rounded-full bg-white/10'>
                      <div className='h-full rounded-full bg-emerald-400' style={{ width: `${progress}%` }}></div>
                    </div>
                  </div>
                </div>

                <div className='mt-4 grid grid-cols-2 gap-3'>
                  <div className='rounded bg-[#1C1C1C] p-3'>
                    <p className='text-lg font-bold'>{activeCount}</p>
                    <p className='text-xs text-gray-400'>Ongoing</p>
                  </div>
                  <div className='rounded bg-[#1C1C1C] p-3'>
                    <p className='text-lg font-bold'>{completedCount}</p>
                    <p className='text-xs text-gray-400'>Done</p>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section className='mt-8 rounded-lg bg-[#1C1C1C] p-5'>
        <div className='mb-5 flex flex-col justify-between gap-2 md:flex-row md:items-end'>
          <div>
            <h2 className='text-2xl font-semibold'>Direct Chat</h2>
            <p className='mt-1 text-sm text-gray-300'>Send messages directly to an employee.</p>
          </div>
          <p className='text-sm text-gray-300'>{chats.length} total messages</p>
        </div>

        <div className='grid gap-5 lg:grid-cols-[0.45fr_0.55fr]'>
          <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-1'>
            {employees.map((employee) => {
              const employeeMessages = chats.filter((message) => message.employeeId === employee.id)
              const lastMessage = employeeMessages[employeeMessages.length - 1]
              const isSelected = employee.id === Number(selectedEmployeeId)

              return (
                <button
                  key={employee.id}
                  onClick={() => setSelectedEmployeeId(employee.id)}
                  className={`rounded-lg border p-4 text-left ${isSelected ? 'border-emerald-400 bg-emerald-500/10' : 'border-white/10 bg-[#111] hover:border-white/30'}`}
                >
                  <div className='flex items-center justify-between gap-3'>
                    <div>
                      <p className='font-semibold'>Employee {employee.id}</p>
                      <p className='mt-1 break-all text-sm text-gray-400'>{employee.email}</p>
                    </div>
                    <span className='rounded-full bg-white/10 px-3 py-1 text-xs font-semibold'>
                      {employeeMessages.length}
                    </span>
                  </div>
                  <p className='mt-3 line-clamp-1 text-sm text-gray-400'>
                    {lastMessage ? lastMessage.text : 'No messages yet'}
                  </p>
                </button>
              )
            })}
          </div>

          <div className='rounded-lg border border-white/10 bg-[#111] p-4'>
            <div className='border-b border-white/10 pb-4'>
              <p className='text-sm font-semibold uppercase tracking-[0.16em] text-emerald-300'>Chat With</p>
              <h3 className='mt-2 text-xl font-bold'>
                {selectedEmployee ? `Employee ${selectedEmployee.id}` : 'Select Employee'}
              </h3>
            </div>

            <div className='mt-4 flex max-h-80 min-h-64 flex-col gap-3 overflow-y-auto pr-1'>
              {selectedMessages.length > 0 ? selectedMessages.map((message) => (
                <div
                  key={message.id}
                  className={`max-w-[85%] rounded-lg p-3 ${message.sender === 'admin' ? 'self-end bg-emerald-600' : 'self-start bg-white/10'}`}
                >
                  <p className='text-xs font-semibold uppercase tracking-[0.12em] text-white/70'>
                    {message.sender === 'admin' ? 'Admin' : 'Employee'}
                  </p>
                  <p className='mt-1 text-sm leading-5'>{message.text}</p>
                  <p className='mt-2 text-xs text-white/60'>{formatDateTime(message.createdAt)}</p>
                </div>
              )) : (
                <p className='rounded border border-dashed border-white/15 p-4 text-sm text-gray-400'>
                  Start a direct conversation with this employee.
                </p>
              )}
            </div>

            <form onSubmit={submitMessage} className='mt-4 flex flex-col gap-3 sm:flex-row'>
              <input
                value={messageText}
                onChange={(event) => setMessageText(event.target.value)}
                disabled={!selectedEmployee}
                placeholder='Type message...'
                className='min-w-0 flex-1 rounded border border-white/10 bg-[#1C1C1C] px-4 py-3 outline-none focus:border-emerald-500 disabled:opacity-60'
              />
              <button
                disabled={!selectedEmployee || !messageText.trim()}
                className='rounded bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-gray-700'
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </section>

      <CreateTask employees={employees} handleCreateTask={handleCreateTask} />
      <AllTask employees={employees} completedTasks={completedTasks} />
    </div>
  )
}

export default AdminDashboard
