import React, { ChangeEvent, useState, CSSProperties } from "react";

const Todo: React.FC = () => {
  const [newTask, setNewTask] = useState<string>("");
  const [tasks, setTasks] = useState<string[]>([]);

  const handleTask = () => {
    if (newTask.trim() === "") return; // Avoid adding empty tasks
    setTasks((prev) => [...prev, newTask]);
    setNewTask("");
  };

  const handleDelete = (index: number) => {
    setTasks((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.header}>Todo List 📝</h3>
      <div style={styles.form}>
        <input
          type="text"
          value={newTask}
          placeholder="Add a new task..."
          style={styles.input}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setNewTask(event.target.value);
          }}
          // Allow submitting with the "Enter" key
          onKeyPress={(event) => event.key === "Enter" && handleTask()}
        />
        <button type="button" style={styles.submitButton} onClick={handleTask}>
          Add
        </button>
      </div>
      <ul style={styles.taskList}>
        {tasks.length > 0 &&
          tasks.map((item, index) => (
            <li style={styles.taskItem} key={index}>
              <p style={styles.taskText}>{item}</p>
              <button
                type="button"
                style={styles.deleteButton}
                onClick={() => handleDelete(index)}
              >
                Delete
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

// --- Styles --- : Added once main todo logic was able to built

const styles: { [key: string]: CSSProperties } = {
  container: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    maxWidth: "550px",
    margin: "40px auto",
    padding: "30px",
    backgroundColor: "#f4f7fA",
    borderRadius: "12px",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
  },
  header: {
    textAlign: "center",
    color: "#333",
    marginBottom: "25px",
    fontSize: "28px",
  },
  form: {
    display: "flex",
    gap: "10px",
    marginBottom: "30px",
  },
  input: {
    flex: "1",
    padding: "12px 15px",
    fontSize: "16px",
    border: "2px solid #ddd",
    borderRadius: "8px",
    transition: "border-color 0.3s",
  },
  submitButton: {
    padding: "12px 25px",
    fontSize: "16px",
    fontWeight: "bold",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  taskList: {
    listStyleType: "none",
    padding: "0",
  },
  taskItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: "15px",
    border: "1px solid #eee",
    borderRadius: "8px",
    marginBottom: "10px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
  },
  taskText: {
    margin: "0",
    fontSize: "18px",
    color: "#555",
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    padding: "8px 14px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "background-color 0.3s",
  },
};

export default Todo;
