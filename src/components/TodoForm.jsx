import { useState } from "react";
import { todoApi } from "../api/todos";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function TodoForm({ fetchData }) {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const queryClient = useQueryClient();

  const todoList = {
    id: Date.now().toString(),
    title,
    contents,
    isCompleted: false,
    createdAt: Date.now(),
  };

  const mutation = useMutation({
    mutationFn: async (todos) => {
      await todoApi.post("/todos", todos);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });

  const handleAddTodo = async (e) => {
    e.preventDefault();
    mutation.mutate(todoList);
  };

  return (
    <form onSubmit={handleAddTodo}>
      <label htmlFor="title">제목:</label>
      <input
        type="text"
        id="title"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <label htmlFor="contents">내용:</label>
      <input
        id="contents"
        name="contents"
        value={contents}
        onChange={(e) => setContents(e.target.value)}
        required
      />
      <button type="submit">추가하기</button>
    </form>
  );
}
