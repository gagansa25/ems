import React, { useState } from 'react'

const getTaskCount = (employees, status) => {
  return employees.reduce((total, employee) => {
    return total + employee.tasks.filter((task) => task[status]).length
  }, 0)
}

const Home = ({ employees, handleAdminLogin, handleEmployeeLogin }) => {
  const [showAdminLogin, setShowAdminLogin] = useState(false)
  const [showEmployeeLogin, setShowEmployeeLogin] = useState(false)
  const [adminEmail, setAdminEmail] = useState('')
  const [adminPassword, setAdminPassword] = useState('')
  const [employeeEmail, setEmployeeEmail] = useState('')
  const [employeePassword, setEmployeePassword] = useState('')
  const totalTasks = employees.reduce((total, employee) => total + employee.tasks.length, 0)
  const ongoingTasks = employees.reduce(
    (total, employee) => total + employee.tasks.filter((task) => task.active || task.newTask).length,
    0,
  )
  const completedTasks = getTaskCount(employees, 'completed')
  const failedTasks = getTaskCount(employees, 'failed')
  const openAdminLogin = () => setShowAdminLogin(true)
  const openEmployeeLogin = (email = '') => {
    setEmployeeEmail(email)
    setShowEmployeeLogin(true)
  }

  const submitAdminLogin = (event) => {
    event.preventDefault()
    const loggedIn = handleAdminLogin(adminEmail, adminPassword)

    if (loggedIn) {
      setAdminEmail('')
      setAdminPassword('')
    }
  }

  const submitEmployeeLogin = (event) => {
    event.preventDefault()
    const loggedIn = handleEmployeeLogin(employeeEmail, employeePassword)

    if (loggedIn) {
      setEmployeeEmail('')
      setEmployeePassword('')
    }
  }

  return (
    <main className='min-h-screen bg-[#0f0f10] text-white'>
      <header className='border-b border-white/10 bg-[#151516] px-6 py-5 md:px-10'>
        <div className='mx-auto flex max-w-7xl flex-col justify-between gap-5 lg:flex-row lg:items-center'>
          <div>
            <p className='text-sm font-semibold uppercase tracking-[0.22em] text-emerald-300'>Employee Management System</p>
            <h1 className='mt-2 text-3xl font-bold'>EMS Dashboard</h1>
          </div>

          <nav className='flex flex-col gap-3 sm:flex-row'>
            <button
              onClick={openAdminLogin}
              className='rounded bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-700'
            >
              Admin Panel
            </button>
            <button
              onClick={() => openEmployeeLogin()}
              className='rounded border border-blue-400/50 bg-blue-500/10 px-5 py-3 font-semibold text-blue-100 hover:bg-blue-500/20'
            >
              Employee Dashboard
            </button>
          </nav>
        </div>
      </header>

      <section className='mx-auto grid max-w-7xl gap-6 px-6 py-8 md:px-10 lg:grid-cols-[1.05fr_0.95fr]'>
        <div className='rounded-lg border border-white/10 bg-[#19191b] p-6 md:p-8'>
          <p className='text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300'>Workspace Overview</p>
          <h2 className='mt-4 max-w-3xl text-4xl font-bold leading-tight md:text-6xl'>
            Open admin control or jump into an employee dashboard.
          </h2>
          <p className='mt-5 max-w-2xl text-base leading-7 text-gray-300'>
            Admin can assign projects, employees can view ongoing work, and task status stays updated across the system.
          </p>

          <div className='mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
            <div className='rounded bg-[#101011] p-5'>
              <p className='text-3xl font-bold'>{employees.length}</p>
              <p className='mt-1 text-sm text-gray-400'>Employees</p>
            </div>
            <div className='rounded bg-[#101011] p-5'>
              <p className='text-3xl font-bold'>{totalTasks}</p>
              <p className='mt-1 text-sm text-gray-400'>Total Tasks</p>
            </div>
            <div className='rounded bg-[#101011] p-5'>
              <p className='text-3xl font-bold'>{ongoingTasks}</p>
              <p className='mt-1 text-sm text-gray-400'>Ongoing Work</p>
            </div>
            <div className='rounded bg-[#101011] p-5'>
              <p className='text-3xl font-bold'>{completedTasks}</p>
              <p className='mt-1 text-sm text-gray-400'>Completed</p>
            </div>
          </div>
        </div>

        <div className='grid gap-6'>
          <div className='rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-6'>
            <div className='flex items-center justify-between gap-4'>
              <div>
                <p className='text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300'>Admin Panel</p>
                <h3 className='mt-3 text-3xl font-bold'>Manage Employees</h3>
              </div>
              <button
                onClick={openAdminLogin}
                className='rounded bg-emerald-600 px-4 py-2 text-sm font-semibold hover:bg-emerald-700'
              >
                Login
              </button>
            </div>
            <p className='mt-4 text-gray-300'>
              Create employee tasks, assign projects, and review every task from one control panel.
            </p>

            {showAdminLogin && (
              <form onSubmit={submitAdminLogin} className='mt-5 grid gap-3 rounded bg-[#101011] p-4'>
                <div>
                  <label className='text-sm font-semibold text-gray-300'>Admin Email</label>
                  <input
                    value={adminEmail}
                    onChange={(event) => setAdminEmail(event.target.value)}
                    required
                    type='email'
                    placeholder='admin@gmail.com'
                    className='mt-2 w-full rounded border border-white/10 bg-[#19191b] px-4 py-3 outline-none focus:border-emerald-400'
                  />
                </div>
                <div>
                  <label className='text-sm font-semibold text-gray-300'>Password</label>
                  <input
                    value={adminPassword}
                    onChange={(event) => setAdminPassword(event.target.value)}
                    required
                    type='password'
                    placeholder='123'
                    className='mt-2 w-full rounded border border-white/10 bg-[#19191b] px-4 py-3 outline-none focus:border-emerald-400'
                  />
                </div>
                <button className='rounded bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-700'>
                  Open Admin Dashboard
                </button>
              </form>
            )}
          </div>

          <div className='rounded-lg border border-blue-500/30 bg-blue-500/10 p-6'>
            <div className='flex items-center justify-between gap-4'>
              <div>
                <p className='text-sm font-semibold uppercase tracking-[0.2em] text-blue-300'>Employee Dashboard</p>
                <h3 className='mt-3 text-3xl font-bold'>Employee Login</h3>
              </div>
              <button
                onClick={() => openEmployeeLogin()}
                className='rounded bg-blue-600 px-4 py-2 text-sm font-semibold hover:bg-blue-700'
              >
                Login
              </button>
            </div>
            <p className='mt-4 text-gray-300'>
              Employees can log in with their email and password to open their own dashboard.
            </p>

            {showEmployeeLogin && (
              <form onSubmit={submitEmployeeLogin} className='mt-5 grid gap-3 rounded bg-[#101011] p-4'>
                <div>
                  <label className='text-sm font-semibold text-gray-300'>Employee Email</label>
                  <input
                    value={employeeEmail}
                    onChange={(event) => setEmployeeEmail(event.target.value)}
                    required
                    type='email'
                    placeholder='employee1@gmail.com'
                    className='mt-2 w-full rounded border border-white/10 bg-[#19191b] px-4 py-3 outline-none focus:border-blue-400'
                  />
                </div>
                <div>
                  <label className='text-sm font-semibold text-gray-300'>Password</label>
                  <input
                    value={employeePassword}
                    onChange={(event) => setEmployeePassword(event.target.value)}
                    required
                    type='password'
                    placeholder='123'
                    className='mt-2 w-full rounded border border-white/10 bg-[#19191b] px-4 py-3 outline-none focus:border-blue-400'
                  />
                </div>
                <button className='rounded bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700'>
                  Open Employee Dashboard
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className='mx-auto max-w-7xl px-6 pb-10 md:px-10'>
        <div className='mb-5 flex flex-col justify-between gap-2 sm:flex-row sm:items-end'>
          <div>
            <p className='text-sm font-semibold uppercase tracking-[0.22em] text-amber-300'>Employee Dashboards</p>
            <h2 className='mt-2 text-3xl font-bold'>Choose Employee</h2>
          </div>
          <p className='text-sm text-gray-400'>{failedTasks} failed tasks need attention</p>
        </div>

        <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-5'>
          {employees.map((employee) => {
            const activeCount = employee.tasks.filter((task) => task.active || task.newTask).length
            const completedCount = employee.tasks.filter((task) => task.completed).length

            return (
              <button
                key={employee.id}
                onClick={() => openEmployeeLogin(employee.email)}
                className='rounded-lg border border-white/10 bg-[#19191b] p-5 text-left hover:border-amber-300 hover:bg-amber-500/10'
              >
                <div className='flex items-center justify-between'>
                  <div className='flex h-12 w-12 items-center justify-center rounded bg-amber-500 text-lg font-bold text-[#111]'>
                    E{employee.id}
                  </div>
                  <span className='rounded-full bg-white/10 px-3 py-1 text-sm font-semibold'>Open</span>
                </div>
                <h3 className='mt-5 text-xl font-bold'>Employee {employee.id}</h3>
                <p className='mt-1 break-all text-sm text-gray-400'>{employee.email}</p>

                <div className='mt-5 grid grid-cols-2 gap-3'>
                  <div className='rounded bg-[#101011] p-3'>
                    <p className='text-lg font-bold'>{activeCount}</p>
                    <p className='text-xs text-gray-400'>Ongoing</p>
                  </div>
                  <div className='rounded bg-[#101011] p-3'>
                    <p className='text-lg font-bold'>{completedCount}</p>
                    <p className='text-xs text-gray-400'>Done</p>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </section>
    </main>
  )
}

export default Home
