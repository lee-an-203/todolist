import React, { useState, useEffect } from "react";
import _ from "lodash";
import "./TodoList.css";

function TodoList() {
  const [todo, setTodo] = useState("");
  const [listTodo, setListTodo] = useState([]);
  const [theme, setTheme] = useState("light");
  const [searchText, setSearchText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentEdit, setCurrentEdit] = useState({ id: null, name: "" });

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const handleClickBtn = () => {
    if (todo.trim() === "") return;
    let todoId = randomIntFromInterval(1, 999999999999999999);
    let todoItem = {
      id: `todo${todoId}`,
      name: todo,
      completed: false,
    };
    setListTodo([...listTodo, todoItem]);
    setTodo("");
  };

  const handleDelete = (id) => {
    let currentTodoList = _.clone(listTodo);
    currentTodoList = currentTodoList.filter((item) => item.id !== id);
    setListTodo(currentTodoList);
  };

  const handleComplete = (id) => {
    const updatedTodos = listTodo.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setListTodo(updatedTodos);
  };

  const handleEditClick = (item) => {
    setCurrentEdit({ id: item.id, name: item.name });
    setIsEditing(true);
  };

  const handleApplyEdit = () => {
    const updatedList = listTodo.map((todo) =>
      todo.id === currentEdit.id ? { ...todo, name: currentEdit.name } : todo
    );
    setListTodo(updatedList);
    setIsEditing(false);
  };

  const filteredTodos = listTodo.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="list">
      <div className="hear">
        <input
          value={searchText}
          type="text"
          placeholder="Search note..."
          onChange={(event) => setSearchText(event.target.value)}
          className="search-input"
        />

        <input
          value={todo}
          className="icon"
          type="text"
          placeholder="Search note..."
          onChange={(event) => setTodo(event.target.value)}
        />
        <select className="chon" style={{ height: "30px" }}>
          <option value="0">ALL</option>
          <option value="1">All</option>
          <option value="2">Complete</option>
          <option value="3">Incomplete</option>
        </select>

        <button className="dark" onClick={toggleTheme}>
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </div>

      <button className="them" type="submit" onClick={() => handleClickBtn()}>
        +
      </button>

      {filteredTodos.map((item) => (
        <div key={item.id} className="todo-item">
          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => handleComplete(item.id)}
              className="checkbox"
            />
            <div
              className={`out ${item.completed ? "completed" : ""}`}
              id={item.id}
            >
              {item.name}
            </div>
          </div>
          <div>
            <button className="edit-btn" onClick={() => handleEditClick(item)}>
              ✏️
            </button>
            <button type="delete" onClick={() => handleDelete(item.id)}>
              🗑️
            </button>
          </div>
        </div>
      ))}

      {isEditing && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>NEW NOTE</h3>
            <input
              type="text"
              value={currentEdit.name}
              onChange={(e) =>
                setCurrentEdit({ ...currentEdit, name: e.target.value })
              }
              placeholder="Input your note..."
            />
            <div className="popup-buttons">
              <button
                className="cancel-btn"
                onClick={() => setIsEditing(false)}
              >
                CANCEL
              </button>
              <button className="apply-btn" onClick={handleApplyEdit}>
                APPLY
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TodoList;
