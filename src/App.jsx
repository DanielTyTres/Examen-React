// Importo los hooks useState y useEffect desde React
import React, { useState, useEffect } from 'react';
// Importo BrowserRouter, Route, Routes y Link desde react-router-dom
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import TodoDetails from './components/TodoDetails'; // Componente para detalles

const App = () => {
  // Estado para las tareas
  const [tareas, setTareas] = useState([]);

  // Cargar tareas desde localStorage al montar el componente
  useEffect(() => {
    const tareasGuardadas = JSON.parse(localStorage.getItem('tareas')) || [];
    setTareas(tareasGuardadas);
  }, []);

  // Guardar tareas en localStorage cada vez que se actualice el estado
  useEffect(() => {
    localStorage.setItem('tareas', JSON.stringify(tareas));
  }, [tareas]);

  // Función para agregar una nueva tarea
  const agregarTarea = (texto) => {
    const nuevaTarea = { texto, completada: false };
    setTareas([...tareas, nuevaTarea]);
  };

  // Función para completar una tarea
  const completarTarea = (index) => {
    const nuevasTareas = tareas.map((tarea, i) =>
      i === index ? { ...tarea, completada: !tarea.completada } : tarea
    );
    setTareas(nuevasTareas);
  };

  // Función para eliminar una tarea
  const eliminarTarea = (index) => {
    const nuevasTareas = tareas.filter((_, i) => i !== index);
    setTareas(nuevasTareas);
  };

  // Función para editar una tarea
  const editarTarea = (index, nuevoTexto) => {
    const nuevasTareas = tareas.map((tarea, i) =>
      i === index ? { ...tarea, texto: nuevoTexto } : tarea
    );
    setTareas(nuevasTareas);
  };

  return (
    <Router>
      <div>
        <header>
          <nav>
            <Link to="/">Inicio</Link>
            <Link to="/details">Detalles</Link>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={
            <>
              <TodoForm agregarTarea={agregarTarea} />
              <TodoList
                tareas={tareas}
                completarTarea={completarTarea}
                eliminarTarea={eliminarTarea}
                editarTarea={editarTarea}
              />
            </>
          } />
          <Route path="/details" element={<TodoDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

// Exporto el componente App para que pueda ser usado en otros archivos
export default App;