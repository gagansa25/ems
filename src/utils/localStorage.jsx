const employees = [
  {
    id: 1,
    email: "employee1@gmail.com",
    password: "123",
    tasks: [
      {
        active: true,
        newTask: true,
        completed: false,
        failed: false,
        taskTitle: "Prepare sales report",
        taskDescription: "Create monthly sales report",
        taskDate: "2026-03-13",
        category: "Reports"
      },
      {
        active: false,
        newTask: false,
        completed: true,
        failed: false,
        taskTitle: "Client meeting",
        taskDescription: "Meeting with marketing client",
        taskDate: "2026-03-10",
        category: "Meeting"
      },
      {
        active: false,
        newTask: false,
        completed: false,
        failed: true,
        taskTitle: "Update CRM",
        taskDescription: "Update new client entries",
        taskDate: "2026-03-09",
        category: "Management"
      }
    ]
  },

  {
    id: 2,
    email: "employee2@gmail.com",
    password: "123",
    tasks: [
      {
        active: true,
        newTask: true,
        completed: false,
        failed: false,
        taskTitle: "Website bug fix",
        taskDescription: "Fix login page bug",
        taskDate: "2026-03-13",
        category: "Development"
      },
      {
        active: false,
        newTask: false,
        completed: true,
        failed: false,
        taskTitle: "API integration",
        taskDescription: "Connect payment API",
        taskDate: "2026-03-11",
        category: "Development"
      },
      {
        active: false,
        newTask: false,
        completed: false,
        failed: true,
        taskTitle: "UI redesign",
        taskDescription: "Redesign dashboard UI",
        taskDate: "2026-03-08",
        category: "Design"
      }
    ]
  },

  {
    id: 3,
    email: "employee3@gmail.com",
    password: "123",
    tasks: [
      {
        active: true,
        newTask: true,
        completed: false,
        failed: false,
        taskTitle: "Database backup",
        taskDescription: "Backup company database",
        taskDate: "2026-03-13",
        category: "Database"
      },
      {
        active: false,
        newTask: false,
        completed: true,
        failed: false,
        taskTitle: "Security check",
        taskDescription: "Run security audit",
        taskDate: "2026-03-10",
        category: "Security"
      },
      {
        active: false,
        newTask: false,
        completed: false,
        failed: true,
        taskTitle: "Server update",
        taskDescription: "Update production server",
        taskDate: "2026-03-07",
        category: "Server"
      }
    ]
  },

  {
    id: 4,
    email: "employee4@gmail.com",
    password: "123",
    tasks: [
      {
        active: true,
        newTask: true,
        completed: false,
        failed: false,
        taskTitle: "Design banner",
        taskDescription: "Create marketing banner",
        taskDate: "2026-03-13",
        category: "Design"
      },
      {
        active: false,
        newTask: false,
        completed: true,
        failed: false,
        taskTitle: "Logo update",
        taskDescription: "Update company logo",
        taskDate: "2026-03-09",
        category: "Design"
      },
      {
        active: false,
        newTask: false,
        completed: false,
        failed: true,
        taskTitle: "Ad campaign",
        taskDescription: "Prepare Facebook ads",
        taskDate: "2026-03-08",
        category: "Marketing"
      }
    ]
  },

  {
    id: 5,
    email: "employee5@gmail.com",
    password: "123",
    tasks: [
      {
        active: true,
        newTask: true,
        completed: false,
        failed: false,
        taskTitle: "Customer support",
        taskDescription: "Handle support tickets",
        taskDate: "2026-03-13",
        category: "Support"
      },
      {
        active: false,
        newTask: false,
        completed: true,
        failed: false,
        taskTitle: "Feedback review",
        taskDescription: "Review customer feedback",
        taskDate: "2026-03-11",
        category: "Support"
      },
      {
        active: false,
        newTask: false,
        completed: false,
        failed: true,
        taskTitle: "Call follow-up",
        taskDescription: "Follow up client calls",
        taskDate: "2026-03-09",
        category: "Communication"
      }
    ]
  }
]

const admin = {
  id: 1,
  email: "admin@gmail.com",
  password: "123"
}

export const setLocalStorage = () => {
  localStorage.setItem('employees',JSON.stringify(employees))
  localStorage.setItem('admin',JSON.stringify(admin))
}
export const getLocalStorage = () => {
  const employees= JSON.parse(localStorage.getItem('employees'))
  const admin= JSON.parse(localStorage.getItem('admin'))

  return {employees,admin}
 
}