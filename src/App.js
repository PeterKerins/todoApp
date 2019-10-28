import React, { useState } from 'react'
import logo from './logo.svg'
import './App.css'

function App() {
  const [todos, setTodos] = useState([
    {
      task: 'Build todo App',
      isCompleted: true,
    },
    {
      task: 'Make it Pretty',
      isCompleted: true,
    },
    {
      task: 'Prevent empty tasks being marked complete',
      isCompleted: true,
    },
    {
      task: 'Do your own thing',
      isCompleted: false,
    },
  ])

  // Function Run When Users hits enter inside todo
  function handleKeyDown(e, i) {
    if (e.key === 'Enter') {
      createTodoAtIndex(e, i)
    }
    if (e.key === 'Backspace' && todos[i].task === '') {
      e.preventDefault()
      return removeTodoAtIndex(i)
    }
  }

  function createTodoAtIndex(e, i) {
    const newTodos = [...todos]
    newTodos.splice(i + 1, 0, {
      task: '',
      isCompleted: false,
    })
    setTodos(newTodos)
    setTimeout(() => {
      document.forms[0].elements[i + 1].focus()
    }, 0)
  }

  const updateTodoAtIndex = (e, i) => {
    const newTodos = [...todos]
    newTodos[i].task = e.target.value
    setTodos(newTodos)
  }

  function removeTodoAtIndex(i) {
    if (i === 0 && todos.length === 1) return
    setTodos(todos => [
      ...todos.slice(0, i),
      ...todos.slice(i + 1, todos.length),
    ])
    setTimeout(() => {
      document.forms[0].elements[i - 1].focus()
    })
  }

  function toggleTodoCompletedAtIndex(index) {
    if (todos[index].task === '') return
    const newTodos = [...todos]
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
  }
  return (
    <div className="app">
      <header className="header">
        <img className="logo" src={logo} alt="logo" />
      </header>
      <form className="todo-list">
        <ul>
          {todos.map((todo, i) => (
            <li
              className={`todo ${
                todo.isCompleted ? 'todo-is-completed' : 'task-incomplete'
              }`}
              key={i.toString()}
            >
              <div
                className="checkbox"
                onClick={() => toggleTodoCompletedAtIndex(i)}
              >
                {todo.isCompleted && <span>&#x2714;</span>}
              </div>
              <input
                type="text"
                value={todo.task}
                onKeyDown={e => handleKeyDown(e, i)}
                onChange={e => updateTodoAtIndex(e, i)}
              />
            </li>
          ))}
        </ul>
      </form>
    </div>
  )
}

export default App
