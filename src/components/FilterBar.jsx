import { useDispatch } from 'react-redux'
import { setFilter } from '../features/tasks/taskSlice'

const FilterBar = () => {
  const dispatch = useDispatch()

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    dispatch(setFilter({ [name]: value }))
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-gray-700 mb-2">Priority</label>
          <select
            name="priority"
            onChange={handleFilterChange}
            className="w-full p-2 border rounded"
          >
            <option value="">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Due Date</label>
          <input
            type="date"
            name="dueDate"
            onChange={handleFilterChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="flex items-end">
          <button
            onClick={() => dispatch(setFilter({ priority: '', dueDate: '' }))}
            className="w-full p-2 bg-gray-200 hover:bg-gray-300 rounded"
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  )
}

export default FilterBar