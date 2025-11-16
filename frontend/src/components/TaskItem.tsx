import { useState } from 'react'
import { FiEdit2, FiTrash2, FiCheck } from 'react-icons/fi'
import { motion } from 'framer-motion'

interface TaskItemProps {
  task: {
    id: number
    title: string
    description?: string
    status: 'todo' | 'in_progress' | 'done'
  }
  onUpdate: (taskId: number, status: string) => void
  onDelete: (taskId: number) => void
}

const TaskItem = ({ task, onUpdate, onDelete }: TaskItemProps) => {
  const [showActions, setShowActions] = useState(false)

  const getNextStatus = () => {
    switch (task.status) {
      case 'todo':
        return 'in_progress'
      case 'in_progress':
        return 'done'
      case 'done':
        return 'todo'
    }
  }

  const getStatusButton = () => {
    switch (task.status) {
      case 'todo':
        return { text: 'Start', color: 'bg-blue-100 text-blue-700 hover:bg-blue-200' }
      case 'in_progress':
        return { text: 'Complete', color: 'bg-green-100 text-green-700 hover:bg-green-200' }
      case 'done':
        return { text: 'Reopen', color: 'bg-gray-100 text-gray-700 hover:bg-gray-200' }
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-medium text-gray-900 flex-1">{task.title}</h4>
      </div>
      
      {task.description && (
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{task.description}</p>
      )}

      <div className="flex items-center gap-2 mt-4">
        {showActions && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => onUpdate(task.id, getNextStatus())}
            className={`flex-1 px-3 py-1.5 text-xs font-medium rounded ${getStatusButton().color} transition-colors flex items-center justify-center gap-1`}
          >
            <FiCheck className="w-3 h-3" />
            {getStatusButton().text}
          </motion.button>
        )}
        
        {showActions && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => onDelete(task.id)}
            className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
          >
            <FiTrash2 className="w-3 h-3" />
          </motion.button>
        )}
      </div>
    </motion.div>
  )
}

export default TaskItem

