// Importo el hook useState desde React
import React, { useState } from 'react';
// Importo PropTypes para la validación de las props
import PropTypes from 'prop-types';
// Importo el archivo CSS para los estilos del componente
import './TodoForm.css';

// Componente funcional TodoForm
const TodoForm = ({ agregarTarea }) => {
  // Estado local para manejar el valor del input de nueva tarea
  const [texto, setTexto] = useState('');

  // Función para manejar el cambio de valor en el input
  const handleChange = (e) => {
    setTexto(e.target.value);
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (texto.trim()) {
      agregarTarea(texto);
      setTexto('');
    }
  };

  return (
    // Retorno un formulario con un input y un botón
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={texto}
        onChange={handleChange}
        placeholder="Agregar nueva tarea"
      />
      <button type="submit">Agregar</button>
    </form>
  );
};

// Validación de las props con PropTypes
TodoForm.propTypes = {
  // Valido que 'agregarTarea' sea una función
  agregarTarea: PropTypes.func.isRequired,
};

// Exporto el componente TodoForm para que pueda ser usado en otros archivos
export default TodoForm;