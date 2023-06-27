//useState to keep track of data
//useRef to take in inputs from textbox
//uuidv4 is to generate random id
//useEffect is used to store in local, everything something changes, it will load them back
import React, { useState, useRef, useEffect } from 'react'
import './App.css';
import TodoList from './TodoList';
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  
  const [todos, settodos] = useState([])

  const todoNameRef = useRef()

  //load stored values
  useEffect(() => {
    const storedtodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(storedtodos) settodos(storedtodos)
  }, []);

  //everytime a change happens to `todos` array, we want to store it into LocalStorage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos]);

  //Toggle checker
  function toggleTodo(id) {
    const newtodos = [...todos]
    const todo = newtodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    settodos(newtodos)
  }
  
  function handleAddTodo(e) {
    //take in the input text from user on `AddtoDo` click
    const name = todoNameRef.current.value

    if(name === '') return

    settodos(prevtodos => {
      return [...prevtodos, {id: uuidv4(), name: name, complete: false}]
    })

    todoNameRef.current.value = null
  }

  function handleClearTodo(e){
    const newtodos = todos.filter(todo => !todo.complete)
    settodos(newtodos)
  }

  return (
    <>
      <TodoList todos={todos} toggleTodo= {toggleTodo}/>
      
      <input ref={todoNameRef} type= "text"/>
      <button onClick={handleAddTodo}>Add Todo</button>
      <button onClick={handleClearTodo}>Clear Button</button>

      <div>{todos.filter(todo => !todo.complete).length} left to do</div>
    </>
  )
}

export default App;