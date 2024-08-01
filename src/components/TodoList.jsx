// Importo el hook useState
import React, { useState } from 'react';
// Importo PropTypes para validación de las props
import PropTypes from 'prop-types';
// Importo el archivo CSS para los estilos del componente
import './TodoList.css';

// Componente funcional TodoList
const TodoList = ({ tareas, completarTarea, eliminarTarea, editarTarea }) => {
  // Estado local para manejar el índice de la tarea en edición
const [editIndex, setEditIndex] = useState(null);
  // Estado local para manejar el texto nuevo de la tarea en edición
const [newText, setNewText] = useState('');

  // Función para iniciar la edición de una tarea
const handleEdit = (index) => {
    setEditIndex(index);
    setNewText(tareas[index].texto);
};

  // Función para guardar los cambios en una tarea editada
const handleSave = (index) => {
    editarTarea(index, newText);
    setEditIndex(null);
};

return (
    // Retorno una lista no ordenada
    <ul>
    {tareas.map((tarea, index) => (
        // Recorro las tareas y creo un elemento de lista por cada una
        <li
        key={index}
          // Aplico la clase 'completed' si la tarea está completada
        className={tarea.completada ? 'completed' : ''}
        >
        {editIndex === index ? (
            // Si la tarea está en edición, muestro un input para editar el texto
            <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            />
        ) : (
            // Si la tarea no está en edición, muestro el texto de la tarea
            <span onClick={() => completarTarea(index)}>
            {tarea.texto}
            </span>
        )}
        {editIndex === index ? (
            // Si la tarea está en edición, muestro un botón para guardar los cambios
            <button className="save" onClick={() => handleSave(index)}>Guardar</button>
        ) : (
            // Si la tarea no está en edición, muestro un botón para editar la tarea
            <button className="edit" onClick={() => handleEdit(index)}>Editar</button>
        )}
        <button className="delete" onClick={() => eliminarTarea(index)}>Eliminar</button>
        </li>
    ))}
    </ul>
);
};

// Validación de las props con PropTypes
TodoList.propTypes = {
  // Valido que 'tareas' sea un array de objetos con las propiedades texto y completada
tareas: PropTypes.arrayOf(
    PropTypes.shape({
    texto: PropTypes.string.isRequired,
    completada: PropTypes.bool.isRequired,
    })
).isRequired,
completarTarea: PropTypes.func.isRequired,
eliminarTarea: PropTypes.func.isRequired,
editarTarea: PropTypes.func.isRequired,
};

// Exporto el componente TodoList para que pueda ser usado en otros archivos
export default TodoList;