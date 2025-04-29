import { Droppable } from '@hello-pangea/dnd'
import TaskCard from './TaskCard'

const TaskColumn = ({ columnId, title, tasks }) => {
  const getColumnColor = (status) => {
    switch (status) {
      case 'todo':
        return 'bg-blue-100 border-blue-300'
      case 'inProgress':
        return 'bg-yellow-100 border-yellow-300'
      case 'done':
        return 'bg-green-100 border-green-300'
      default:
        return 'bg-gray-100 border-gray-300'
    }
  }

  return (
    <div
      className={`flex-1 p-4 rounded-lg border ${getColumnColor(columnId)}`}
    >
      <h2 className="text-lg font-semibold mb-4 text-center">{title}</h2>
      <Droppable droppableId={columnId}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="min-h-[200px]"
          >
            {tasks.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}

export default TaskColumn