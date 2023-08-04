const url = "https://k8dldy-4000.csb.app/todos";

export const fetchTodos = async () => {
  const response = await fetch(url);
  return response.json();
};

export const createTodo = async (newTodo) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newTodo)
  });
  return response.json();
};

export const deleteTodo = async (id) => {
  await fetch(`${url}/${id}`, {
    method: "DELETE"
  });
};

export const updateTodo = async ({ id, ...updatedTodo }) => {
  console.log("updatetodo", updatedTodo);
  const response = await fetch(`${url}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(updatedTodo)
  });

  return response.json();
};
