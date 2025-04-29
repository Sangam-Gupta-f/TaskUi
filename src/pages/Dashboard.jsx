import { DragDropContext } from '@hello-pangea/dnd'
import { useDispatch, useSelector } from 'react-redux'
import { moveTask, selectFilteredTasks } from '../features/tasks/taskSlice'
import TaskColumn from '../components/TaskColumn'
import AddTaskModal from '../components/AddTaskModel'
import FilterBar from '../components/FilterBar'
import { useState } from 'react'

const Dashboard = () => {
  const dispatch = useDispatch()
  const tasks = useSelector(selectFilteredTasks)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result

    if (!destination) return
    if (destination.droppableId === source.droppableId) return

    dispatch(
      moveTask({
        id: draggableId,
        newStatus: destination.droppableId,
      })
    )
  }

  const columns = [
    { id: 'todo', title: 'To Do' },
    { id: 'inProgress', title: 'In Progress' },
    { id: 'done', title: 'Done' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Mobile App</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
          >
            Add Task
          </button>
        </div>

        <FilterBar />

        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {columns.map((column) => (
              <TaskColumn
                key={column.id}
                columnId={column.id}
                title={column.title}
                tasks={tasks.filter((task) => task.status === column.id)}
              />
            ))}
          </div>
        </DragDropContext>
      </div>

      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  )
}

export default Dashboard