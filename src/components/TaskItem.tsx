import React, { useState } from 'react';
import { Task } from '../types/Task';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'; // Icono de "Eliminar"
import './style.css'

interface TaskItemProps {
  task: Task;
  toggleComplete: (id: string) => void;
  removeTask: (id: string) => void;
  updateTask: (id: string, title: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, toggleComplete, removeTask, updateTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  const handleEdit = () => {
    if (isEditing) {
      updateTask(task.id, editTitle.trim());
    }
    setIsEditing(!isEditing);
  };

  return (
    <ol className={`${task.completed ? 'completed' : ''}`}>
      {isEditing ? (
        <input className="edit" value={editTitle}  onChange={(e) => setEditTitle(e.target.value)} onBlur={handleEdit}  onKeyDown={(e) => e.key === 'Enter' && handleEdit()} />
      ) : (
        <>
          <input  className="custom-checkbox"  type="checkbox"  checked={task.completed} onChange={() => toggleComplete(task.id)} />
          <label onDoubleClick={() => setIsEditing(true)}>{task.title}</label>
          <button className="destroy" onClick={() => removeTask(task.id)}>
            <FontAwesomeIcon icon={faTrashAlt} />
          </button>
        </>
      )}
    </ol>
  );
};

export default TaskItem;