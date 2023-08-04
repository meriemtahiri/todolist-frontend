import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { createTodo } from "../../api";

const AddTodo = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation(createTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    }
  });

  const handleCreateTodo = () => {
    createMutation.mutate({
      title: "New Todo",
      completed: false
    });
  };

  return (
    <div>
      <h2>Add new Task </h2>
      <button onClick={handleCreateTodo}>Add Todo</button>
    </div>
  );
};

export default AddTodo;
