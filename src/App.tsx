import React, { useState } from 'react';
import TaskList from './components/TaskList';
import Footer from './components/Footer';
import { Task } from './types/Task';
import { useLocalStorage } from './Hooks/useLocalStorage';
import './app.css';

const App: React.FC = () => {
  const [tasks, setTasks] = useLocalStorage<Task[]>('mydayapp-reactjs', []);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all'); // Estado para el filtro

  // Aplicamos el filtro a las tareas
  const filteredTasks = tasks.filter(task => {
    if (filter === 'pending') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true; // Mostrar todas las tareas si el filtro es "all"
  });

  const handleAddTask = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newTask.trim()) {
      const newTaskItem: Task = {
        id: Date.now().toString(),
        title: newTask.trim(),
        completed: false,
      };
      setTasks([...tasks, newTaskItem]);
      setNewTask('');
    }
  };

  const toggleComplete = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const removeTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const updateTask = (id: string, title: string) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, title } : task))
    );
  };

  const clearCompleted = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  const pendingTasks = tasks.filter((task) => !task.completed).length;

  return (
    <section className="todoapp">
      <header className="header">
        <div className='container-title'>
          <h1>MyDayApp</h1>
          <p>All my tasks in one place</p>
        </div>

        <input
          className="new-todo"
          placeholder="Type new todo"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={handleAddTask}
          autoFocus
        />
      </header>

      {/* Mostrar las tareas filtradas */}
      <TaskList
        tasks={filteredTasks}
        toggleComplete={toggleComplete}
        removeTask={removeTask}
        updateTask={updateTask}
      />

      {/* Footer con botones de filtro y tareas restantes */}
      {tasks.length > 0 && (
        <Footer 
          tasksLeft={pendingTasks} 
          clearCompleted={clearCompleted}
          setFilter={setFilter}  // Pasar función para cambiar el filtro
        />
      )}
    </section>
  );
};

export default App;
