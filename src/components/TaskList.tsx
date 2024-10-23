import React from 'react';
import TaskItem from './TaskItem';
import { Task } from '../types/Task';
import './style.css'

interface TaskListProps {
  tasks: Task[];
  toggleComplete: (id: string) => void;
  removeTask: (id: string) => void;
  updateTask: (id: string, title: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, toggleComplete, removeTask, updateTask }) => {
  if (!tasks.length) return null;

  return (
    <>
      <section className='container-list'>
          <ul id="main">
            {tasks.map((task) => (
              <TaskItem key={task.id}  task={task}  toggleComplete={toggleComplete} removeTask={removeTask} updateTask={updateTask}/>
            ))}
          </ul>
      </section>
    </>
  );
};

export default TaskList;
