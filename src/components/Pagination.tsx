import axios from "axios";
import React, { ChangeEvent, useEffect, useState } from "react";
import Icons from "../assets/Iocns";

interface todo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

const Pagination: React.FC = () => {
  const [pageCount, setPageCount] = useState<number>(0);
  const [todos, setTodos] = useState<todo[]>([]);
  const [idSorted, setIdSorted] = useState<boolean>(false);
  const [userIdSorted, setUserIdSorted] = useState<boolean>(false);
  const [todoSorted, setTodoSorted] = useState<boolean>(false);
  const [completedSorted, setCompletedSorted] = useState<boolean>(false);

  const getTodos = async (skip: number) => {
    try {
      const response = await axios.get(
        `https://dummyjson.com/todos?limit=${10}&skip=${skip * 10}`
      );
      setTodos(response?.data?.todos);
    } catch {}
  };

  const handlePagination = (btnType: string, inputVal?: number) => {
    if (btnType === "prev") {
      const size = pageCount - 1 < 0 ? 0 : pageCount - 1;
      setPageCount(size);
    } else {
      const size = pageCount + 1 > 25 ? 25 : pageCount + 1;
      setPageCount(size);
    }
  };

  useEffect(() => {
    setTodos([]);
    getTodos(pageCount);
  }, [pageCount]);

  const handleUserIdSort = () => {
    if (userIdSorted) {
      setUserIdSorted(!userIdSorted);
      setTodos(todos.reverse());
      return;
    }
    const sortedTodos = [...(todos || [])].sort((a, b) => a.userId - b.userId);
    if (!userIdSorted) {
      setUserIdSorted(!userIdSorted);
      setTodos(sortedTodos);
    }
  };

  const handleIdSort = () => {
    if (idSorted) {
      setIdSorted(!idSorted);
      setTodos(todos.reverse());
      return;
    }
    const sortedTodos = [...(todos || [])].sort((a, b) => a.id - b.id);
    if (!idSorted) {
      setIdSorted(!idSorted);
      setTodos(sortedTodos);
    }
  };

  const handleTodoSort = () => {
    if (todoSorted) {
      setTodoSorted(!todoSorted);
      setTodos(todos.reverse());
      return;
    }
    const sortedTodos = [...(todos || [])].sort((a, b) =>
      a.todo.localeCompare(b.todo)
    );
    if (!todoSorted) {
      setTodoSorted(!todoSorted);
      setTodos(sortedTodos);
    }
  };

  const handleCompletedSort = () => {
    if (completedSorted) {
      setCompletedSorted(!completedSorted);
      setTodos(todos.reverse());
      return;
    }
    const sortedTodos = [...(todos || [])].sort(
      (a, b) => Number(a.completed) - Number(b.completed)
    );
    if (!completedSorted) {
      setCompletedSorted(!completedSorted);
      setTodos(sortedTodos);
    }
  };
  return (
    <div className="container">
      {!todos.length && (
        <div
          className="d-flex justify-content-center align-items-center m-4"
          style={{ height: "420px" }}
        >
          <div className="spinner-border" role="status">
            <span className="visually-hidden"></span>
          </div>
        </div>
      )}
      {todos.length > 0 && (
        <table className="table table-striped">
          <thead>
            <tr>
              <th
                scope="col"
                style={{ cursor: "pointer" }}
                onClick={handleIdSort}
              >
                ID <Icons name="sort" size={10} />
              </th>
              <th
                scope="col"
                style={{ cursor: "pointer" }}
                onClick={handleUserIdSort}
              >
                User Id <Icons name="sort" size={10} />
              </th>
              <th
                scope="col"
                // className="pe-auto"
                style={{ cursor: "pointer" }}
                onClick={handleTodoSort}
              >
                Todo <Icons name="sort" size={10} />
              </th>
              <th
                scope="col"
                style={{ cursor: "pointer" }}
                onClick={handleCompletedSort}
              >
                completed <Icons name="sort" size={10} />
              </th>
            </tr>
          </thead>
          <tbody>
            {todos.length > 0 &&
              todos.map((todo: todo) => (
                <tr key={todo.id}>
                  <th scope="row">{todo.id}</th>
                  <td>{todo.userId}</td>
                  <td>{todo.todo}</td>
                  <td>{todo.completed ? "Yes" : "No"}</td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
      <div className="d-flex justify-content-end p-2 m-2">
        <button
          type="button"
          className="btn btn-outline-dark"
          onClick={() => handlePagination("prev")}
          disabled={pageCount <= 0}
        >
          Prev
        </button>
        <input
          type="text"
          placeholder={`Page ${pageCount + 1}`}
          style={{ width: "105px" }}
          className="p-2 rounded border mx-2"
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setPageCount(
              Number(event?.target.value) > 25
                ? 25
                : Number(event?.target.value) < 0
                ? 0
                : Number(event?.target.value) === 0
                ? pageCount
                : Number(event?.target.value)
            )
          }
        />
        <button
          type="button"
          className="btn btn-outline-dark"
          onClick={() => handlePagination("next")}
          disabled={pageCount >= 25}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
