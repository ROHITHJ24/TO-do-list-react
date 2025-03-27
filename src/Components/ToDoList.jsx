import React, { useState } from 'react';

const ToDoList = () => {
  const [tasks, setTasks] = useState([]); 
  const [newTask, setNewTask] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [editedText, setEditedText] = useState(""); 
  
  function inputChange(event) {
    setNewTask(event.target.value);
  }

  
  function addTask() {
    if (newTask.trim()) {
      const newTaskObj = {
        id: Date.now(),
        text: newTask.trim(),
      };
      setTasks([...tasks, newTaskObj]);
      setNewTask(""); 
    }
  }

 
  function startEditingTask(task) {
    setEditingTask(task.id);
    setEditedText(task.text); 
  }

  function confirmEdit(id) {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, text: editedText } : task
    );
    setTasks(updatedTasks);
    setEditingTask(null); 
  }


  function cancelEdit() {
    setEditingTask(null);
    setEditedText(""); 
  }

  
  function deleteTask(id) {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
  }

  return (
    <div className="container">
      <div className="to-do-list">
        <h1>TO DO LIST</h1>
        <div className="input-field">
          <input
            type="text"
            placeholder="Enter task..."
            value={newTask}
            onChange={inputChange}
          />
          <button onClick={addTask}>Add</button>
        </div>

        <ul>
          {tasks.map(task => (
            <li key={task.id} className="task-item">
              {editingTask === task.id ? (
                <div className='edit-task'>
                  <input
                    type="text"
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                  />
                  <div className='edit-buttons'>

                  <button onClick={() => confirmEdit(task.id)}>Confirm</button>
                  <button onClick={cancelEdit}>Cancel</button>
                  </div>
                </div>
              ) : (
                <div className='task-text'>
                  <span>{task.text}</span>
                  <div>

                    <button onClick={() => startEditingTask(task)}>Edit</button>
                    <button onClick={() => deleteTask(task.id)}>Delete</button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ToDoList;
