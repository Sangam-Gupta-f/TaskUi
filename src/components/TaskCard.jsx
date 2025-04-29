import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteTask } from '../features/tasks/taskSlice'
import { FaTrash, FaEdit, FaArrowRight } from 'react-icons/fa'
import PriorityBadge from './PriorityBadge'

const TaskCard = ({ task }) => {
  const dispatch = useDispatch()
  const [isHovered, setIsHovered] = useState(false)

  const handleDelete = () => {
    dispatch(deleteTask(task.id))
  }

  return (
    <div
      className={`bg-white rounded-lg shadow p-4 mb-3 relative ${
        isHovered ? 'ring-2 ring-blue-500' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-lg">{task.title}</h3>
        <PriorityBadge priority={task.priority} />
      </div>
      <p className="text-gray-600 mt-2">{task.description}</p>
      {task.dueDate && (
        <p className="text-sm text-gray-500 mt-2">
          Due: {new Date(task.dueDate).toLocaleDateString()}
        </p>
      )}
      {isHovered && (
        <div className="absolute top-2 right-2 flex space-x-1">
          <button
            className="text-gray-500 hover:text-blue-500"
            onClick={handleDelete}
          >
            <FaTrash />
          </button>
        </div>
      )}
    </div>
  )
}

export default TaskCard