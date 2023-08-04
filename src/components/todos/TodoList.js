import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { deleteTodo, updateTodo, fetchTodos, createTodo } from "../../api";

const TodoList = () => {
  const { data, isLoading, error } = useQuery("todos", fetchTodos);
  const queryClient = useQueryClient();

  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editingTodoTitle, setEditingTodoTitle] = useState("");
  const [newTodo, setNewTodo] = useState("");

  const handleUpdateTodo = (id, title) => {
    // Mettre à jour l'état local avec l'ID de la tâche en cours d'édition et le titre actuel
    setEditingTodoId(id);
    setEditingTodoTitle(title);
  };

  const handleSaveTodo = () => {
    if (editingTodoId !== null) {
      // Appeler la mutation de mise à jour avec l'ID et le nouveau titre
      updateMutation.mutate({ id: editingTodoId, title: editingTodoTitle });

      // Réinitialiser les états locaux pour terminer l'édition
      setEditingTodoId(null);
      setEditingTodoTitle("");
    }
  };

  const deleteMutation = useMutation(deleteTodo, {
    onSuccess: () => {
      console.log("test");
      queryClient.invalidateQueries("todos");
    }
  });

  const updateMutation = useMutation(updateTodo, {
    onSuccess: () => {
      console.log("test");
      queryClient.invalidateQueries("todos");
    }
  });

  const handleDeleteTodo = (id) => {
    deleteMutation.mutate(id);
  };
  const createMutation = useMutation(createTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    }
  });

  const handleCreateTodo = () => {
    createMutation.mutate({
      title: newTodo,
      completed: false
    });
    setNewTodo("");
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <div className="add-task">
        <h2>Add new Task</h2>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={handleCreateTodo}>Add Todo</button>
      </div>
      <div className="todo-container">
        <h2>Todo List</h2>
        <ul className="todo-list">
          {data.map((todo) => (
            <li key={todo.id} className="todo-item">
              {editingTodoId === todo.id ? (
                <input
                  type="text"
                  value={editingTodoTitle}
                  onChange={(e) => setEditingTodoTitle(e.target.value)}
                />
              ) : (
                <span
                  className={`todo-title ${todo.completed ? "completed" : ""}`}
                >
                  {todo.title}
                </span>
              )}
              {editingTodoId === todo.id ? (
                <div className="button-group">
                  <button className="save-button" onClick={handleSaveTodo}>
                    Save
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteTodo(todo.id)}
                  >
                    Delete
                  </button>
                </div>
              ) : (
                <div className="button-group">
                  <button
                    className="update-button"
                    onClick={() => handleUpdateTodo(todo.id, todo.title)}
                  >
                    Update
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteTodo(todo.id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
