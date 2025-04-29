import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

const initialState = {
  tasks: [
    {
      id: uuidv4(),
      title: 'Design Homepage',
      description: 'Create wireframes for the homepage',
      status: 'todo',
      priority: 'high',
      dueDate: '2023-06-15',
    },
    {
      id: uuidv4(),
      title: 'API Integration',
      description: 'Connect frontend to backend API',
      status: 'inProgress',
      priority: 'medium',
      dueDate: '2023-06-20',
    },
    {
      id: uuidv4(),
      title: 'Testing',
      description: 'Write unit tests for components',
      status: 'done',
      priority: 'low',
      dueDate: '2023-06-10',
    },
  ],
  filter: {
    priority: '',
    dueDate: '',
  },
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        id: uuidv4(),
        createdAt: new Date().toISOString(),
        ...action.payload,
      }
      state.tasks.push(newTask)
    },
    moveTask: (state, action) => {
      const { id, newStatus } = action.payload
      const task = state.tasks.find((task) => task.id === id)
      if (task) {
        task.status = newStatus
      }
    },
    setFilter: (state, action) => {
      state.filter = action.payload
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload)
    },
  },
})

export const { addTask, moveTask, setFilter, deleteTask } = tasksSlice.actions

export const selectFilteredTasks = (state) => {
  const { tasks, filter } = state.tasks
  return tasks.filter((task) => {
    if (filter.priority && task.priority !== filter.priority) return false
    if (filter.dueDate && task.dueDate !== filter.dueDate) return false
    return true
  })
}

export default tasksSlice.reducer