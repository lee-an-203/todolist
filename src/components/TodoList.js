import React, { useState, useEffect  } from 'react'
import _ from 'lodash';
import './TodoList.css';

function TodoList() {
  const [todo, setTodo] = useState("");
  const [listTodo, setListTodo] = useState([])
  const [theme, setTheme] = useState("light");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    document.body.className = theme; 
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const randomIntFromInterval = (min, max) =>{
    return Math.floor(Math.random() * (max - min + 1) + min )
  }

  const handleClickBtn = () => {
    let todoId = randomIntFromInterval(1, 999999999999999999);
    let todoItem = {
      id: `todo${todoId}`, name: todo
    }
    setListTodo([...listTodo, todoItem])
    setTodo("");
  }

  const handleDelete = (id) =>{
    let currentTodoList = _.clone(listTodo);
    currentTodoList = currentTodoList.filter(item => item.id !== id);
    setListTodo(currentTodoList)
  }

  const handleEdit = (id, name) => {
    setEditingId(id);
    
  }

  const handleComplete = (id) => {
    const updatedTodos = listTodo.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setListTodo(updatedTodos);
  }

  return (
    <div className='list'>
      <div className='hear'>
        <input  value={todo} class='icon' type='text' placeholder='Search note...' onChange={(event) => setTodo(event.target.value)} />
        <select className='chon' style={{height: '30px'}}>
          <option value="0">ALL</option>
          <option value="1">All</option>
          <option value="2">Complete</option>
          <option value="3">Incomplete</option>
       </select>
       
        <button className="dark" onClick={toggleTheme}>
            {theme === "light" ? "🌙" : "☀️"}
        </button>

      </div>
      
      <button className='them' type='submit' onClick={() =>handleClickBtn()}>+</button> 

      {listTodo.map((item, index)=>(
      <div key={item.id} className="todo-item">
        <div style={{ display: "flex", alignItems: "center" }}>
          <input 
            type="checkbox"
            checked={item.completed}
            onChange={() => handleComplete(item.id)}
            className="checkbox"
          />
          <div className={`out ${item.completed ? 'completed' : ''}`} id={item.id}>{item.name}</div>
        </div>
        <div>
          <button className="edit-btn" onClick={() => handleEdit(item.id, item.name)}>✏️</button>
          <button type='delete' onClick={() => handleDelete(item.id)}>🗑️</button>
        </div>
      </div>
    ))}
    </div>
  )
}

export default TodoList