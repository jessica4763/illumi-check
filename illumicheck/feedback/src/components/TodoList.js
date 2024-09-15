import React, { useState, useEffect } from 'react';

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
      fetch('http://localhost:8000/api/todos/')
      .then(res => {
        setTodos(res.data);
      });
    }, 
    []
  );

  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          {todo.title}
          {/* Add buttons for edit and delete operations here */}
        </li>
      ))}
    </ul>
  );
};

export default TodoList;