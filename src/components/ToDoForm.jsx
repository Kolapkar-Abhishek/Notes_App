import React, { useEffect, useState } from "react";

const ToDoForm = () => {
  const [todo, setTodo] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodos, setCurrentTodos] = useState({});

  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // function for write notes
  const handleInputChange = (e) => {
    setTodo(e.target.value);
  };

  // function for handle Edit Input Change
  const handelEdit = (e) => {
    setCurrentTodos({ ...currentTodos, text: e.target.value });
  };

  // function for form submitting
  const handleSubmit = (e) => {
    e.preventDefault();

    if (todo !== "") {
      setTodos([
        ...todos,
        {
          id: todos.length + 1,
          text: todo.trim(),
        },
      ]);
    }

    setTodo("");
  };

  // function for deleting note
  const handleDelete = (id) => {
    const removeItem = todos.filter((todo) => {
      return todo.id !== id;
    });

    setTodos(removeItem);
  };

  // function for updating notes list
  const handleUpdate = (id, updateTodo) => {
    const updateItem = todos.map((todo) => {
      return todo.id === id ? updateTodo : todo;
    });

    setIsEditing(false);
    setTodos(updateItem);
  };

  // function for Edit button
  const handleEditClick = (e) => {
    setIsEditing(true);
    setCurrentTodos({ ...todo });
  };

  // function for handle edit notes
  const handleEditForm = (e) => {
    e.preventDefault();
    handleUpdate(currentTodos.id, currentTodos);
  };

  return (
    <div>
      {isEditing ? (
        <form onSubmit={handleEditForm}>
          <h2>Edit Todo</h2>
          <input
            type="text"
            name="editTodo"
            placeholder="Edit Todo"
            value={currentTodos.text}
            onChange={handelEdit}
          />
          <button type="submit">Update</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      ) : (
        <form onSubmit={handleSubmit}>
          <h2>Add Todo</h2>
          <input
            type="text"
            name="todo"
            placeholder="Create a new note"
            value={todo}
            onChange={handleInputChange}
          />
          <button type="submit" className="add-btn">
            Add
          </button>
        </form>
      )}

      {/* list of all notes */}
      <ul className="todo-list">
        {todos.map((note) => {
          return (
            <li key={note.id}>
              <span>{note.text}</span>
              <div className="btn-grp">
                <button className="edit-btn" onClick={() => handleEditClick(note)}>Edit</button>
                <button className="del-btn" onClick={() => handleDelete(note.id)}>Delete</button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ToDoForm;
