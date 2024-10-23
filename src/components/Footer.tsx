import React from 'react';
import '../styles/style.css'

interface FooterProps {
  tasksLeft: number;
  clearCompleted: () => void;
  setFilter: (filter: 'all' | 'pending' | 'completed') => void; // Añadimos la función para cambiar el filtro
}

const Footer: React.FC<FooterProps> = ({ tasksLeft, clearCompleted, setFilter }) => {
  return (
    <footer id="footer">
      <span>
        <strong>{tasksLeft}</strong> {tasksLeft === 1 ? 'item' : 'items'} left
      </span>

      {/* Botones de filtro */}
      <div className="filters">
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('pending')}>Pending</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
        <button className="clear-completed" onClick={clearCompleted}> Clear completed  </button>
      </div>

      
    </footer>
  );
};

export default Footer;
