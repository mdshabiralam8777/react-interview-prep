import axios from "axios";
import React, { ChangeEvent, useEffect, useState } from "react";

interface todo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

const Pagination: React.FC = () => {
  //   const [pageSize, setPageSize] = useState<number>(10);
  const [pageCount, setPageCount] = useState<number>(0);
  const [todos, setTodos] = useState<todo[]>([]);

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
              <th scope="col">ID</th>
              <th scope="col">User Id</th>
              <th scope="col">Todo</th>
              <th scope="col">completed</th>
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
        >
          Prev
        </button>
        <input
          type="text"
          placeholder="got to page"
          style={{ width: "105px" }}
          className="p-2 rounded border mx-2"
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setPageCount(
              Number(event?.target.value) > 25
                ? 25
                : Number(event?.target.value) < 0
                ? 0
                : Number(event?.target.value)
            )
          }
        />
        <button
          type="button"
          className="btn btn-outline-dark"
          onClick={() => handlePagination("next")}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
