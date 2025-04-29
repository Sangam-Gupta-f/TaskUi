const PriorityBadge = ({ priority }) => {
    const getPriorityColor = () => {
      switch (priority) {
        case 'high':
          return 'bg-red-100 text-red-800'
        case 'medium':
          return 'bg-yellow-100 text-yellow-800'
        case 'low':
          return 'bg-green-100 text-green-800'
        default:
          return 'bg-gray-100 text-gray-800'
      }
    }
  
    return (
      <span
        className={`text-xs font-medium px-2.5 py-0.5 rounded ${getPriorityColor()}`}
      >
        {priority}
      </span>
    )
  }
  
  export default PriorityBadge